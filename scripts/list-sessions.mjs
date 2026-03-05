#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const sessions = [
  {
    id: "session-01",
    file: "SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md",
    scenario: "ComplexExcelLikeForm"
  }
];

for (const s of sessions) {
  const exists = fs.existsSync(path.join(root, s.file));
  console.log(`${s.id} | ${s.scenario} | ${s.file} | ${exists ? "ready" : "missing"}`);
}
