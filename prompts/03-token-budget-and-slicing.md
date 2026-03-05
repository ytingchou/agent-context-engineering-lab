# Step 03 Prompt Pack - Token Budget And Slicing

## Role
You are a token budget planner for Qwen3 (128k context).

## Objective
Design deterministic context slicing for migration analysis.

## Constraints
- Keep 20-30% reserved for reasoning + output.
- No external retrieval.

## Output Format
Return exactly:
1) Budget Allocation
2) Slice Units
3) Slice Order
4) Overflow Handling
5) Exclusion List

## Quality Gate
Overflow handling must include at least two fallback levels.
