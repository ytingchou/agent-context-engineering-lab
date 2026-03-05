# AGENTS.md

## Repo Purpose
This repository is a self-contained training lab for context engineering with Cline + Qwen3 under offline constraints.

## Non-Negotiable Constraints
- Assume no internet access.
- Use local repository evidence only.
- Treat 128k context as a budget, not unlimited memory.
- Prefer deterministic output formats for every prompt stage.

## Working Rules
- Keep lab content in Markdown.
- Preserve step-by-step progression (Step 01 -> Step 10).
- If adding a new session pack, include checkpoints and repair prompts.
- Run `npm run check` after any repository update.

## Definition of Done for Changes
- `npm run check` passes.
- README links to any new session packs.
- New prompt packs follow Prompt Packet structure.
