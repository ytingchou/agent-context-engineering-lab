# Session 07 - Migration Decision Log And Traceability Matrix

## 目的
建立 migration 決策紀錄與跨階段追蹤矩陣，降低後續變更失憶風險。

## 固定限制
- offline
- local evidence only
- decision must be traceable

---

## Scenario 1 Prompt - Decision Inventory
```md
## Role
You are a migration decision recorder.

## Objective
Extract all critical migration decisions from previous sessions.

## Constraints
- Keep only decisions that impact architecture, risk, or delivery.

## Output Format
Return exactly:
1) Decision Inventory
2) Decision Category Map
3) Decision Owners
4) Confidence Level
5) Missing Decision Evidence
```

### Checkpoint
- 有 decision owners
- 有 confidence

### Repair Prompt
```md
Rebuild decision inventory with explicit owners and confidence for each decision.
```

---

## Scenario 2 Prompt - ADR-style Records
把 Scenario 1 輸出貼進去。

```md
## Role
You are an ADR writer.

## Objective
Convert decision inventory into ADR-style records.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Include context, decision, consequence.

## Output Format
Return exactly:
1) ADR Record List
2) Context Summary
3) Chosen Decision
4) Rejected Alternatives
5) Consequence Notes
```

### Checkpoint
- 有 rejected alternatives
- 有 consequence notes

### Repair Prompt
```md
Add rejected alternatives and explicit consequence notes for each ADR record.
```

---

## Scenario 3 Prompt - Traceability Matrix
把 Scenario 2 輸出貼進去。

```md
## Role
You are a traceability engineer.

## Objective
Build a matrix linking Delphi source intent to final migration artifacts.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Include forward and backward trace paths.

## Output Format
Return exactly:
1) Traceability Matrix
2) Forward Trace Rules
3) Backward Trace Rules
4) Broken Trace Alerts
5) Repair Targets
```

### Checkpoint
- 有 forward/backward rules
- 有 broken trace alerts

### Repair Prompt
```md
Add bidirectional trace rules and identify broken trace points with repair targets.
```

---

## Scenario 4 Prompt - Change Impact Propagation
把 Scenario 3 輸出貼進去。

```md
## Role
You are a change impact analyzer.

## Objective
Model how one decision change propagates through the traceability matrix.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Include at least one high-impact change path.

## Output Format
Return exactly:
1) Change Scenarios
2) Impact Propagation Paths
3) Affected Artifacts
4) Risk Escalation
5) Containment Plan
```

### Checkpoint
- 有 propagation paths
- 有 containment plan

### Repair Prompt
```md
Expand with explicit propagation paths and one containment plan per high-impact scenario.
```

---

## Scenario 5 Prompt - Decision Debt Backlog
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are a decision debt manager.

## Objective
Create backlog for unresolved or weakly-supported migration decisions.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Backlog items must be prioritizable.

## Output Format
Return exactly:
1) Debt Backlog Items
2) Priority Scores
3) Resolution Owners
4) Target Resolution Window
5) Verification Criteria
```

### Checkpoint
- backlog 可排序
- 有 owner + window

### Repair Prompt
```md
Reformat backlog into prioritizable items with owners, resolution windows, and verification criteria.
```

---

## Session Exit Criteria
- 5 個 scenario 全部通過 checkpoint。
- 決策鏈可完整追溯到主要 migration 產物。
