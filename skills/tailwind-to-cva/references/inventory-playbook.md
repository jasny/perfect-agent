# Inventory Playbook

Build a migration inventory before editing code.

## Objectives

- quantify class logic complexity
- locate repeated style literals
- identify primitive normalization opportunities
- produce a bounded first batch

## Inventory checklist

1. Scan for inline class logic branches in JSX.
2. Scan for large `className` literals and repeated long literals.
3. Identify repeated visual patterns that should become CVA variants.
4. Identify raw primitives in feature modules that should use `ui/` wrappers.
5. Record existing wrappers in `ui/` to reuse before creating new ones.

## Suggested search patterns

- `className={`
- `className="`
- `? "` near `className`
- `<button`, `<input`, `<dialog`, `<select`, `<textarea` in feature paths
- direct imports from `@base-ui/react` or `@radix-ui/react-*` outside `ui/`

## Prioritization rules

Prioritize modules with:

1. high branch density in className logic
2. repeated long class literals
3. duplicated intent-level styles (same conceptual component, diverging classes)
4. high churn and ownership clarity (teams can validate quickly)

## Batch sizing

Default batch should be:

- one feature/module
- reviewable diff
- independently testable
- completable with validation gates in one pass

Avoid mixing unrelated modules in one batch.
