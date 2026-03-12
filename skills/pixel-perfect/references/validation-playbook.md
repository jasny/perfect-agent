# Validation Playbook

## Validation Sequence
1. Select validation profile (`lenient`, `portable`, `strict`, `ultra`) using skill rules.
2. Run validation at every required viewport.
3. Capture full screen and major sections at each viewport.
4. Compare implementation vs reference and compute required metrics.
5. Report pass/fail per viewport and overall status.
6. Refine until all required thresholds pass.

## Required Metrics
- Global pixel difference
- Per-section pixel difference
- Key text baseline or text-block drift
- Key spacing deltas
- Key color deltaE checks

## Profile Thresholds

### lenient
- Global: `<= 3.5%`
- Per-section: `<= 2.5%`
- Text drift: `<= 3px`
- Spacing drift: `<= 2px`
- Color deltaE: `<= 4`

### portable
- Global: `<= 1.5%`
- Per-section: `<= 1.0%`
- Text drift: `<= 2px`
- Spacing drift: `<= 1px`
- Color deltaE: `<= 2.5`

### strict
- Global: `<= 0.8%`
- Per-section: `<= 0.5%`
- Text drift: `<= 1px`
- Spacing drift: `<= 1px`
- Color deltaE: `<= 1.5`

### ultra
- Global: `<= 0.4%`
- Per-section: `<= 0.25%`
- Text drift: `<= 0.5px`
- Spacing drift: `<= 0.5px`
- Color deltaE: `<= 1.0`

## Reporting Rule
For each required viewport, report:
1. Measured values
2. Thresholds used
3. Pass/fail result
4. Top mismatches and next action
