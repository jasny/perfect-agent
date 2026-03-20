# Component Normalization Playbook

This playbook encodes Ownables conventions from `cva-style-guide.md`.

## Required architecture

- Feature code imports visual primitives from `src/components/ui/`.
- Base UI / Radix primitives are isolated in `ui/` wrappers.
- Visual variants are defined with `cva`.
- Wrapper components expose typed props based on `VariantProps`.

## CVA contract rules

- Base styles in first `cva()` argument.
- Branching visual intent in `variants` map.
- Defaults in `defaultVariants` when applicable.
- Intent-first naming (`danger`, `ghost`, `size=large`).
- Avoid appearance-only names (`red`, `dark-bg`, `big`).

## Class composition

- Compose with `cn(cvaOutput, className)`.
- Do not string-concatenate class fragments without `cn`.
- Preserve consumer override capability through `className`.

## Dark mode policy

- dark mode classes belong inside each variant branch.
- do not create separate dark/light variant dimensions unless product requirements demand explicit theme selection.

## Wrapper boundary policy

- `ui/` owns accessible behavior and primitive integration.
- feature modules consume `ui/` abstractions.
- direct primitive imports in feature code are migration findings.

## One-off utilities

Keep one-off layout utilities inline when all are true:

- no branching logic
- not repeated as a visual contract
- not part of reusable component intent

Otherwise move to CVA.
