#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
let id = "session-01";
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--id" && args[i + 1]) {
    id = args[i + 1];
    i += 1;
  }
}

const catalog = {
  "session-01": "SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md"
};

const file = catalog[id];
if (!file) {
  console.error(`Unknown session id: ${id}`);
  console.error(`Known sessions: ${Object.keys(catalog).join(", ")}`);
  process.exit(1);
}

const full = path.join(process.cwd(), file);
if (!fs.existsSync(full)) {
  console.error(`Session file missing: ${file}`);
  process.exit(1);
}

console.log(`Session: ${id}`);
console.log(`File: ${full}`);
console.log("\nRunbook:");
console.log("1) Open the session markdown file.");
console.log("2) Copy Step 01 prompt into Cline, then continue sequentially.");
console.log("3) Save outputs for each step and feed into next step.");
console.log("4) Use Repair Prompt when a checkpoint fails.");
console.log("5) Finish with Step 10 capstone and verify 5 required sections.");
