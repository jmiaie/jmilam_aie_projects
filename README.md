<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1R8B3dmtt48bsgUgDBZb_WMSjTOwQo86y

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy [.env.example](.env.example) to `.env.local` and set `GEMINI_API_KEY` to your Gemini API key
3. Run the app:
   `npm run dev`

## Gemini API key (server-side only)

The browser never sees the Gemini key. Client code calls `POST /api/gemini`
(see [`api/gemini.ts`](api/gemini.ts)), a Vercel-style serverless function that
reads `GEMINI_API_KEY` from the **server** environment, uses a fixed model and
prompt, caps request size, and only exposes the case-analysis operation the UI uses.

- **Local dev:** `npm run dev` serves `/api/gemini` through a dev-only Vite
  middleware that reads `GEMINI_API_KEY` from `.env.local`. `vercel dev` also works.
- **Vercel:** set `GEMINI_API_KEY` under *Project Settings → Environment
  Variables*. The `api/` directory is deployed as a function automatically.
- **Other hosts:** a static-only host will not run `api/`; port
  `api/gemini.ts` to that platform's function format before deploying.
- **Never** name the variable `VITE_…` or reference it from client code.

`npm run build` runs `scripts/check-bundle-secrets.mjs` afterwards (`postbuild`).
It fails the build if anything in `dist/` contains the configured key value or
the string `GEMINI_API_KEY`. Run it on its own with `npm run check:bundle`.

> If a Gemini key was ever set in a build that was deployed, assume it leaked
> (older builds inlined it into the JS bundle) and rotate it.
