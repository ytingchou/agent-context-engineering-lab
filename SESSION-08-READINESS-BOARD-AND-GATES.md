# Session 08 - Migration Readiness Board And Release Gates

## 目的
建立 migration readiness board 與 release gate 機制，讓出貨判斷一致化。

## 固定限制
- offline
- evidence-based
- gate decisions must be explicit

---

## Scenario 1 Prompt - Readiness Dimensions
```md
## Role
You are a release readiness architect.

## Objective
Define readiness dimensions for migration delivery evaluation.

## Constraints
- Dimensions must be measurable.

## Output Format
Return exactly:
1) Readiness Dimensions
2) Dimension Definitions
3) Data Sources
4) Scoring Scales
5) Blind Spots
```

### Checkpoint
- dimensions 可量測

### Repair Prompt
```md
Rebuild readiness dimensions with measurable definitions and explicit scoring scales.
```

---

## Scenario 2 Prompt - Gate Criteria
把 Scenario 1 輸出貼進去。

```md
## Role
You are a release gate designer.

## Objective
Define gate criteria and thresholds for migration release decisions.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Include pass, conditional pass, and fail thresholds.

## Output Format
Return exactly:
1) Gate Set
2) Threshold Rules
3) Required Evidence
4) Gate Exceptions
5) Escalation Rules
```

### Checkpoint
- 有三態 threshold

### Repair Prompt
```md
Add explicit pass/conditional/fail thresholds and escalation rules per gate.
```

---

## Scenario 3 Prompt - Board State Model
把 Scenario 2 輸出貼進去。

```md
## Role
You are a readiness board modeler.

## Objective
Design board state transitions for migration readiness tracking.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Include blocked and recovery states.

## Output Format
Return exactly:
1) Board States
2) Transition Rules
3) Entry/Exit Criteria
4) Blocked-State Handling
5) Recovery Path
```

### Checkpoint
- 有 blocked/recovery

### Repair Prompt
```md
Add blocked-state handling and explicit recovery transitions with criteria.
```

---

## Scenario 4 Prompt - Release Dry Run Protocol
把 Scenario 3 輸出貼進去。

```md
## Role
You are a release dry-run planner.

## Objective
Design a dry-run protocol to validate readiness gates before real release.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Include abort conditions.

## Output Format
Return exactly:
1) Dry Run Steps
2) Abort Conditions
3) Recovery Path
4) Evidence Capture Plan
5) Sign-off Inputs
```

### Checkpoint
- 有 abort conditions
- 有 evidence capture

### Repair Prompt
```md
Add explicit abort conditions and evidence capture requirements for each dry-run step.
```

---

## Scenario 5 Prompt - Go/No-Go Memo
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are a go/no-go memo author.

## Objective
Produce final release decision memo from readiness board evidence.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Decision must be unambiguous.

## Output Format
Return exactly:
1) Decision Summary
2) Gate Results
3) Blocking Issues
4) Conditional Actions
5) Final Recommendation
```

### Checkpoint
- decision 明確
- gate results 可追溯

### Repair Prompt
```md
Normalize memo to exact five sections and make final recommendation unambiguous.
```

---

## Session Exit Criteria
- 5 個 scenario 全部通過 checkpoint。
- 可產生可審核的 go/no-go 決策輸出。
