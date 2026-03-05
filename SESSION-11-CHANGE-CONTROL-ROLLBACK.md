# Session 11 - Change Control And Rollback Drill

## 目的
建立變更控制與回滾演練流程，降低 migration 上線風險。

## 固定限制
- decisions must be reversible
- rollback must be testable

---

## Scenario 1 Prompt - Change Request Packet
```md
## Role
You are a change control analyst.

## Objective
Create structured change request packet for migration updates.

## Constraints
- Include risk and rollback summary.

## Output Format
Return exactly:
1) Change Scope
2) Affected Components
3) Risk Summary
4) Rollback Summary
5) Approval Inputs
```

### Checkpoint
- 有 rollback summary

### Repair Prompt
```md
Add explicit rollback summary and approval inputs for the change packet.
```

---

## Scenario 2 Prompt - Blast Radius Estimation
把 Scenario 1 輸出貼進去。

```md
## Role
You are a blast-radius estimator.

## Objective
Estimate impact radius for proposed migration change.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Include direct and indirect impact chains.

## Output Format
Return exactly:
1) Direct Impact Map
2) Indirect Impact Map
3) Critical Paths
4) Guardrails
5) Residual Risk
```

### Checkpoint
- 有 direct/indirect 分層

### Repair Prompt
```md
Separate direct and indirect impact maps and highlight critical paths.
```

---

## Scenario 3 Prompt - Rollback Playbook
把 Scenario 2 輸出貼進去。

```md
## Role
You are a rollback playbook designer.

## Objective
Create executable rollback playbook for high-risk migration changes.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Include rollback triggers and stop points.

## Output Format
Return exactly:
1) Rollback Triggers
2) Rollback Steps
3) Stop Points
4) Data Integrity Checks
5) Success Criteria
```

### Checkpoint
- 有 triggers + stop points

### Repair Prompt
```md
Add explicit rollback triggers, stop points, and integrity checks.
```

---

## Scenario 4 Prompt - Rollback Simulation Report
把 Scenario 3 輸出貼進去。

```md
## Role
You are a rollback simulation reporter.

## Objective
Simulate rollback execution and report outcomes.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Include failure branches.

## Output Format
Return exactly:
1) Simulation Setup
2) Execution Results
3) Failure Branch Outcomes
4) Recovery Effectiveness
5) Improvement Actions
```

### Checkpoint
- 有 failure branches
- 有 improvement actions

### Repair Prompt
```md
Expand simulation report with failure branch outcomes and targeted improvement actions.
```

---

## Scenario 5 Prompt - Control Board Decision Memo
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are a change control board memo writer.

## Objective
Write final decision memo for approve/hold/reject based on change and rollback evidence.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Decision must be explicit and justified.

## Output Format
Return exactly:
1) Decision
2) Supporting Evidence
3) Conditions
4) Monitoring Plan
5) Revisit Criteria
```

### Checkpoint
- decision 明確
- 有 conditions + monitoring

### Repair Prompt
```md
Normalize memo to exact five sections with explicit decision and monitoring conditions.
```

---

## Session Exit Criteria
- 5 個 scenario 全部通過 checkpoint。
- 變更控制與回滾流程可被操作與審查。
