// Vercel-style serverless function: POST /api/gemini
//
// Server-side proxy for the only Gemini operation the client uses
// (analyzeCaseDescription). GEMINI_API_KEY is read from the server environment
// and never sent to the browser. The model, prompt and response schema are fixed
// here; the client can only send a case description.
import { GoogleGenAI, Type } from '@google/genai';

const MODEL = 'gemini-3-flash-preview';
const MAX_BODY_BYTES = 16 * 1024;
const MAX_DESCRIPTION_CHARS = 8000;

function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

async function readBodyLimited(request: Request, limit: number): Promise<string | null> {
  const declared = Number(request.headers.get('content-length') ?? '0');
  if (declared > limit) return null;
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function analyzeCaseDescription(ai: GoogleGenAI, description: string) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: `Analyze the following legal case description and provide a structured summary suitable for a legal lead marketplace. 
      Identify potential legal categories, urgency level, and key facts. 
      Description: "${description}"`,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          category: { type: Type.STRING },
          urgency: { type: Type.STRING },
          suggestedValue: { type: Type.NUMBER },
          keyPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['summary', 'category', 'urgency', 'keyPoints'],
      },
    },
  });
  return JSON.parse(response.text || '{}');
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('api/gemini: GEMINI_API_KEY is not set in the server environment');
    return json(500, { error: 'AI service is not configured' });
  }

  const raw = await readBodyLimited(request, MAX_BODY_BYTES);
  if (raw === null) return json(413, { error: 'Request too large' });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { error: 'Invalid JSON' });
  }

  const { op, description } = (body ?? {}) as { op?: unknown; description?: unknown };
  if (op !== 'analyzeCaseDescription') return json(400, { error: 'Unknown operation' });
  if (typeof description !== 'string' || description.trim() === '') {
    return json(400, { error: 'description is required' });
  }
  if (description.length > MAX_DESCRIPTION_CHARS) {
    return json(413, { error: 'description is too long' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await analyzeCaseDescription(ai, description);
    return json(200, { result });
  } catch (error) {
    console.error('api/gemini: upstream error', error);
    return json(502, { error: 'AI request failed' });
  }
}
