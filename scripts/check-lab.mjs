#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");

const checks = [];

function pass(name, detail = "") {
  checks.push({ ok: true, name, detail });
}

function fail(name, detail = "") {
  checks.push({ ok: false, name, detail });
}

function exists(relPath) {
  return fs.existsSync(path.join(root, relPath));
}

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

function countMatches(text, regex) {
  const m = text.match(regex);
  return m ? m.length : 0;
}

function checkFile(relPath) {
  if (exists(relPath)) {
    pass(`exists: ${relPath}`);
  } else {
    fail(`exists: ${relPath}`, "missing file");
  }
}

function checkExactCount(text, regex, expected, label) {
  const actual = countMatches(text, regex);
  if (actual === expected) {
    pass(label, `count=${actual}`);
  } else {
    fail(label, `expected=${expected}, actual=${actual}`);
  }
}

function checkMinCount(text, regex, minCount, label) {
  const actual = countMatches(text, regex);
  if (actual >= minCount) {
    pass(label, `count=${actual}`);
  } else {
    fail(label, `expected>=${minCount}, actual=${actual}`);
  }
}

const requiredFiles = [
  "README.md",
  "SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md",
  "package.json",
  "AGENTS.md",
  ".clinerules",
  "scripts/check-lab.mjs",
  "scripts/list-prompts.mjs",
  "scripts/list-sessions.mjs",
  "scripts/run-session.mjs",
  "rubrics/capstone-rubric.md",
  "examples/capstone-output-skeleton.md",
  "sessions/session-record-template.md",
  ".cline/workflows/run-agent-context-lab.md",
  ".cline/workflows/recover-failed-step.md"
];

for (const file of requiredFiles) {
  checkFile(file);
}

for (let i = 0; i <= 10; i += 1) {
  const name = i.toString().padStart(2, "0");
  checkFile(`prompts/${name}-${i === 0 ? "prompt-packet-template" : i === 1 ? "scope-boundary" : i === 2 ? "context-triage" : i === 3 ? "token-budget-and-slicing" : i === 4 ? "delphi-ui-semantics" : i === 5 ? "delphi-to-web-mapping" : i === 6 ? "nextjs-route-planning" : i === 7 ? "pipeline-orchestration" : i === 8 ? "risk-and-fallback" : i === 9 ? "rubric-and-self-check" : "capstone"}.md`);
}

if (exists("README.md")) {
  const text = read("README.md");
  checkExactCount(text, /^## Step [0-9]{2}/gm, 10, "README has 10 steps");

  const requiredHeadings = [
    "### Step Goal",
    "### Why this matters",
    "### Input -> Output",
    "### How to write this prompt",
    "### 你先寫版本",
    "### 示範版本（可直接貼到 Cline）",
    "### How to test in Cline",
    "### Pass Criteria",
    "### 常見失敗訊號",
    "### 修正 prompt A",
    "### 修正 prompt B"
  ];

  for (const heading of requiredHeadings) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    checkExactCount(text, new RegExp(`^${escaped}$`, "gm"), 10, `README heading count: ${heading}`);
  }

  checkMinCount(
    text,
    /^## Session Packs$/gm,
    1,
    "README includes Session Packs section"
  );
}

if (exists("SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md")) {
  const text = read("SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md");
  checkExactCount(text, /^## Step [0-9]{2} Prompt/gm, 10, "Session pack has 10 step prompts");
  checkMinCount(text, /^### Checkpoint$/gm, 10, "Session pack has checkpoints");
  checkMinCount(text, /^### Repair Prompt$/gm, 10, "Session pack has repair prompts");
}

if (strict) {
  for (let i = 1; i <= 10; i += 1) {
    const file = `prompts/${String(i).padStart(2, "0")}-${i === 1 ? "scope-boundary" : i === 2 ? "context-triage" : i === 3 ? "token-budget-and-slicing" : i === 4 ? "delphi-ui-semantics" : i === 5 ? "delphi-to-web-mapping" : i === 6 ? "nextjs-route-planning" : i === 7 ? "pipeline-orchestration" : i === 8 ? "risk-and-fallback" : i === 9 ? "rubric-and-self-check" : "capstone"}.md`;

    if (!exists(file)) {
      continue;
    }

    const text = read(file);
    for (const h of ["## Role", "## Objective", "## Constraints", "## Output Format"]) {
      const escaped = h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      checkMinCount(text, new RegExp(`^${escaped}$`, "gm"), 1, `${file} includes ${h}`);
    }
  }
}

const failed = checks.filter((c) => !c.ok);
const passed = checks.filter((c) => c.ok);

for (const c of checks) {
  const mark = c.ok ? "PASS" : "FAIL";
  const detail = c.detail ? ` (${c.detail})` : "";
  console.log(`[${mark}] ${c.name}${detail}`);
}

console.log(`\nSummary: ${passed.length} passed, ${failed.length} failed`);
if (failed.length > 0) {
  process.exitCode = 1;
}
