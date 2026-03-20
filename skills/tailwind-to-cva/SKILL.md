---
name: tailwind-to-cva
description: >-
  Migrate React + TypeScript + Tailwind codebases from utility-class-heavy feature code to CVA-based
  styling and normalized ui/ component wrappers. TRIGGER when: user asks to convert inline Tailwind
  class logic to class-variance-authority, normalize raw primitives into reusable ui components, or
  execute large incremental styling migrations without visual/behavior regressions. DO NOT TRIGGER
  for redesigns, visual refreshes, or generic styling advice.
---

# tailwind-to-cva

A skill for migrating large React + TypeScript + Tailwind codebases to CVA-driven variant contracts and normalized `ui/` components.

This skill is for structured migration, not redesign.

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

1. establish baseline inventory and batch scope
2. define target component contracts for the batch
3. implement migration with no visual/behavior drift
4. run hard validation gates
5. sign off or fix and re-run

Repeat until inventory is exhausted.

## Core rules

1. Preserve behavior and visual output unless explicitly approved otherwise.
2. Migrate incrementally by feature/module, not big-bang.
3. Feature code MUST consume normalized `ui/` components where wrappers exist.
4. Variant logic MUST move into `cva` definitions, not remain inline in JSX class strings.
5. Use `cn()` when composing CVA output with consumer overrides.
6. Variant names MUST express intent (`danger`, `ghost`, `size=large`), not color labels.
7. Dark mode rules MUST live inside variant branches, not as separate variant dimensions.
8. A batch is not done unless all hard validation gates pass.

## Normative terms

- `MUST` and `MUST NOT` are hard requirements.
- `SHOULD` is a strong default that may be overridden only with explicit justification in the report.

## Required output

This skill must produce for each migration run:

1. a short execution plan
2. a baseline inventory summary
3. a batch contract and implementation notes
4. validation results for hard gates
5. remaining inventory and next batch

Use the report heading schema in `references/report-template.md`.

## References

Use these references for detailed execution guidance:

- `references/report-template.md`
- `references/inventory-playbook.md`
- `references/component-normalization-playbook.md`
- `references/migration-playbook.md`
- `references/validation-playbook.md`

## Workflow

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

### Phase 4, implement batch migration

Migrate the selected batch only.

Required implementation patterns:

- extract inline style branching to local or shared CVA definitions
- replace raw primitives with normalized wrappers when available
- create missing wrappers in `ui/` only when required by batch
- preserve one-off layout utilities when they are non-branching and non-repeated

Do not convert unrelated modules in the same commit.

### Phase 5, hard validation gates

Run all required checks after migration:

1. `scripts/check-styles.mjs` MUST pass for the batch/repo scope.
2. No new raw feature-level primitive usage where `ui/` wrappers exist.
3. No residual inline class branching that should be a CVA variant.
4. Type checks/tests/lint used by the repo for touched code MUST pass.

If any gate fails, the batch is not complete.

### Phase 6, batch signoff and next scope

Document:

- what was migrated
- contracts introduced/changed
- validation outcomes
- unresolved findings and why
- next batch recommendation

Then proceed to the next module batch and repeat.

## Definition of done

Migration work is done only when all are true:

1. Every migrated batch has a report using the required template.
2. CVA contracts exist for migrated branching style logic.
3. Normalized `ui/` wrappers are used in migrated feature code where expected.
4. `scripts/check-styles.mjs` passes after each completed batch.
5. No intentional visual/behavior changes were introduced without explicit approval.
6. Remaining migration inventory is either empty or explicitly deferred.

## Failure modes to avoid

Do not do any of the following:

- migrate by search-and-replace without contract design
- keep ternary-heavy class logic inline while claiming CVA migration
- move primitive package imports into feature code
- use color-based variant names (`red`, `blue`) instead of intent names
- hide validation failures and mark the batch as done
- broaden scope mid-batch and create unreviewable diffs

## Example invocation phrases

```
Use tailwind-to-cva to migrate this feature module to CVA and ui wrappers.
Use tailwind-to-cva to normalize Tailwind-heavy JSX class logic without changing visuals.
Use tailwind-to-cva to run an incremental migration plan across this codebase.
```

## Expected behavior summary

This skill turns “clean up our Tailwind classes” into a strict migration process:

- inventory first
- contract before edits
- bounded batch migration
- hard validation gates
- repeat until complete
