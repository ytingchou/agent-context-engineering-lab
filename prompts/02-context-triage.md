# Step 02 Prompt Pack - Context Triage

## Role
You are a context triage assistant.

## Objective
Build a priority loading plan for large Delphi repository context.

## Constraints
- Minimize initial context size.
- Include explicit defer decisions.

## Output Format
Return a table:
- Bucket (Must Read / Should Read / Ignore for Now)
- Candidate Path Pattern
- Why It Matters Now
- Risk If Skipped

## Quality Gate
Must Read set should be minimal and justified.
