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

## Acceptance Contract
- Must-match list:
- Ignore list:
- Portable-allowed drift:

## Measurement Spec
- Screen metadata:
- Component hierarchy:
- Section-by-section measurements:
- Typography spec:
- Color palette:
- Border and radius spec:
- Iconography spec:
- Asset parity + user decisions:
- Interaction and state notes:
- Platform translation notes:

## Asset Parity + User Decisions
- Decision summary (must match Measurement Spec section 8):
- Missing assets:
- Fallback options presented:
- User decision (required when assets are missing):
- Expected visual impact of chosen path:

## Implementation Notes
- Sections implemented:
- Explicit values used:
- Non-default styling decisions:
- Blockers encountered:

## Primary Validation Artifacts
- Reference artifacts used:
- Marked comparison screenshots used (if provided):
- Why these artifacts are primary:

## Validation Results (per viewport)
Repeat this block for each required viewport.

### Viewport: <width>x<height>
- Global pixel difference:
- Per-section differences:
- Text baseline/text block drift:
- Spacing deltas:
- Color deltaE checks:
- Pass/fail summary:
- Marked Issue Checklist:
  - Issue id:
  - Resolved (yes/no):
  - Status (`fixed` | `accepted_by_user` | `renderer_only_drift`):
  - Reason (required for `renderer_only_drift`):

## Validation Freshness
- Latest substantive UI edit reference:
- Latest capture set reference:
- Report generated after latest capture (yes/no):
- Post-edit full loop completed (`capture -> compare -> fix -> re-capture`) (yes/no):

## Open Mismatches or Blockers
- Remaining mismatch list:
- Root cause:
- Next refinement action:
