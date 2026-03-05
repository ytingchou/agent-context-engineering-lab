# Session 02 - Delphi To Next.js Artifact Chain Run

## 目的
直接針對最終產物鏈做一次端到端演練。

```text
Delphi Source
     ↓
DFM Analyzer
     ↓
Context Summary
     ↓
ASCII UI Layout
     ↓
Pseudo React
     ↓
Next.js Page
```

## 固定限制
- Environment: Cline + Qwen3
- Context: 128k
- Network: offline
- Evidence: local repo only

## 建議資料來源
- `examples/local-inputs/ComplexExcelLikeForm.dfm`
- `pipelines/DELPHI-TO-NEXTJS-PIPELINE.md`
- `examples/local-inputs/pipeline-config.json`
- `examples/local-inputs/target-page-requirements.md`

---

## Stage 1 Prompt - Delphi Source Inventory
```md
## Role
You are a Delphi source inventory assistant.

## Objective
Create an inventory of migration-relevant Delphi source artifacts.

## Constraints
- Use local evidence only.
- Focus on migration-critical files/modules/forms.

## Output Format
Return sections:
1) Source Inventory
2) Form Candidates
3) Dependency Signals
4) Missing Evidence
```

### Checkpoint
- 有 4 段固定標題
- Missing Evidence 非空時具體可追查

### Repair Prompt
```md
Refine the inventory to include only migration-critical artifacts and convert vague items into concrete path-level evidence.
```

---

## Stage 2 Prompt - DFM Analyzer
把 Stage 1 輸出貼進去。

```md
## Role
You are a DFM analysis assistant.

## Objective
Extract structured UI semantics from prioritized Delphi form evidence.

## Inputs
Stage 1 output:
<PASTE_STAGE_1_OUTPUT>

## Constraints
- No frontend implementation code.
- Capture controls, states, interactions, and validation semantics.

## Output Format
Return a table with columns:
- Delphi Element
- Semantic Role
- State Signal
- Interaction Signal
- Validation Signal
- Confidence
- Open Question
```

### Checkpoint
- 無程式碼輸出
- 每列都有 Semantic Role

### Repair Prompt
```md
Convert output into pure semantic analysis table and fill missing state/interaction/validation fields.
```

---

## Stage 3 Prompt - Context Summary
把 Stage 2 輸出貼進去。

```md
## Role
You are a context compression assistant.

## Objective
Compress DFM semantic analysis into token-budgeted migration context.

## Inputs
Stage 2 output:
<PASTE_STAGE_2_OUTPUT>

## Constraints
- Respect 128k budget planning.
- Keep only migration-relevant semantic content.

## Output Format
Return exactly:
1) Must Keep Summary
2) Defer Summary
3) Unknowns
4) Budget Notes
```

### Checkpoint
- 有 Defer Summary
- Budget Notes 含比例或配額語句

### Repair Prompt
```md
Rebalance summary with explicit must-keep vs defer split and include clear budget allocation notes.
```

---

## Stage 4 Prompt - ASCII UI Layout
把 Stage 3 輸出貼進去。

```md
## Role
You are an ASCII layout planner.

## Objective
Represent the target UI as an ASCII structural layout preserving Delphi interaction hierarchy.

## Inputs
Stage 3 output:
<PASTE_STAGE_3_OUTPUT>

## Constraints
- ASCII text only.
- Preserve region hierarchy and interaction zones.

## Output Format
Return exactly:
1) Layout Legend
2) ASCII Layout
3) Interaction Hotspots
4) Ambiguities
```

### Checkpoint
- 有可讀的 ASCII 區塊結構
- 有 Interaction Hotspots

### Repair Prompt
```md
Rewrite layout with clearer region hierarchy and explicitly mark interaction hotspots in ASCII form.
```

---

## Stage 5 Prompt - Pseudo React
把 Stage 4 輸出貼進去。

```md
## Role
You are a pseudo React planner.

## Objective
Translate ASCII layout and semantics into pseudo component architecture.

## Inputs
Stage 4 output:
<PASTE_STAGE_4_OUTPUT>

## Constraints
- Pseudo structure only, not runnable code.
- Expose component responsibilities and state boundaries.

## Output Format
Return exactly:
1) Component Tree
2) State Model
3) Event/Handler Model
4) Data Flow Notes
```

### Checkpoint
- 有 Component Tree
- 有 State Model 與 Data Flow Notes

### Repair Prompt
```md
Refine pseudo React output to include explicit parent/child responsibilities and state ownership boundaries.
```

---

## Stage 6 Prompt - Next.js Page Contract
把 Stage 5 輸出貼進去。

```md
## Role
You are a Next.js page contract planner.

## Objective
Produce final App Router-oriented page contract from pseudo React plan.

## Inputs
Stage 5 output:
<PASTE_STAGE_5_OUTPUT>

## Constraints
- No external dependencies.
- Include server/client boundary and verification checklist.

## Output Format
Return exactly:
1) Route and Page Contract
2) Server/Client Boundary
3) Data Boundary
4) Risk Notes
5) Verification Checklist
```

### Checkpoint
- 5 段完整
- Verification Checklist 可判定 pass/fail

### Repair Prompt
```md
Normalize to the exact 5 sections and ensure verification checklist contains testable pass/fail conditions.
```

---

## Session Exit Criteria
- 六個 stage 都通過 checkpoint。
- 輸出鏈可完整銜接，不發生格式斷裂。
- 最終 Next.js Page Contract 可直接作為下一輪 Step 10 Capstone 的輸入。
