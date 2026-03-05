# Session 04 - Failure Injection And Recovery

## 目的
故意製造高機率失敗情境，訓練你在 Cline 中做可控恢復，而不是盲目重試。

## 涵蓋故障型態
1. Context Overflow
2. Semantic Ambiguity
3. Mapping Drift
4. Recovery Decision Gate

## 固定限制
- Cline + Qwen3
- 128k context
- offline
- local evidence only

## 建議前置
- 先完成 `SESSION-02-DELPHI-TO-NEXTJS-CHAIN.md`
- 再完成 `SESSION-03-CHAIN-TO-CAPSTONE.md`

---

## Scenario 1 Prompt - Context Overflow Injection
```md
## Role
You are a failure-injection operator for context engineering.

## Objective
Simulate a context-overflow risk in a Delphi-to-Next.js planning run and produce a controlled recovery plan.

## Inputs
- Existing migration artifacts from previous sessions.
- Current context strategy assumptions.

## Constraints
- Do not increase context budget.
- Recovery must be deterministic and repeatable.

## Output Format
Return exactly:
1) Overflow Trigger Pattern
2) Early Warning Signals
3) Immediate Containment Actions
4) Two-Level Recovery Path
5) Verification Checks
```

### Checkpoint
- 有明確 Trigger Pattern
- 有兩層 Recovery Path

### Repair Prompt
```md
Refine with measurable overflow triggers and a strict two-level recovery sequence with verification checks.
```

---

## Scenario 2 Prompt - Semantic Ambiguity Injection
把 Scenario 1 輸出貼進去。

```md
## Role
You are a semantic-ambiguity triage assistant.

## Objective
Inject ambiguity into Delphi UI semantics and define disambiguation protocol.

## Inputs
Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>

## Constraints
- Focus on high-impact ambiguity only.
- Do not generate implementation code.

## Output Format
Return exactly:
1) Ambiguity Cases
2) Impacted Stages
3) Disambiguation Questions
4) Fallback Assumptions
5) Confidence Recalibration
```

### Checkpoint
- 每個 ambiguity case 都有 impacted stage
- 有可執行的 disambiguation questions

### Repair Prompt
```md
Rebuild ambiguity analysis with stage linkage and concrete disambiguation questions that can be answered from local evidence.
```

---

## Scenario 3 Prompt - Mapping Drift Injection
把 Scenario 2 輸出貼進去。

```md
## Role
You are a mapping-drift investigator.

## Objective
Inject and analyze drift between Delphi semantics and web mapping outputs.

## Inputs
Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>

## Constraints
- Highlight only drift that changes migration decisions.
- Include both detection and correction paths.

## Output Format
Return exactly:
1) Drift Symptoms
2) Drift Root Causes
3) Detection Heuristics
4) Correction Plan
5) Regression Guards
```

### Checkpoint
- 有 drift root cause
- 有 detection heuristic + regression guard

### Repair Prompt
```md
Strengthen drift analysis by adding root-cause traceability and one regression guard per detected drift symptom.
```

---

## Scenario 4 Prompt - Recovery Decision Gate
把 Scenario 1~3 輸出貼進去。

```md
## Role
You are a recovery decision gatekeeper.

## Objective
Decide whether to continue, rollback, or re-scope the migration pipeline after injected failures.

## Inputs
- Scenario 1 output:
<PASTE_SCENARIO_1_OUTPUT>
- Scenario 2 output:
<PASTE_SCENARIO_2_OUTPUT>
- Scenario 3 output:
<PASTE_SCENARIO_3_OUTPUT>

## Constraints
- Decision must be evidence-based.
- Include explicit go/no-go criteria.

## Output Format
Return exactly:
1) Decision (Continue / Rollback / Re-scope)
2) Decision Rationale
3) Required Preconditions
4) Execution Steps
5) Post-Recovery Validation
```

### Checkpoint
- Decision 三選一明確
- 有 preconditions + post-recovery validation

### Repair Prompt
```md
Normalize to the exact five sections and enforce explicit go/no-go criteria tied to evidence.
```

---

## Session Exit Criteria
- 4 個 scenario 全部通過 checkpoint。
- 你可以說明每種故障的 trigger、處置、驗收方法。
- Scenario 4 決策可回饋到 Session-03 的 Capstone 產物修正。
