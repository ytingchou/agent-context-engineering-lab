# Session 09 - Rubric v2 Calibration

## 目的
把 rubric 升級到可校準、可比較、可複驗，降低評分主觀漂移。

## 固定限制
- scoring must be reproducible
- evidence-based judgments only

---

## Scenario 1 Prompt - Rubric Weakness Scan
```md
## Role
You are a rubric analyst.

## Objective
Identify weaknesses in current migration evaluation rubric.

## Constraints
- Focus on ambiguity and scoring variance sources.

## Output Format
Return exactly:
1) Weakness Inventory
2) Variance Sources
3) Ambiguity Hotspots
4) Impact Scope
5) Improvement Targets
```

### Checkpoint
- 有 variance sources

### Repair Prompt
```md
Expand weakness scan with concrete variance sources and impact scope.
```

---

## Scenario 2 Prompt - Anchor Definition
把 Scenario 1 輸出貼進去。

```md
## Role
You are a rubric anchor designer.

## Objective
Define score anchors for each rubric dimension.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Anchors must separate adjacent score bands.

## Output Format
Return exactly:
1) Dimension Anchors
2) Score Band Definitions
3) Boundary Examples
4) Misclassification Risks
5) Anchor Revision Notes
```

### Checkpoint
- 有 score bands + boundary examples

### Repair Prompt
```md
Add boundary examples and tighten score band definitions to reduce overlap.
```

---

## Scenario 3 Prompt - Sample-Based Calibration
把 Scenario 2 輸出貼進去。

```md
## Role
You are a calibration facilitator.

## Objective
Calibrate rubric using sample outputs and expected scores.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Include disagreement patterns.

## Output Format
Return exactly:
1) Calibration Samples
2) Expected Scores
3) Observed Score Variance
4) Disagreement Patterns
5) Recalibration Actions
```

### Checkpoint
- 有 observed variance
- 有 recalibration actions

### Repair Prompt
```md
Add observed variance analysis and concrete recalibration actions for disagreement hotspots.
```

---

## Scenario 4 Prompt - Evaluator Alignment Protocol
把 Scenario 3 輸出貼進去。

```md
## Role
You are an evaluator alignment designer.

## Objective
Create protocol to keep evaluators aligned over time.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Include drift detection cadence.

## Output Format
Return exactly:
1) Alignment Protocol
2) Drift Detection Cadence
3) Trigger Thresholds
4) Corrective Actions
5) Evidence Logs
```

### Checkpoint
- 有 cadence + thresholds

### Repair Prompt
```md
Add drift detection cadence and trigger thresholds with corrective actions.
```

---

## Scenario 5 Prompt - Rubric v2 Publish Contract
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are a rubric release manager.

## Objective
Publish rubric v2 contract for operational use.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Keep contract versioned and backward-aware.

## Output Format
Return exactly:
1) Rubric v2 Spec
2) Migration From v1
3) Compatibility Notes
4) Adoption Checklist
5) Version Governance
```

### Checkpoint
- 有 v1->v2 migration
- 有 version governance

### Repair Prompt
```md
Add explicit v1-to-v2 migration rules and version governance controls.
```

---

## Session Exit Criteria
- 5 個 scenario 全部通過 checkpoint。
- Rubric v2 可直接投入評估流程。
