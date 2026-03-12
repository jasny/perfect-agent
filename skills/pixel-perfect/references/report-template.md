# Report Template

Use these exact headings in this exact order.

## Execution Plan
- Source type:
- Measurement approach:
- Implementation target:
- Validation approach:
- Known risks:

## Viewport Set + Profile Selection
- Source classification: `web-responsive` | `web-fixed` | `mobile-nonadaptive` | `mobile-adaptive`
- Selected viewport set:
- Validation profile: `lenient` | `portable` | `strict` | `ultra`
- Selection reason:
- Deviations from defaults:

## Measurement Spec
- Screen metadata:
- Component hierarchy:
- Section measurements:
- Typography:
- Colors:
- Borders/radius/shadows:
- Iconography:
- Interaction/state notes:
- Platform translation notes:

## Asset Parity + User Decisions
- Fonts found:
- Icons found:
- Missing assets:
- Fallback options presented:
- User decision (required when assets are missing):
- Expected visual impact of chosen path:

## Implementation Notes
- Sections implemented:
- Explicit values used:
- Non-default styling decisions:
- Blockers encountered:

## Validation Results (per viewport)
Repeat this block for each required viewport.

### Viewport: <width>x<height>
- Global pixel difference:
- Per-section differences:
- Text baseline/text block drift:
- Spacing deltas:
- Color deltaE checks:
- Pass/fail summary:

## Open Mismatches or Blockers
- Remaining mismatch list:
- Root cause:
- Next refinement action:
