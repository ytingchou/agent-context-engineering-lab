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

function collectMarkdownFiles(baseDir, prefix = "") {
  if (!fs.existsSync(baseDir)) {
    return [];
  }
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

function collectRepoMarkdownFiles(baseDir, prefix = "") {
  if (!fs.existsSync(baseDir)) {
    return [];
  }
  const entries = fs.readdirSync(baseDir, { withFileTypes: true });
  const out = [];
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    const full = path.join(baseDir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectRepoMarkdownFiles(full, rel));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(rel);
    }
  }
  return out;
}

const requiredCoreFiles = [
  "README.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "ROADMAP.md",
  "LEARNING-JOURNEY.md",
  "package.json",
  "AGENTS.md",
  ".clinerules",
  "scripts/check-lab.mjs",
  "scripts/list-prompts.mjs",
  "scripts/list-sessions.mjs",
  "scripts/run-session.mjs",
  "rubrics/capstone-rubric.md",
  "examples/capstone-output-skeleton.md",
  "examples/pipeline-output-template.md",
  "examples/local-inputs/ComplexExcelLikeForm.dfm",
  "examples/local-inputs/pipeline-config.json",
  "examples/local-inputs/target-page-requirements.md",
  "examples/local-inputs/source-context-notes.md",
  "pipelines/DELPHI-TO-NEXTJS-PIPELINE.md",
  "sessions/README.md",
  "sessions/session-record-template.md",
  "sessions/catalog.json",
  ".cline/workflows/run-agent-context-lab.md",
  ".cline/workflows/recover-failed-step.md"
];

for (const file of requiredCoreFiles) {
  checkFile(file);
}

let sessions = [];
const sessionCatalogPath = "sessions/catalog.json";
if (exists(sessionCatalogPath)) {
  try {
    sessions = JSON.parse(read(sessionCatalogPath));
    if (!Array.isArray(sessions)) {
      fail("sessions/catalog.json format", "must be an array");
      sessions = [];
    } else {
      pass("sessions/catalog.json format", `count=${sessions.length}`);
    }
  } catch (error) {
    fail("sessions/catalog.json parse", error.message);
    sessions = [];
  }
}

for (const session of sessions) {
  if (!session.id || !session.file) {
    fail("session catalog entry", `invalid entry: ${JSON.stringify(session)}`);
    continue;
  }

  checkFile(session.file);

  if (session.workflow) {
    checkFile(session.workflow);
  }

  if (!exists(session.file)) {
    continue;
  }

  const text = read(session.file);
  const prefix = session.section_prefix || "Scenario";
  const expectedCount = Number.isInteger(session.section_count) ? session.section_count : 0;
  const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionRegex = new RegExp(`^## ${escapedPrefix} [0-9]+ Prompt`, "gm");

  checkExactCount(text, sectionRegex, expectedCount, `${session.id} section prompt count`);
  checkMinCount(text, /^### Checkpoint$/gm, expectedCount, `${session.id} checkpoint count`);
  checkMinCount(text, /^### Repair Prompt$/gm, expectedCount, `${session.id} repair prompt count`);
}

for (let i = 0; i <= 10; i += 1) {
  const name = i.toString().padStart(2, "0");
  checkFile(`prompts/${name}-${i === 0 ? "prompt-packet-template" : i === 1 ? "scope-boundary" : i === 2 ? "context-triage" : i === 3 ? "token-budget-and-slicing" : i === 4 ? "delphi-ui-semantics" : i === 5 ? "delphi-to-web-mapping" : i === 6 ? "nextjs-route-planning" : i === 7 ? "pipeline-orchestration" : i === 8 ? "risk-and-fallback" : i === 9 ? "rubric-and-self-check" : "capstone"}.md`);
}

if (exists("README.md")) {
  const text = read("README.md");
  checkMinCount(text, /^## 學習旅程主軸$/gm, 1, "README includes learning journey section");
  checkMinCount(text, /^## 最終產物鏈$/gm, 1, "README includes final artifact chain section");
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

  checkMinCount(text, /^## Session Packs$/gm, 1, "README includes Session Packs section");

  for (const session of sessions) {
    if (session.file) {
      const escaped = session.file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      checkMinCount(text, new RegExp(escaped, "g"), 1, `README references ${session.file}`);
    }
  }
}

const allMarkdownFiles = collectRepoMarkdownFiles(root);
const forbiddenPathPatterns = [
  /dfm-to-web\//g,
  /frontend-workshop\//g
];
for (const rel of allMarkdownFiles) {
  const text = read(rel);
  for (const pattern of forbiddenPathPatterns) {
    const count = countMatches(text, pattern);
    if (count > 0) {
      fail(`forbidden external dependency in ${rel}`, `${pattern.source} count=${count}`);
    } else {
      pass(`no forbidden dependency in ${rel}: ${pattern.source}`);
    }
  }
}

if (strict) {
  const promptRoot = path.join(root, "prompts");
  const promptFiles = collectMarkdownFiles(promptRoot);

  checkMinCount(
    promptFiles.join("\n"),
    /\.md/g,
    20,
    "prompt file count is sufficient"
  );

  for (const rel of promptFiles) {
    const file = `prompts/${rel}`;
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
