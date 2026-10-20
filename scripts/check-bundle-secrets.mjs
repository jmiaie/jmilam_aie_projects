// Fails the build if the client bundle in dist/ contains the Gemini key or the
// string "GEMINI_API_KEY". Runs automatically as `postbuild`.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { loadEnv } from 'vite';

const root = process.cwd();
const distDir = resolve(root, 'dist');

if (!existsSync(distDir)) {
  console.error('check-bundle-secrets: dist/ not found; run `vite build` first.');
  process.exit(1);
}

const forbidden = new Set(['GEMINI_API_KEY']);
const candidates = [process.env.GEMINI_API_KEY, process.env.API_KEY];
for (const mode of ['production', 'development']) {
  const env = loadEnv(mode, root, '');
  candidates.push(env.GEMINI_API_KEY, env.API_KEY);
}
for (const value of candidates) {
  // Ignore empty/very short values to avoid matching on trivial substrings.
  if (typeof value === 'string' && value.trim().length >= 8) forbidden.add(value.trim());
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const hits = [];
for (const file of walk(distDir)) {
  const content = readFileSync(file).toString('latin1');
  for (const needle of forbidden) {
    if (content.includes(needle)) {
      hits.push(`${file.slice(root.length + 1)} contains ${needle === 'GEMINI_API_KEY' ? '"GEMINI_API_KEY"' : 'the Gemini API key value'}`);
    }
  }
}

if (hits.length > 0) {
  console.error('check-bundle-secrets: FAILED, secrets found in client bundle:');
  for (const hit of hits) console.error(`  - ${hit}`);
  process.exit(1);
}
console.log(`check-bundle-secrets: OK (${forbidden.size} pattern(s) checked in dist/)`);
