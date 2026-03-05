# Session 06 - Human-Review Handoff Package Generation

## 目的
把 migration 結果轉成可交接、可審查、可維運的 handoff package。

## 固定限制
- Cline + Qwen3
- 128k
- offline
- local evidence only

---

## Scenario 1 Prompt - Handoff Audience And Scope
```md
## Role
You are a handoff planner.

## Objective
Define handoff package scope for dev, reviewer, and maintainer audiences.

## Constraints
- Scope must be role-specific.
- Avoid implementation noise.

## Output Format
Return exactly:
1) Audience Profiles
2) Handoff Objectives
3) In-Scope Artifacts
4) Out-of-Scope Items
5) Missing Inputs
```

### Checkpoint
- 有角色分層
- 有 in/out scope

### Repair Prompt
```md
Refine handoff scope by separating audience-specific needs and explicit in/out boundaries.
```

---

## Scenario 2 Prompt - Artifact Manifest
把 Scenario 1 輸出貼進去。

```md
## Role
You are a handoff artifact organizer.

## Objective
Build a manifest of all deliverables required for migration handoff.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Include owner and validation method per artifact.

## Output Format
Return exactly:
1) Artifact Manifest Table
2) Ownership Map
3) Validation Method Map
4) Packaging Order
5) Risks
```

### Checkpoint
- 每個 artifact 有 owner + validation

### Repair Prompt
```md
Add missing ownership and validation method fields for every artifact in the manifest.
```

---

## Scenario 3 Prompt - Reviewer Checklist
把 Scenario 2 輸出貼進去。

```md
## Role
You are a reviewer checklist designer.

## Objective
Generate a reviewer-first checklist for migration handoff quality.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Checklist items must be binary pass/fail.

## Output Format
Return exactly:
1) Critical Checks
2) Structural Checks
3) Constraint Checks
4) Risk Review Checks
5) Fail Escalation Path
```

### Checkpoint
- checklist 可二元判定
- 有 fail escalation

### Repair Prompt
```md
Convert all checklist items into binary pass/fail statements and add escalation path.
```

---

## Scenario 4 Prompt - Open Risk Narrative
把 Scenario 3 輸出貼進去。

```md
## Role
You are a migration risk narrator.

## Objective
Summarize unresolved risks for handoff recipients.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Include likelihood and impact.
- Include mitigation owner.

## Output Format
Return exactly:
1) Risk Summary
2) Likelihood/Impact Grid
3) Mitigation Ownership
4) Acceptance Conditions
5) Monitoring Triggers
```

### Checkpoint
- 有 likelihood/impact
- 有 owner

### Repair Prompt
```md
Add explicit likelihood/impact ratings and assign mitigation owner to each open risk.
```

---

## Scenario 5 Prompt - Final Handoff Package Contract
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are the final handoff package editor.

## Objective
Produce the final handoff contract ready for human review and maintenance transition.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Keep contract concise and auditable.

## Output Format
Return exactly:
1) Package Structure
2) Required Documents
3) Review Gate Criteria
4) Acceptance Sign-off Flow
5) Post-Handoff Follow-up Plan
```

### Checkpoint
- 有 sign-off flow
- 有 follow-up plan

### Repair Prompt
```md
Normalize to the exact five sections and add explicit review sign-off flow with post-handoff follow-up steps.
```

---

## Session Exit Criteria
- 5 個 scenario 全部通過 checkpoint。
- 產出可作為 human-review handoff package 的主索引。
