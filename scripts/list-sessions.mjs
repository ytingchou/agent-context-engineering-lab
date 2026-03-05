#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogPath = path.join(root, "sessions", "catalog.json");
if (!fs.existsSync(catalogPath)) {
  console.error("Missing sessions/catalog.json");
  process.exit(1);
}
const sessions = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
if (!Array.isArray(sessions)) {
  console.error("sessions/catalog.json must be an array.");
  process.exit(1);
}

for (const s of sessions) {
  const exists = fs.existsSync(path.join(root, s.file));
  console.log(`${s.id} | ${s.scenario} | ${s.file} | ${exists ? "ready" : "missing"}`);
}
