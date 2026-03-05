# Session 05 - Multi-Form Prioritization And Slicing

## 目的
當 Delphi 專案有多個 Form 時，建立可操作的優先級排序、批次切片、與執行順序，避免一次吃掉全部 context。

## 適用情境
- 你已不只處理 `ComplexExcelLikeForm`，而是要面對多個表單。
- 你需要一個可重複的「先做哪個、為什麼、怎麼分批」決策框架。

## 固定限制
- Cline + Qwen3
- 128k context
- offline
- local evidence only

## 建議前置
- 完成 `SESSION-02-DELPHI-TO-NEXTJS-CHAIN.md`
- 完成 `SESSION-04-FAILURE-INJECTION-AND-RECOVERY.md`

---

## Scenario 1 Prompt - Form Inventory And Scoring Factors
```md
## Role
You are a multi-form migration planner.

## Objective
Build a form inventory and scoring factors for migration prioritization.

## Constraints
- Use local repository evidence only.
- Include business impact and migration complexity dimensions.

## Output Format
Return exactly:
1) Form Inventory
2) Scoring Dimensions
3) Weight Proposal
4) Unknowns
```

### Checkpoint
- 有 Form Inventory
- 有可量化 scoring dimensions

### Repair Prompt
```md
Rebuild the scoring framework with measurable dimensions and explicit weighting logic.
```

---

## Scenario 2 Prompt - Priority Ranking
把 Scenario 1 輸出貼進去。

```md
## Role
You are a prioritization analyst.

## Objective
Rank forms by migration priority with transparent scoring.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Show score breakdown per form.
- Identify tie-breaking rules.

## Output Format
Return exactly:
1) Ranked Form List
2) Score Breakdown Table
3) Tie-Breaking Rules
4) Priority Risks
```

### Checkpoint
- 有排名 + score breakdown
- 有 tie-breaking rules

### Repair Prompt
```md
Add transparent score breakdown and deterministic tie-breaking for forms with similar scores.
```

---

## Scenario 3 Prompt - Batch Slicing Strategy
把 Scenario 2 輸出貼進去。

```md
## Role
You are a context batch slicing strategist.

## Objective
Convert prioritized forms into token-safe migration batches.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Respect 128k token budget.
- Keep 20-30% reserve for reasoning/output.

## Output Format
Return exactly:
1) Batch Plan
2) Batch Inclusion Rules
3) Batch Order
4) Overflow Handling
5) Rollback Points
```

### Checkpoint
- 有 batch order
- 有 overflow + rollback points

### Repair Prompt
```md
Refine into deterministic batch slices with explicit overflow handling and rollback points per batch.
```

---

## Scenario 4 Prompt - Execution Calendar
把 Scenario 3 輸出貼進去。

```md
## Role
You are an execution scheduler for migration batches.

## Objective
Turn batch plan into a practical execution calendar with checkpoints.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Include checkpoint gates per batch.
- Include recovery branch if a batch fails.

## Output Format
Return exactly:
1) Execution Calendar
2) Batch Checkpoint Gates
3) Failure Branching Plan
4) Re-entry Conditions
5) Delivery Readiness Criteria
```

### Checkpoint
- 有 checkpoint gates
- 有 failure branching + re-entry

### Repair Prompt
```md
Rebuild calendar with explicit checkpoint gates and failure branching paths for each batch.
```

---

## Scenario 5 Prompt - Capstone Feed Contract
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are a capstone feed contract designer.

## Objective
Create the input contract to feed multi-form migration outputs into Session-03 capstone synthesis.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Contract must be compact and reusable.
- Must include missing-input stop conditions.

## Output Format
Return exactly:
1) Feed Contract Schema
2) Mandatory Fields
3) Optional Fields
4) Validation Rules
5) Missing-Input Protocol
```

### Checkpoint
- 有 feed contract schema
- 有 mandatory/optional/validation 三層

### Repair Prompt
```md
Normalize output to the exact five sections and enforce explicit missing-input protocol.
```

---

## Session Exit Criteria
- 5 個 scenario 都通過 checkpoint。
- 產出可直接回饋到 Session-03 Phase 3 的 capstone synthesis。
- 你能說明多表單優先級如何影響 token slicing 和交付順序。
