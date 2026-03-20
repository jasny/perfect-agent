# Migration Playbook

Migrate in bounded batches with explicit contracts.

## Mode selection

Confirm migration style mode before implementation:

- `consistent` (recommended): allow minor style/layout differences to reduce variant count and utility overrides.
- `precise`: preserve style/layout exactly for migrated scope.

## Standard transformation sequence

1. Confirm selected mode (`consistent` or `precise`).
2. Freeze batch scope.
3. Define/confirm target component contracts.
4. Convert inline class branching to CVA variants.
5. Replace raw primitives with `ui/` wrappers where available.
6. Introduce missing wrappers only if needed for batch scope.
7. Apply mode-specific drift policy.
8. Run hard validation gates.

## Transformation patterns

### Pattern A: inline ternary/class branching -> CVA

- extract static base classes
- map conditional branches to variant values
- replace inline branch expression with typed CVA invocation

### Pattern B: duplicated long literals -> shared variant contract

- identify shared intent component
- centralize classes in `ui/` wrapper CVA
- replace duplicated literals with wrapper usage

### Pattern C: raw primitive -> normalized wrapper

- swap feature-level primitive usage with existing `ui/` wrapper
- if wrapper missing and needed repeatedly, create wrapper with CVA + typed props

## Guardrails

- no unrelated refactors inside batch
- no style redesign while normalizing (`consistent` still allows only minor deltas)
- no broad token rewrites unless explicitly requested
- preserve event handling, semantics, focus behavior, and accessibility contracts

## Mode-specific guidance

- `consistent`: merge near-duplicate variant branches and remove override-only utility layering when semantics are unchanged.
- `precise`: keep branch detail needed for exact rendered style/layout parity.

## Batch completion checklist

- selected mode documented
- contract documented
- implementation complete for scoped hotspots
- validation gates all green
- report updated with remaining inventory
