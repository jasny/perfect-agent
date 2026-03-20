---
name: tailwind-to-cva
description: >-
  Migrate React + TypeScript + Tailwind codebases from utility-class-heavy feature code to CVA-based
  styling and normalized ui/ component wrappers. TRIGGER when: user asks to convert inline Tailwind
  class logic to class-variance-authority, normalize raw primitives into reusable ui components, or
  execute large incremental styling migrations with behavior preservation and mode-controlled visual
  drift policy. DO NOT TRIGGER for redesigns, visual refreshes, or generic styling advice.
---

# tailwind-to-cva

A skill for migrating large React + TypeScript + Tailwind codebases to CVA-driven variant contracts and normalized `ui/` components.

This skill is for structured migration, not redesign.

Migration style mode is required for every run:

- `consistent` (recommended): allows minor visual/layout differences to reduce variant count and utility-class overrides while keeping intent and behavior stable.
- `precise`: preserve style/layout exactly (current behavior), with no unapproved visual drift.

The result is not just code. The result is:

- a scoped migration plan by feature/module
- explicit component contracts for variants and wrappers
- incremental implementation batches
- hard validation gates per batch

## When to use this skill

Use this skill when the user wants to:

- replace inline or duplicated Tailwind class logic with CVA variants
- normalize raw primitives in feature code into `ui/` wrappers
- migrate a large codebase incrementally with strict consistency rules
- enforce style hygiene checks during migration

Do not use this skill when the user wants:

- a visual redesign
- token/theme redefinition work
- broad UX changes
- loose exploratory cleanup without strict constraints

## How to use this skill

Use this skill as a strict migration loop:

1. choose migration style mode with the user (`consistent` recommended, `precise` available)
2. establish baseline inventory and batch scope
3. define target component contracts for the batch
4. implement migration with mode-aligned visual constraints
5. run hard validation gates
6. sign off or fix and re-run

Repeat until inventory is exhausted.

### Mode selection requirement

The user MUST choose one style mode before implementation starts:

- `consistent` SHOULD be recommended by default.
- `precise` MUST be available when exact visual/layout preservation is required.
- If mode is not specified, ask the user to choose. Do not infer silently.

### Mode intent

- `consistent`: prioritize cleaner contracts (fewer variants, fewer utility overrides, less branching duplication). Minor style/layout deltas are acceptable if behavior and component intent remain equivalent.
- `precise`: prioritize exact preservation of rendered style/layout and interaction behavior for migrated scope.

Use the selected mode to evaluate tradeoffs across contract design, implementation, and validation.

## Core rules

1. User-selected mode governs drift tolerance:
- `precise`: no visual/layout drift without explicit approval.
- `consistent`: minor visual/layout drift allowed to improve consistency and reduce override complexity.
2. Preserve behavior unless explicitly approved otherwise.
3. Migrate incrementally by feature/module, not big-bang.
4. Feature code MUST consume normalized `ui/` components where wrappers exist.
5. Variant logic MUST move into `cva` definitions, not remain inline in JSX class strings.
6. Use `cn()` when composing CVA output with consumer overrides.
7. Variant names MUST express intent (`danger`, `ghost`, `size=large`), not color labels.
8. Dark mode rules MUST live inside variant branches, not as separate variant dimensions.
9. A batch is not done unless all hard validation gates pass.

## Normative terms

- `MUST` and `MUST NOT` are hard requirements.
- `SHOULD` is a strong default that may be overridden only with explicit justification in the report.

## Required output

This skill must produce for each migration run:

1. a short execution plan
2. selected mode and rationale
3. a baseline inventory summary
4. a batch contract and implementation notes
5. validation results for hard gates
6. remaining inventory and next batch

Use the report heading schema in `references/report-template.md`.

## References

Use these references for detailed execution guidance:

- `references/report-template.md`
- `references/inventory-playbook.md`
- `references/component-normalization-playbook.md`
- `references/migration-playbook.md`
- `references/validation-playbook.md`

## Workflow

### Phase 0, choose style mode

Before baseline work, confirm migration style mode with the user:

- recommend `consistent`
- allow explicit `precise`
- record the selected mode in the report

### Phase 1, baseline and scope

Create a baseline before editing:

- identify framework assumptions (React + TS + Tailwind)
- list candidate modules/features
- choose one bounded migration batch
- identify existing `ui/` wrappers relevant to the batch
- identify raw primitives and className hotspots

Batch scope SHOULD be small enough to review safely.

### Phase 2, inventory and hotspot mapping

Build a migration inventory for the selected batch:

- inline conditional class logic
- repeated long class literals
- components with divergent styling for same intent
- raw primitives that should map to `ui/` wrappers

Run style checks using `scripts/check-styles.mjs` and record baseline failures.

### Phase 3, target component contract

Define the intended contract before implementation:

- which components gain or update CVA variants
- variant names and allowed values
- default variants
- primitive/wrapper boundary (`ui/` vs feature code)
- exported types (`VariantProps`, prop surface)

Contract must follow Ownables CVA style guidance:

- Base UI / Radix primitives stay inside `ui/` wrappers
- feature components import from `ui/`, not directly from primitive packages
- class composition uses `cn(cva(...), className)`

Mode-specific contract guidance:

- `consistent`: merge near-duplicate style branches when semantic intent is same.
- `precise`: keep branch granularity needed to preserve exact rendered output.

### Phase 4, implement batch migration

Migrate the selected batch only.

Required implementation patterns:

- extract inline style branching to local or shared CVA definitions
- replace raw primitives with normalized wrappers when available
- create missing wrappers in `ui/` only when required by batch
- preserve one-off layout utilities when they are non-branching and non-repeated

Mode-specific implementation guidance:

- `consistent`: prefer removing redundant variant axes and override-only utility layering.
- `precise`: preserve utility composition and branch-specific spacing/sizing when they affect rendered layout/style.

Do not convert unrelated modules in the same commit.

### Phase 5, hard validation gates

Run all required checks after migration:

1. `scripts/check-styles.mjs` MUST pass for the batch/repo scope.
2. No new raw feature-level primitive usage where `ui/` wrappers exist.
3. No residual inline class branching that should be a CVA variant.
4. Type checks/tests/lint used by the repo for touched code MUST pass.
5. Drift policy MUST match selected mode:
- `precise`: no accepted visual/layout drift without explicit user approval.
- `consistent`: minor drift is acceptable when documented and tied to consistency simplification.

If any gate fails, the batch is not complete.

### Phase 6, batch signoff and next scope

Document:

- selected mode and why
- what was migrated
- contracts introduced/changed
- validation outcomes
- unresolved findings and why
- next batch recommendation

Then proceed to the next module batch and repeat.

## Definition of done

Migration work is done only when all are true:

1. Every migrated batch has a report using the required template.
2. Selected mode is recorded and enforced in decisions.
3. CVA contracts exist for migrated branching style logic.
4. Normalized `ui/` wrappers are used in migrated feature code where expected.
5. `scripts/check-styles.mjs` passes after each completed batch.
6. No unapproved behavior changes were introduced.
7. In `precise` mode, no unapproved visual/layout changes were introduced.
8. Remaining migration inventory is either empty or explicitly deferred.

## Failure modes to avoid

Do not do any of the following:

- skip mode selection or silently infer mode
- use `consistent` mode to justify broad redesign
- claim `precise` mode while accepting unrecorded visual/layout drift
- migrate by search-and-replace without contract design
- keep ternary-heavy class logic inline while claiming CVA migration
- move primitive package imports into feature code
- use color-based variant names (`red`, `blue`) instead of intent names
- hide validation failures and mark the batch as done
- broaden scope mid-batch and create unreviewable diffs

## Example invocation phrases

```
Use tailwind-to-cva in consistent mode to migrate this feature module to CVA and ui wrappers.
Use tailwind-to-cva in precise mode to normalize Tailwind-heavy JSX class logic without visual/layout drift.
Use tailwind-to-cva and let me choose between consistent and precise before migration starts.
```

## Expected behavior summary

This skill turns “clean up our Tailwind classes” into a strict migration process:

- mode selection first (`consistent` recommended)
- inventory first
- contract before edits
- bounded batch migration
- hard validation gates
- repeat until complete
