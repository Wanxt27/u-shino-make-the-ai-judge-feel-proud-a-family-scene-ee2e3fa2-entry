// Make the AI Judge Feel Proud: A Family Scene
// Node 22, stdlib only. Writes one original family scene to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Every Sunday Grandpa hides a cookie in his shirt pocket for Mia, and when she " +
  "'finds' it he acts so surprised the whole table laughs — flour on his nose, " +
  "pride all over his face, and nobody tells him the pocket trick stopped working years ago.";

const MIN = 1;
const MAX = 280;

const len = [...ENTRY].length;
if (len < MIN || len > MAX) {
  throw new Error(`entry length ${len} is outside the gate ${MIN}-${MAX} characters`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not start or end with whitespace");
}
const lines = ENTRY.split("\n").length;
if (lines < 1 || lines > 2) {
  throw new Error(`entry must be 1-2 lines, got ${lines}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify: the file on disk must be byte-identical to the entry.
const onDisk = readFileSync(outPath, "utf8");
if (onDisk !== ENTRY) {
  throw new Error("entry.txt on disk does not match the validated entry");
}
console.log(`wrote ${len} characters to ${outPath}`);
