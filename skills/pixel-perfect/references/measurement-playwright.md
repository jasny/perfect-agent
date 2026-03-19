# Measurement Playbook: Playwright (Live Inspectable Source)

## Preconditions
1. Source is live and inspectable.
2. Target viewport set is already selected.

## Procedure
1. Set target viewport.
2. Wait for stable DOM/render state before measurement and capture.
   - Ensure initial loading has completed.
   - Ensure no visible layout shifts are occurring.
3. Capture baseline screenshots for full viewport and major sections.
4. Identify major containers/components in DOM.
5. Measure geometry using `getBoundingClientRect`.
   - Record `x`, `y`, `width`, `height`.
   - Record parent-child offsets.
6. Measure styling using `getComputedStyle`.
   - Typography: family, size, weight, line-height, letter-spacing, color.
   - Visual: background, gradient, border, radius, shadow, opacity.
7. Measure spacing rules.
   - Margins, padding, and inter-element gaps.
   - Alignment and distribution rules.
8. Measure behavior-related layout factors.
   - Scroll behavior.
   - Sticky/fixed positioning.
9. Capture section-level screenshots for dense or fragile areas.
10. Build the measurement spec from measured values before coding.

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

Normative rules:
1. Measurements MUST use DOM/computed values when available.
2. Inconsistent values SHOULD be re-measured before implementation.
