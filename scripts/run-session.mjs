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

const catalogPath = path.join(process.cwd(), "sessions", "catalog.json");
if (!fs.existsSync(catalogPath)) {
  console.error("Missing sessions/catalog.json");
  process.exit(1);
}
const sessions = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
if (!Array.isArray(sessions)) {
  console.error("sessions/catalog.json must be an array.");
  process.exit(1);
}

const selected = sessions.find((s) => s.id === id);
if (!selected) {
  console.error(`Unknown session id: ${id}`);
  console.error(`Known sessions: ${sessions.map((s) => s.id).join(", ")}`);
  process.exit(1);
}

const full = path.join(process.cwd(), selected.file);
if (!fs.existsSync(full)) {
  console.error(`Session file missing: ${selected.file}`);
  process.exit(1);
}

console.log(`Session: ${id}`);
console.log(`File: ${full}`);
console.log("\nRunbook:");
console.log("1) Open the session markdown file.");
console.log("2) Copy the first prompt block into Cline, then continue sequentially.");
console.log("3) Save outputs for each stage/step and feed into the next one.");
console.log("4) Use Repair Prompt whenever a checkpoint fails.");
console.log("5) Complete the session exit criteria in that markdown file.");
