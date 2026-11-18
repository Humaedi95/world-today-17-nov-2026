// "The World Today" — 17 November 2026 news front page.
// Copies the pre-built entry.png next to this file into the output
// directory (MAKEFUN_OUTPUT_DIR, or /output by default).
// Node 22, standard library only, no network.
import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  throw new Error(`entry.png not found next to main.ts: ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Confirm the copy landed byte for byte.
const written = statSync(target).size;
const expected = statSync(source).size;
if (written !== expected) {
  throw new Error(`entry.png copy incomplete: ${written} of ${expected} bytes`);
}
console.log(`Wrote ${target} (${written} bytes)`);
