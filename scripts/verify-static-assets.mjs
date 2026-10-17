import { readFileSync, statSync } from 'node:fs';
import { dirname, extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const queue = ['index.html', 'maptracker.html', 'hudoverlay.html'];
const checked = new Set();
const failures = [];
const patterns = [
  /(?:src|href)\s*=\s*['"](\.{1,2}\/[^'"]+)['"]/g,
  /\bfrom\s*['"](\.{1,2}\/[^'"]+)['"]/g,
  /\bimport\s*(?:\(\s*)?['"](\.{1,2}\/[^'"]+)['"]/g,
  /url\(\s*['"]?(\.{1,2}\/[^'"\s)]+)['"]?\s*\)/g,
];

while (queue.length) {
  const path = queue.shift();
  if (checked.has(path)) continue;
  checked.add(path);
  const absolute = resolve(root, path);
  try {
    const stats = statSync(absolute);
    if (stats.isDirectory()) {
      queue.push(relative(root, resolve(absolute, 'index.html')));
      continue;
    }
    if (!stats.size) throw new Error('file is empty');
    if (!['.html', '.js', '.mjs', '.css'].includes(extname(path))) continue;
    const source = readFileSync(absolute, 'utf8');
    for (const pattern of patterns) {
      for (const [, reference] of source.matchAll(pattern)) {
        if (reference.includes('${')) continue;
        const target = relative(root, resolve(dirname(absolute), reference.split(/[?#]/)[0]));
        if (target.startsWith('..')) throw new Error(`asset leaves publish directory: ${reference}`);
        queue.push(target);
      }
    }
  } catch (error) {
    failures.push(`${path}: ${error.message}`);
  }
}

if (failures.length) {
  console.error(`Static asset verification failed:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${checked.size} local pages, modules, stylesheets, and assets.`);
}
