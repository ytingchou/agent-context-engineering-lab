#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = path.join(root, "prompts");

if (!fs.existsSync(dir)) {
  console.error("prompts/ directory not found.");
  process.exit(1);
}

const files = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .sort((a, b) => a.localeCompare(b));

for (const file of files) {
  const full = path.join(dir, file);
  const content = fs.readFileSync(full, "utf8");
  const title = content.split("\n").find((line) => line.startsWith("# ")) ?? "# (no title)";
  console.log(`${file} -> ${title.replace(/^#\s*/, "")}`);
}
