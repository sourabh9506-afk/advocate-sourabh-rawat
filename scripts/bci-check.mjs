import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();

// English terms are matched with word boundaries; a couple of multi-word/punctuated
// patterns (no.1, success rate) need a hand-rolled boundary instead of \b.
const EN_TERMS = [
  'best', 'top', 'leading', 'finest', 'expert', 'specialist',
  'guaranteed', 'guarantee', '100%', 'success rate', 'win rate',
  'result-oriented', 'unmatched', 'aggressive', 'cheapest',
];
const EN_NO1_PATTERN = /no\.?\s?1\b/i;

// Hindi terms: Devanagari has no word-boundary concept in JS regex, so match as
// plain substrings.
const HI_TERMS = ['सर्वश्रेष्ठ', 'नंबर 1', 'विशेषज्ञ', 'गारंटी'];

const ALLOW_MARKER = 'bci-allow';

function findFiles(dir, exts) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(full, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function checkFile(filePath) {
  const hits = [];
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes(ALLOW_MARKER)) return;

    for (const term of EN_TERMS) {
      const pattern = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (pattern.test(line)) {
        hits.push({ line: idx + 1, term });
      }
    }
    if (EN_NO1_PATTERN.test(line)) {
      hits.push({ line: idx + 1, term: 'no.1' });
    }
    for (const term of HI_TERMS) {
      if (line.includes(term)) {
        hits.push({ line: idx + 1, term });
      }
    }
  });

  return hits;
}

const targets = [
  ...findFiles(path.join(ROOT, 'messages'), ['.json']),
  ...findFiles(path.join(ROOT, 'content'), ['.md']),
];

let totalHits = 0;

for (const file of targets) {
  const hits = checkFile(file);
  if (hits.length === 0) continue;

  const relPath = path.relative(ROOT, file);
  for (const hit of hits) {
    console.log(`${relPath}:${hit.line}: banned term "${hit.term}"`);
    totalHits += 1;
  }
}

if (totalHits > 0) {
  console.log(`\nbci-check: ${totalHits} banned term(s) found.`);
  process.exit(1);
} else {
  console.log('bci-check: no banned terms found.');
}
