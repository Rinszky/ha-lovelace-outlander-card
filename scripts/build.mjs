import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const filesInOrder = [
  'src/i18n.js',
  'src/helpers.js',
  'src/car-svg.js',
  'src/styles.js',
  'src/editor.js',
  'src/card.js',
];

const chunks = [
  `/**
 * Mitsubishi Outlander PHEV Lovelace Card (phev2mqtt)
 * Version: 1.1.0
 * Interactive top-down animated Home Assistant custom card for Mitsubishi Outlander PHEV
 * Zero external runtime dependencies — HACS & Lovelace ready.
 */
(function () {
  'use strict';
`,
];

for (const relPath of filesInOrder) {
  const fullPath = path.join(rootDir, relPath);
  let src = fs.readFileSync(fullPath, 'utf8');

  // Strip ES module import statements (all symbols live in the shared IIFE scope)
  src = src.replace(/^\s*import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
  // Strip `export ` keywords
  src = src.replace(/^\s*export\s+(const|let|var|function|class)\s+/gm, '$1 ');

  chunks.push(`  // --- ${relPath} ---\n` + src.trim() + '\n');
}

chunks.push('})();\n');

const outPath = path.join(rootDir, 'outlander-phev-card.js');
fs.writeFileSync(outPath, chunks.join('\n'), 'utf8');

const sizeKb = (fs.statSync(outPath).size / 1024).toFixed(1);
console.log(`Built ${outPath} (${sizeKb} KB)`);
