# Workflow: Recover Failed Step

1. Identify the failed step and copy the exact failure signal.
2. Apply that step's `Repair Prompt` once.
3. Re-check checkpoint conditions.
4. If still failing, roll back to previous step and tighten input format.
5. Resume normal sequence only after checkpoint passes.
