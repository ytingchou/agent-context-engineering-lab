#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = path.join(root, "prompts");

if (!fs.existsSync(dir)) {
  console.error("prompts/ directory not found.");
  process.exit(1);
}

function collectMarkdownFiles(baseDir, prefix = "") {
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectMarkdownFiles(full, rel));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(rel);
    }
  }
  return out;
}

const files = collectMarkdownFiles(dir).sort((a, b) => a.localeCompare(b));

for (const file of files) {
  const full = path.join(dir, file);
  const content = fs.readFileSync(full, "utf8");
  const title = content.split("\n").find((line) => line.startsWith("# ")) ?? "# (no title)";
  console.log(`${file} -> ${title.replace(/^#\s*/, "")}`);
}
