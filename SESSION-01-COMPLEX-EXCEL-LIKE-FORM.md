# Session 01 - Guided Run (ComplexExcelLikeForm)

## 目的
用一個真實本地情境，完整跑一次 Step 01~10。  
這份檔案是「可直接貼到 Cline」的實戰稿。

## 本次情境（固定）
- Delphi source: `examples/local-inputs/ComplexExcelLikeForm.dfm`
- Pipeline reference: `pipelines/DELPHI-TO-NEXTJS-PIPELINE.md`
- Token config reference: `examples/local-inputs/pipeline-config.json`
- Next.js target reference: `examples/local-inputs/target-page-requirements.md`
- Constraints: `Cline + Qwen3`, `128k`, `offline`, `large Delphi project`

## 使用方式
1. 依序執行 Step 01 -> Step 10。
2. 每一步輸出都留著，下一步會貼入。
3. 如果失敗，先跑該步 `Repair Prompt` 再往下。

---

## Step 01 Prompt - Scope Boundary
```md
## Role
You are a scope-definition assistant for an offline migration lab.

## Objective
Define task boundaries for planning migration of `ComplexExcelLikeForm.dfm` into a Next.js-oriented target design.

## Project Context
- Tooling: Cline + Qwen3
- Context budget: 128k
- Network: unavailable
- Source evidence:
  - examples/local-inputs/ComplexExcelLikeForm.dfm
  - pipelines/DELPHI-TO-NEXTJS-PIPELINE.md
  - examples/local-inputs/pipeline-config.json
- Target reference:
  - examples/local-inputs/target-page-requirements.md

## Constraints
- Use only local evidence listed above.
- Do not provide implementation code.
- Explicitly separate in-scope and out-of-scope.

## Output Format
Return exactly:
1) Goal
2) Success Criteria
3) Out of Scope
4) Unknowns
```

### Checkpoint
- 有 4 段固定標題
- Success Criteria 可測量

### Repair Prompt
```md
Revise using exactly the required 4 sections and convert each success criterion into measurable acceptance statements.
```

---

## Step 02 Prompt - Context Triage
在這一步把 Step 01 結果貼進去。

```md
## Role
You are a context triage assistant.

## Objective
Create a context loading priority for this migration planning task.

## Inputs
Step 01 output:
<PASTE_STEP_01_OUTPUT>

## Constraints
- Optimize for minimal relevant context first.
- Do not recommend broad full-repo loading.

## Output Format
Return a table with columns:
- Bucket (Must Read / Should Read / Ignore for Now)
- Candidate Path Pattern
- Why It Matters Now
- Risk If Skipped
```

### Checkpoint
- Must Read 不超過 10 項
- 每列都有 Risk If Skipped

### Repair Prompt
```md
Reduce Must Read to <=10 highest-impact items and add concrete skip-risk for every row.
```

---

## Step 03 Prompt - Token Budget & Slicing
把 Step 02 結果貼進去。

```md
## Role
You are a token budget planner for Qwen3 (128k context).

## Objective
Design deterministic phase-based context slicing for this migration task.

## Inputs
Step 02 output:
<PASTE_STEP_02_OUTPUT>

## Constraints
- Reserve 20-30% for reasoning + output.
- No external retrieval.
- Rules must be repeatable by a human operator.
- Use phase-based control with entry/exit gates and context cap per phase.

## Output Format
Return exactly:
1) Budget Allocation (percent + rationale)
2) Slice Units
3) Slice Order + Phase Gates
4) Overflow Handling (2 fallback levels minimum)
5) Exclusion List
```

### Checkpoint
- 有百分比分配
- 每個 phase 有 entry/exit gate 與 context cap
- Overflow handling 至少兩層

### Repair Prompt
```md
Make slicing deterministic: define inclusion criteria, stop criteria, phase entry/exit gates, and two-level overflow fallback for each slice type.
```

---

## Step 04 Prompt - Delphi UI Semantics Extraction
把 Step 03 結果貼進去。

```md
## Role
You are a Delphi UI semantics extractor.

## Objective
Extract semantic intent from `ComplexExcelLikeForm.dfm` into a web-migration semantic model.

## Inputs
- Step 03 output:
<PASTE_STEP_03_OUTPUT>
- Source form focus:
examples/local-inputs/ComplexExcelLikeForm.dfm

## Constraints
- No React/Next.js code.
- Focus on intent, user interaction, data binding, validation.
- Mark uncertainty explicitly.

## Output Format
Return a markdown table with columns:
- Delphi Element
- Semantic Role
- User Interaction Pattern
- Data Binding Intent
- Validation / Business Rule
- Confidence (High/Medium/Low)
- Open Question
```

### Checkpoint
- 沒有框架程式碼
- Low confidence 有 open question

### Repair Prompt
```md
Remove all implementation code and convert output into pure semantic analysis with complete uncertainty markers.
```

---

## Step 05 Prompt - Delphi -> Web Mapping Matrix
把 Step 04 結果貼進去。

```md
## Role
You are a domain mapping assistant for Delphi-to-Web migration.

## Objective
Generate a mapping matrix from extracted Delphi semantics to web/Next.js concepts.

## Inputs
Step 04 output:
<PASTE_STEP_04_OUTPUT>

## Constraints
- Include rationale and caveats for every mapping.
- Distinguish direct vs partial vs manual mappings.

## Output Format
Return a table:
- Delphi Concept
- Web/Next.js Concept
- Mapping Type (Direct / Partial / Manual)
- Rationale
- Caveat
- Suggested Verification
```

### Checkpoint
- 每列有 rationale + caveat
- Manual mapping 有驗證方法

### Repair Prompt
```md
Reclassify mappings realistically and add one caveat + one verification action per row.
```

---

## Step 06 Prompt - Next.js Route & Responsibility Plan
把 Step 05 結果貼進去。

```md
## Role
You are a Next.js App Router architecture planner.

## Objective
Create a route and responsibility design from the Delphi-to-web mapping matrix.

## Inputs
Step 05 output:
<PASTE_STEP_05_OUTPUT>

## Constraints
- No implementation code.
- Clearly separate route responsibility and data boundary.
- Include server/client boundary notes.

## Output Format
Return exactly:
1) Route Tree
2) Page Responsibility Matrix
3) Data Boundary Notes
4) Shared UI/State Candidates
5) Open Decisions
```

### Checkpoint
- 每個 route 都有 primary responsibility
- 有 server/client 邊界

### Repair Prompt
```md
Expand each route with one primary responsibility, one non-goal, and one boundary risk.
```

---

## Step 07 Prompt - Pipeline Stage Orchestration
把 Step 06 結果貼進去。

```md
## Role
You are a prompt-pipeline orchestration designer.

## Objective
Define an end-to-end Delphi -> Next.js planning pipeline with strict stage contracts.

## Inputs
Step 06 output:
<PASTE_STEP_06_OUTPUT>

## Constraints
- Prompt-only simulation.
- Offline-safe assumptions only.

## Output Format
For each stage, return:
- Stage Name
- Input Contract
- Processing Goal
- Output Contract
- Quality Gate
- Failure Action

Then return:
- End-to-end Data Flow Summary
```

### Checkpoint
- 每個 stage 有 input/output contract
- Failure action 可執行

### Repair Prompt
```md
Add machine-checkable contracts for every stage and define trigger-based failure actions.
```

---

## Step 08 Prompt - Failure Modes & Fallback
把 Step 07 結果貼進去。

```md
## Role
You are a risk engineer for prompt-based migration pipelines.

## Objective
Build a stage-by-stage risk register with ordered fallback strategy.

## Inputs
Step 07 output:
<PASTE_STEP_07_OUTPUT>

## Constraints
- Include context overflow, ambiguous semantics, mapping drift.
- Every stage must have at least one failure mode.

## Output Format
Return a table:
- Stage
- Failure Mode
- Trigger Signal
- Impact
- First Mitigation
- Fallback Level 1
- Fallback Level 2
- Escalation Condition
```

### Checkpoint
- 有 trigger signal
- fallback 有順序

### Repair Prompt
```md
Bind each risk to one stage and add measurable trigger signals plus ordered fallback levels.
```

---

## Step 09 Prompt - Evaluation Rubric
把 Step 08 結果貼進去。

```md
## Role
You are a quality gatekeeper for prompt pipeline outputs.

## Objective
Create a scoring rubric and self-review loop for this pipeline.

## Inputs
Step 08 output:
<PASTE_STEP_08_OUTPUT>

## Constraints
- Practical for manual Cline validation.
- Include fail threshold and repair loop.

## Output Format
Return exactly:
1) Rubric Dimensions (name, weight, score range)
2) Critical Fail Conditions
3) Pass Threshold
4) Self-Review Checklist (yes/no)
5) If-Fail Repair Loop

## Quality Gate
- Total score = 100
- At least 5 dimensions
```

### Checkpoint
- 權重合計 100
- 有 critical fail + repair loop

### Repair Prompt
```md
Rebuild rubric to exactly 100 points and map each fail condition to a concrete prompt-revision action.
```

---

## Step 10 Prompt - Capstone Single Prompt
把 Step 01~09 的輸出都貼進去（可摘要貼，不必原文全部）。  
這一步是整個 session 的最終驗收。

```md
## Role
You are the lead context engineer designing an offline Delphi -> Next.js prompt pipeline.

## Objective
Produce a decision-complete pipeline blueprint executable in Cline with Qwen3.

## Project Context
- Tooling: Cline + Qwen3
- Context window: 128k
- Network: unavailable
- Codebase type: large Delphi project
- Scenario: ComplexExcelLikeForm migration planning

## Input Artifacts
- Step 01 scope boundary
- Step 02 context triage
- Step 03 token slicing strategy
- Step 04 UI semantics model
- Step 05 mapping matrix
- Step 06 route/responsibility plan
- Step 07 stage orchestration
- Step 08 risk register
- Step 09 evaluation rubric

## Constraints
- Do not invent external dependencies.
- Use only provided artifacts and locally verifiable assumptions.
- If key inputs are missing, stop and report missing inputs first.

## Output Format
Return exactly these 5 sections:
1) Stage Plan
2) Context Slicing Strategy
3) Pipeline Prompt Set
4) Risk Register
5) Verification Checklist
```

### Checkpoint
- 僅有固定 5 段
- Stage Plan 有 input/output contracts
- Context Slicing 有百分比分配
- Risk Register 有 trigger + fallback
- Verification Checklist 可判定 pass/fail

### Repair Prompt
```md
Normalize output to the exact 5 sections only.
Enforce stop-conditions: if any required artifact is missing, return Missing Inputs first.
```

---

## Session Exit Criteria
- Step 01~10 都通過各自 checkpoint。
- Capstone 5 段齊全且符合 quality gate。
- 你可以口頭說明這次結果如何處理：
  - offline 限制
  - 128k context budgeting
  - large Delphi project slicing
