# Delphi -> Next.js Pipeline Contract

## End-to-End Chain
```text
Delphi Source
     ↓
DFM Analyzer
     ↓
Context Summary
     ↓
ASCII UI Layout
     ↓
Pseudo React
     ↓
Next.js Page
```

## Stage Contracts

### Stage 1: Delphi Source
- Input:
  - `.dfm` / `.pas` files from local repo.
- Output:
  - source inventory (paths, modules, forms, dependencies).
- Gate:
  - forms and major units identified.

### Stage 2: DFM Analyzer
- Input:
  - source inventory + selected form files.
- Output:
  - structured UI semantics (controls, states, events, validation hints).
- Gate:
  - no raw-code-only dump; semantic fields are complete.

### Stage 3: Context Summary
- Input:
  - analyzer output + token budget constraints.
- Output:
  - compact summary with must-keep / defer / unknown sections.
- Gate:
  - summary fits planned token budget and preserves key intent.

### Stage 4: ASCII UI Layout
- Input:
  - context summary + semantic hierarchy.
- Output:
  - text layout of regions, blocks, controls, and interaction zones.
- Gate:
  - layout preserves hierarchy and navigation flow.

### Stage 5: Pseudo React
- Input:
  - ASCII layout + semantic interactions + mapping matrix.
- Output:
  - framework-style pseudo component tree and state/handler outline.
- Gate:
  - component responsibilities and data flow are explicit.

### Stage 6: Next.js Page
- Input:
  - pseudo React + route responsibility plan.
- Output:
  - App Router-oriented page contract (route, server/client boundary, data boundary).
- Gate:
  - route responsibilities and verification checklist are complete.

## Verification Checklist
- [ ] All six stages produced outputs.
- [ ] Each output is consumable by the next stage.
- [ ] Offline constraint is respected (no external dependency assumptions).
- [ ] Token budget strategy is explicit.
- [ ] Final output includes pass/fail checks.

## Related Files
- `README.md` (Step 01-10 curriculum)
- `SESSION-01-COMPLEX-EXCEL-LIKE-FORM.md` (guided run)
- `rubrics/capstone-rubric.md` (quality scoring)
