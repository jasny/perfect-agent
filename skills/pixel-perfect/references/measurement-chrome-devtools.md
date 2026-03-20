# Measurement Playbook: Chrome DevTools MCP (Live Inspectable Source)

## Preconditions
1. Source is live and inspectable.
2. Target viewport set is already selected.

## Procedure
1. Open or navigate to the source with `mcp__chrome-devtools__new_page` or `mcp__chrome-devtools__navigate_page`.
2. Set target viewport with `mcp__chrome-devtools__resize_page`.
3. Wait for stable DOM/render state before measurement and capture.
   - Ensure initial loading has completed.
   - Ensure no visible layout shifts are occurring.
4. Capture a page snapshot with `mcp__chrome-devtools__take_snapshot` to identify major containers/components.
5. Capture baseline screenshots for full viewport and major sections with `mcp__chrome-devtools__take_screenshot`.
6. Measure geometry using `mcp__chrome-devtools__evaluate_script` with `getBoundingClientRect`.
   - Record `x`, `y`, `width`, `height`.
   - Record parent-child offsets.
7. Measure styling using `mcp__chrome-devtools__evaluate_script` with `getComputedStyle`.
   - Typography: family, size, weight, line-height, letter-spacing, color.
   - Visual: background, gradient, border, radius, shadow, opacity.
8. Measure spacing rules.
   - Margins, padding, and inter-element gaps.
   - Alignment and distribution rules.
9. Measure behavior-related layout factors.
   - Scroll behavior.
   - Sticky/fixed positioning.
10. Capture section-level screenshots for dense or fragile areas.
11. Build the measurement spec from measured values before coding.

## Required Measurement Record (minimum fields)
- `element_id`
- `selector`
- `x`, `y`, `width`, `height`
- `margin` / `padding` / `gap`
- `typography`
- `colors` / `borders` / `radius` / `shadows`
- `positioning_behavior`
- `notes`

## Notes
1. Prefer measured DOM/computed values over visual estimates.
2. If a value appears inconsistent, re-measure before implementing.
3. Use the latest snapshot before element interactions to avoid stale `uid` references.

Normative rules:
1. Measurements MUST use DOM/computed values when available.
2. Inconsistent values SHOULD be re-measured before implementation.
