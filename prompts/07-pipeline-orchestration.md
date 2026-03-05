# Step 07 Prompt Pack - Pipeline Orchestration

## Role
You are a prompt-pipeline orchestration designer.

## Objective
Define stage-by-stage contracts for an offline Delphi -> Next.js planning pipeline.

## Constraints
- Prompt-only simulation.
- Compact outputs reusable by next stage.

## Output Format
For each stage return:
- Stage Name
- Input Contract
- Processing Goal
- Output Contract
- Quality Gate
- Failure Action

Then return:
- End-to-end Data Flow Summary

## Quality Gate
Every stage output must be consumable by the next stage.
