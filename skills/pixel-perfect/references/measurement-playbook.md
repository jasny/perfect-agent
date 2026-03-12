# Measurement Playbook

## Mode A: Live Inspectable Source
1. Set target viewport.
2. Capture full-page + section screenshots.
3. Extract geometry with `getBoundingClientRect` for major containers/components.
4. Extract computed styles with `getComputedStyle` for typography and visual styling.
5. Record spacing (margin/padding/gaps) and alignment rules.
6. Record colors/gradients/borders/radius/shadows/opacity.
7. Record icon sizes and placement.
8. Record sticky/fixed behavior and scrolling behavior.
9. Convert findings into the measurement spec before coding.

## Mode B: Screenshot-Only Source
1. Estimate source viewport from frame/aspect.
2. Identify layout containers and repeated spacing patterns.
3. Measure approximate spacing and component dimensions from pixel distances.
4. Sample colors from flat regions.
5. Estimate typography hierarchy and line heights.
6. Record uncertainty annotations in the spec.
7. Validate and refine by iterative screenshot comparison.

## Typography and Baseline Guidance
1. Prefer baseline comparisons when extractable.
2. If baseline cannot be extracted reliably, use text-block top or center drift.
3. Always record which method was used.

## Asset Parity Check
1. List exact fonts/icons used by the source if discoverable.
2. Check availability in target environment.
3. If missing, do not auto-pick fallback; ask user and record decision.
