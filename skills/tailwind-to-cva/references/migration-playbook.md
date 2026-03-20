# Migration Playbook

Migrate in bounded batches with explicit contracts.

## Standard transformation sequence

1. Freeze batch scope.
2. Define/confirm target component contracts.
3. Convert inline class branching to CVA variants.
4. Replace raw primitives with `ui/` wrappers where available.
5. Introduce missing wrappers only if needed for batch scope.
6. Preserve visual output and behavior.
7. Run hard validation gates.

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
- no style redesign while normalizing
- no broad token rewrites unless explicitly requested
- preserve event handling, semantics, focus behavior, and accessibility contracts

## Batch completion checklist

- contract documented
- implementation complete for scoped hotspots
- validation gates all green
- report updated with remaining inventory
