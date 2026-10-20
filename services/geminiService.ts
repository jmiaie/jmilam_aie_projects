// Client-side wrapper. Gemini is called through the server-side proxy in
// api/gemini.ts so the API key never reaches the browser bundle.

async function callGeminiProxy<T>(payload: Record<string, unknown>): Promise<T> {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `AI proxy request failed (${res.status})`);
  }
  return data.result as T;
}

export const analyzeCaseDescription = async (description: string) => {
  try {
    return await callGeminiProxy<any>({ op: 'analyzeCaseDescription', description });
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};
