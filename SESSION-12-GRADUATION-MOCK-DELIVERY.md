# Session 12 - Graduation Mock Delivery

## 目的
做一次完整 mock delivery，驗證你已能從 prompt/context 到 migration delivery 全流程獨立作業。

## 固定限制
- end-to-end evidence required
- all decisions must be traceable

---

## Scenario 1 Prompt - Integrated Scenario Definition
```md
## Role
You are a mock delivery director.

## Objective
Define integrated mock migration scenario covering scope, risks, and target outcomes.

## Constraints
- Must reference outputs from prior sessions.

## Output Format
Return exactly:
1) Scenario Definition
2) Success Targets
3) Constraints
4) Risk Envelope
5) Required Inputs
```

### Checkpoint
- 有 success targets + required inputs

### Repair Prompt
```md
Refine scenario with explicit success targets, constraints, and required inputs.
```

---

## Scenario 2 Prompt - End-to-End Run Plan
把 Scenario 1 輸出貼進去。

```md
## Role
You are an end-to-end run planner.

## Objective
Create execution plan spanning analysis, synthesis, validation, and handoff.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Include checkpoints and fallback branches.

## Output Format
Return exactly:
1) Run Phases
2) Phase Gates
3) Fallback Branches
4) Evidence Capture
5) Completion Criteria
```

### Checkpoint
- 有 phase gates + fallback

### Repair Prompt
```md
Add phase gates and fallback branches with explicit completion criteria.
```

---

## Scenario 3 Prompt - Mock Delivery Output Package
把 Scenario 2 輸出貼進去。

```md
## Role
You are a delivery package assembler.

## Objective
Assemble output package from the mock run.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Package must be review-ready.

## Output Format
Return exactly:
1) Output Package Structure
2) Key Deliverables
3) Validation Results
4) Open Risks
5) Handoff Notes
```

### Checkpoint
- 有 validation results
- 有 handoff notes

### Repair Prompt
```md
Add validation results and handoff notes to make package review-ready.
```

---

## Scenario 4 Prompt - Stakeholder Review Response
把 Scenario 3 輸出貼進去。

```md
## Role
You are a stakeholder-response coordinator.

## Objective
Prepare structured response to likely stakeholder review questions.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Responses must tie back to evidence.

## Output Format
Return exactly:
1) Expected Questions
2) Evidence-Backed Responses
3) Weak Spots
4) Mitigation Commitments
5) Follow-up Actions
```

### Checkpoint
- 回答有 evidence
- 有 follow-up

### Repair Prompt
```md
Map every response to supporting evidence and add concrete follow-up actions.
```

---

## Scenario 5 Prompt - Graduation Verdict
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are a graduation evaluator.

## Objective
Issue final readiness verdict for independent AI-assisted migration delivery.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Verdict must include strengths and remaining gaps.

## Output Format
Return exactly:
1) Verdict
2) Strengths
3) Remaining Gaps
4) Required Next Actions
5) Graduation Criteria Status
```

### Checkpoint
- 有 verdict + gaps + next actions

### Repair Prompt
```md
Make verdict explicit and include concrete next actions with graduation criteria status.
```

---

## Session Exit Criteria
- 5 個 scenario 全部通過 checkpoint。
- 你可獨立完成一次端到端 migration mock delivery。
