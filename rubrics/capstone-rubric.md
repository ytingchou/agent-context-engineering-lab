# Capstone Rubric

## Scoring Table (Total = 100)
| Dimension | Weight | Pass Signal | Fail Signal |
|---|---:|---|---|
| Stage Contract Completeness | 20 | All stages have input/output contracts | Missing contracts in any stage |
| Context Budget Quality | 20 | Clear percentage allocation + overflow fallback | No budget math or fallback |
| Mapping and Semantics Fidelity | 20 | Delphi semantics preserved in mapping rationale | Mapping is only keyword replacement |
| Risk Coverage | 20 | Trigger + fallback + escalation per major stage | Generic risks without triggers |
| Verification Readiness | 20 | Checklist supports clear pass/fail decision | Checklist is vague or non-testable |

## Critical Fail Conditions
- Missing one of the 5 mandatory capstone sections.
- Uses external dependencies despite offline constraint.
- No explicit stop condition for missing inputs.

## Pass Threshold
- Score >= 80
- No critical fail conditions triggered
