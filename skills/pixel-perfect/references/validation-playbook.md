# Validation Playbook

## Validation Sequence
1. Select validation profile (`lenient`, `portable`, `strict`, `ultra`) using skill rules.
2. Run validation at every required viewport.
3. Wait for stable DOM/render state, then capture full screen and major sections at each viewport.
4. Compare implementation vs reference and compute required metrics.
5. Report pass/fail per viewport and overall status.
6. Refine until all required thresholds pass.

## Canonical Tooling
Use the script `../scripts/validate-visual.sh` as the canonical metric computation path.

Dependencies:
- ImageMagick CLI:
  - `magick` (v7), or
  - `convert` + `compare` + `identify` (v6)
- `jq`
- `bash`

Run pattern:
```bash
./scripts/validate-visual.sh \
  --reference /path/to/reference.png \
  --implementation /path/to/implementation.png \
  --profile strict \
  --sections /path/to/sections.json \
  --text-checks /path/to/text_checks.json \
  --spacing-checks /path/to/spacing_checks.json \
  --color-checks /path/to/color_checks.json \
  --output /path/to/report.json
```

Minimal run (global metric only):
```bash
./scripts/validate-visual.sh \
  --reference /path/to/reference.png \
  --implementation /path/to/implementation.png \
  --profile strict
```

## Input Schemas
`sections.json`
```json
[
  {"id":"header","x":0,"y":0,"width":390,"height":88},
  {"id":"balance_card","x":20,"y":112,"width":350,"height":164}
]
```

`text_checks.json`
```json
[
  {"id":"header_title_baseline","reference":54,"implementation":55}
]
```

`spacing_checks.json`
```json
[
  {"id":"header_to_card","reference":24,"implementation":25}
]
```

`color_checks.json`
```json
[
  {"id":"text_primary","x":36,"y":140}
]
```

## Metric Computation Rules
The script computes and reports these metrics:

1. Global pixel difference
- Diff pixels: `AE(reference, implementation)` from ImageMagick compare.
- Percentage: `(diff_pixels / total_pixels) * 100`.

2. Per-section pixel difference
- Crop each section box from both images.
- Diff pixels: `AE(reference_crop, implementation_crop)`.
- Percentage: `(section_diff_pixels / section_pixels) * 100`.

3. Text drift (baseline or text-block)
- For each text check item: `abs(reference - implementation)` in pixels.

4. Spacing drift
- For each spacing check item: `abs(reference - implementation)` in pixels.

5. Color deltaE checks
- Sample pixel at `(x, y)` in both images.
- Convert RGB to Lab.
- Compute CIE76 deltaE.

## Dynamic Region Handling
If a region cannot be stabilized (for example live clocks, tickers, or remote dynamic content):

1. Document the region explicitly with coordinates and reason.
2. Exclude that region from metric computation inputs (`sections.json`, `text_checks.json`, `spacing_checks.json`, `color_checks.json`).
3. Keep the same validation profile; do not downgrade profile strictness because of dynamic regions.

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

The script output JSON is the source of truth for numeric values.
