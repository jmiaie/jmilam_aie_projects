import path from 'path';
import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only: serve the Vercel-style function in api/gemini.ts from `vite dev`, so
// `npm run dev` keeps working without `vercel dev`. The key stays in the Node
// process; nothing here is injected into the client bundle.
const DEV_MAX_BODY_BYTES = 5 * 1024 * 1024;

function geminiApiDev(): Plugin {
  return {
    name: 'gemini-api-dev',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        try {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Allow', 'POST');
            res.end();
            return;
          }
          const chunks: Buffer[] = [];
          let size = 0;
          for await (const chunk of req) {
            size += (chunk as Buffer).length;
            if (size > DEV_MAX_BODY_BYTES) {
              res.statusCode = 413;
              res.end();
              return;
            }
            chunks.push(chunk as Buffer);
          }
          const mod = await server.ssrLoadModule('/api/gemini.ts');
          const request = new Request('http://localhost/api/gemini', {
            method: 'POST',
            headers: { 'content-type': String(req.headers['content-type'] ?? '') },
            body: Buffer.concat(chunks),
          });
          const response: Response = await mod.POST(request);
          res.statusCode = response.status;
          response.headers.forEach((value, key) => res.setHeader(key, value));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (err) {
          console.error('[gemini-api-dev]', err);
          res.statusCode = 500;
          res.end();
        }
      });
    },
  };
}

export default defineConfig(({ mode, command }) => {
    if (command === 'serve') {
      // Make .env/.env.local available to the dev API middleware (server side only).
      const env = loadEnv(mode, '.', '');
      if (env.GEMINI_API_KEY && !process.env.GEMINI_API_KEY) {
        process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
      }
    }
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), geminiApiDev()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
