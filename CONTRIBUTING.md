# Contributing

## Scope
This repo is a training lab for offline context engineering and Delphi-to-Next.js migration planning.

## Contribution Rules
1. Preserve offline-first assumptions.
2. Keep prompt outputs deterministic with explicit formats.
3. Any new session must include checkpoint and repair prompts.
4. Update README index links when adding new files.
5. Run validation before commit.

## Validation Commands
```bash
npm run check
npm run check:strict
npm run sessions:list
npm run prompts:list
```

## New Session Checklist
- Add `SESSION-XX-*.md`
- Add/update entry in `sessions/catalog.json`
- Add README Session Packs link

## Session Catalog Policy
- Core curriculum is closed at `session-12`.
- Any session beyond `session-12` must be documented as custom specialization.
