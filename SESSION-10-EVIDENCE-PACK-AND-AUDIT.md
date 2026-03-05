# Session 10 - Evidence Pack And Audit Narrative

## 目的
建立完整證據包與審計敘事，讓 migration 成果可被第三方驗證。

## 固定限制
- evidence must be traceable
- no unverifiable claims

---

## Scenario 1 Prompt - Evidence Source Inventory
```md
## Role
You are an evidence curator.

## Objective
Inventory all evidence sources supporting migration outcomes.

## Constraints
- Include source path and trust level.

## Output Format
Return exactly:
1) Evidence Source Inventory
2) Trust Levels
3) Evidence Coverage Map
4) Missing Evidence Areas
5) Collection Plan
```

### Checkpoint
- 有 trust levels

### Repair Prompt
```md
Add trust levels and coverage map for each evidence source.
```

---

## Scenario 2 Prompt - Evidence Normalization
把 Scenario 1 輸出貼進去。

```md
## Role
You are an evidence normalizer.

## Objective
Normalize heterogeneous evidence into a consistent audit-ready schema.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Include provenance metadata.

## Output Format
Return exactly:
1) Normalized Evidence Schema
2) Required Metadata
3) Normalization Rules
4) Quality Flags
5) Rejection Rules
```

### Checkpoint
- 有 provenance metadata
- 有 rejection rules

### Repair Prompt
```md
Add provenance metadata requirements and strict rejection rules for low-quality evidence.
```

---

## Scenario 3 Prompt - Audit Narrative Draft
把 Scenario 2 輸出貼進去。

```md
## Role
You are an audit narrative writer.

## Objective
Draft a coherent narrative linking migration claims to normalized evidence.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Every claim must reference evidence IDs.

## Output Format
Return exactly:
1) Audit Narrative
2) Claim-to-Evidence Links
3) Confidence Statements
4) Open Audit Questions
5) Reviewer Notes
```

### Checkpoint
- claim 有 evidence link

### Repair Prompt
```md
Map every claim to evidence IDs and flag unsupported statements.
```

---

## Scenario 4 Prompt - Compliance Gap Mapping
把 Scenario 3 輸出貼進去。

```md
## Role
You are a compliance gap mapper.

## Objective
Identify compliance gaps between audit narrative and required controls.

## Inputs
Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Prioritize high-impact gaps.

## Output Format
Return exactly:
1) Compliance Gaps
2) Gap Severity
3) Required Remediation
4) Owners And Deadlines
5) Revalidation Plan
```

### Checkpoint
- 有 severity + owner/deadline

### Repair Prompt
```md
Add severity, owner, and deadline for each gap with revalidation plan.
```

---

## Scenario 5 Prompt - Final Evidence Pack Index
把 Scenario 1~4 輸出貼進去。

```md
## Role
You are the final evidence pack publisher.

## Objective
Publish a final index for audit-ready migration evidence package.

## Inputs
- Scenario 1 output
- Scenario 2 output
- Scenario 3 output
- Scenario 4 output

## Constraints
- Keep index navigable and versioned.

## Output Format
Return exactly:
1) Evidence Pack Index
2) Section Structure
3) Version Stamp
4) Audit Access Notes
5) Maintenance Plan
```

### Checkpoint
- 有 version stamp
- 有 maintenance plan

### Repair Prompt
```md
Add version stamp and maintenance plan to ensure audit package longevity.
```

---

## Session Exit Criteria
- 5 個 scenario 全部通過 checkpoint。
- 可提供第三方審查的 evidence pack。
