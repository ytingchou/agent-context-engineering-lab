# Session 03 - Chain To Capstone Bridge

## 目的
把 `Session 02` 的六階段輸出，整合成可交付的 Step 10 Capstone 最終產物。

## 先決條件
你已經有以下輸出（可摘要貼，不必全文）：
- Stage 1: Delphi Source Inventory
- Stage 2: DFM Analyzer output
- Stage 3: Context Summary
- Stage 4: ASCII UI Layout
- Stage 5: Pseudo React
- Stage 6: Next.js Page Contract

## 固定限制
- Cline + Qwen3
- 128k token budget
- offline only
- local evidence only

---

## Phase 1 Prompt - Artifact Normalization
```md
## Role
You are an artifact normalization assistant.

## Objective
Normalize six stage outputs into a compact and consistent artifact packet for capstone synthesis.

## Inputs
<PASTE_STAGE_1_TO_6_OUTPUT_SUMMARIES>

## Constraints
- Preserve only high-signal migration content.
- Keep each normalized artifact concise and structured.

## Output Format
Return exactly:
1) Normalized Artifact A (Source Inventory)
2) Normalized Artifact B (DFM Semantics)
3) Normalized Artifact C (Context Summary)
4) Normalized Artifact D (ASCII Layout)
5) Normalized Artifact E (Pseudo React)
6) Normalized Artifact F (Next.js Contract)
```

### Checkpoint
- 六段齊全
- 每段都可單獨被引用

### Repair Prompt
```md
Reformat into exactly six normalized artifacts and remove low-signal or duplicate details.
```

---

## Phase 2 Prompt - Gap Detection
把 Phase 1 輸出貼進去。

```md
## Role
You are a migration gap detector.

## Objective
Detect missing or weak links between normalized artifacts before capstone generation.

## Inputs
Phase 1 output:
<PASTE_PHASE_1_OUTPUT>

## Constraints
- Focus on linkage gaps across stage boundaries.
- Include only actionable gaps.

## Output Format
Return exactly:
1) Linkage Gaps
2) Severity (High/Medium/Low)
3) Required Clarifications
4) Auto-fix Suggestions
```

### Checkpoint
- 有 Linkage Gaps
- 每個 gap 有嚴重度

### Repair Prompt
```md
Add stage-boundary linkage gaps with explicit severity and one concrete clarification action per gap.
```

---

## Phase 3 Prompt - Capstone Synthesis
把 Phase 1 + Phase 2 輸出貼進去。

```md
## Role
You are the lead context engineer producing the final capstone blueprint.

## Objective
Synthesize a decision-complete capstone plan using normalized artifacts and resolved gaps.

## Inputs
- Phase 1 output:
<PASTE_PHASE_1_OUTPUT>
- Phase 2 output:
<PASTE_PHASE_2_OUTPUT>

## Constraints
- Enforce offline assumptions.
- If required information is missing, return Missing Inputs before finalizing.

## Output Format
Return exactly:
1) Stage Plan
2) Context Slicing Strategy
3) Pipeline Prompt Set
4) Risk Register
5) Verification Checklist
```

### Checkpoint
- 5 段固定格式
- 每段內容對應到 artifact chain

### Repair Prompt
```md
Normalize to exactly five required sections and map each section back to the artifact chain evidence.
```

---

## Phase 4 Prompt - Capstone Audit
把 Phase 3 輸出貼進去。

```md
## Role
You are a capstone quality auditor.

## Objective
Score and audit capstone output against structural, constraint, and verification quality gates.

## Inputs
Phase 3 output:
<PASTE_PHASE_3_OUTPUT>

## Constraints
- Use strict pass/fail thinking.
- Flag critical failures first.

## Output Format
Return exactly:
1) Critical Fail Check
2) Rubric Score (0-100)
3) Structural Issues
4) Constraint Violations
5) Repair Actions
```

### Checkpoint
- 有分數
- 有明確修正行動

### Repair Prompt
```md
Re-audit with strict critical-fail filtering and provide prioritized repair actions.
```

---

## Session Exit Criteria
- Phase 1~4 全部通過 checkpoint。
- Phase 3 產出可直接當最終 Capstone 提交版本。
- Phase 4 分數 >= 80 且無 critical fail。
