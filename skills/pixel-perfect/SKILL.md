# pixel-perfect

A skill for reproducing a UI as exactly as possible from a screenshot, image, Figma preview/export, clickable demo, or live website.

The result is not just code. The result is:

- a measurement-based implementation plan
- a detailed visual specification
- the code that implements that specification
- an iterative validation loop until the rendered result matches the reference closely

This skill is for exact copying, not for inspiration, redesign, cleanup, normalization, or stylistic interpretation.

## When to use this skill

Use this skill when the user wants to:

- copy a design exactly
- reproduce a screen from a screenshot
- clone a Figma site or demo accurately
- match spacing, padding, colors, typography, and layout in detail
- port a design into another framework without changing the look

Do not use this skill when the user wants:

- a redesign
- a design critique
- a looser "something like this" implementation
- UX improvements instead of replication

## Core rules

1. The reference is ground truth.
2. Do not redesign.
3. Do not simplify.
4. Do not "improve" the design.
5. Do not replace measured values with rounded or nicer values unless explicitly asked.
6. Do not substitute theme defaults for measured colors, font sizes, spacing, radius, or shadows.
7. If the source is inspectable, measure it.
8. Always finish with screenshot-based visual validation.
9. Do not stop at "close enough" if obvious differences remain.
10. Prefer fidelity over framework convention.

## Priority order

When tradeoffs must be made, prioritize in this order:

1. overall layout structure
2. outer margins and section spacing
3. inner padding and gaps
4. typography, font size, weight, line height
5. colors, borders, radius, shadows
6. icon size and placement
7. interaction states and minor details

## Accepted inputs

- screenshot
- image export
- Figma preview
- clickable demo
- live website
- video frame capture, if only a frame is needed

## Required output

This skill must produce four things during execution:

1. a short execution plan
2. a detailed measurement-based UI specification
3. the implementation in code
4. validation results and remaining mismatches, if any

The agent must not jump straight into coding without first creating the specification.

Use the following minimum report schema to keep outputs consistent while staying concise:

1. `Execution Plan`
2. `Viewport Set + Profile Selection`
3. `Measurement Spec`
4. `Asset Parity + User Decisions`
5. `Implementation Notes`
6. `Validation Results (per viewport)`
7. `Open Mismatches or Blockers`

These are required headings. The content under each heading may be brief.

## Workflow

### Phase 1, identify source type

Determine which of these applies:

- live inspectable source
- static visual source only
- mixed source, such as screenshot plus live demo

If there is a live inspectable source, use that as the primary measurement source.
If there is only an image, use screenshot-based measurement.
If both exist, use DOM inspection for exact values and screenshots for visual confirmation.

### Phase 1.5, select responsive validation scope

Select required viewports before implementation starts.

Rules:

- if the user provides explicit viewports or devices, use exactly those
- if the user does not provide viewports, use the default viewport sets below
- write the selected viewport set in the execution plan
- validation must pass at every required viewport in the selected set

Viewport sets:

- `web-responsive` (default for responsive web sources): 390x844, 768x1024, 1280x800, 1920x1080
- `web-fixed` (default for fixed-size or single-breakpoint web sources): reference or target viewport plus 1920x1080 safety check
- `mobile-nonadaptive` (default for native screens without adaptive layout): one canonical device viewport only
- `mobile-adaptive` (default for native screens with adaptive layout): one phone viewport plus one larger-class viewport

Classification rules:

- use `web-responsive` when layout structure changes across widths, such as nav collapse, column count change, or major reflow
- use `web-fixed` when structure does not change and source appears fixed-size
- use `mobile-adaptive` when adaptive behavior is visible or explicitly required
- otherwise use `mobile-nonadaptive`

Default canonical mobile viewports:

- iOS phone: 390x844
- Android phone: 412x915
- iOS larger class: 1024x1366
- Android larger class: 1280x800

Consistency requirements:

- record source classification, selected viewport set, and selection reason in the plan
- any deviation from defaults must be explicitly justified in the report

### Phase 2, inspect and measure

#### Mode A, live inspectable source

Use browser tooling such as Playwright to inspect the rendered UI directly.

Measure and record:

- viewport size
- page width and visible content width
- safe area or browser insets if relevant
- bounding boxes of key elements
- x and y positions relative to parent and viewport
- width and height of sections and controls
- padding on all sides
- margins on all sides
- layout gaps between siblings
- computed font family
- computed font size
- computed font weight
- computed line height
- letter spacing if relevant
- text color
- background color
- gradients
- border width
- border color
- border radius
- box shadow
- opacity if used
- icon size
- alignment rules
- scroll behavior
- sticky or fixed positioning, if present

Also capture screenshots of:

- full viewport
- each major section
- each area with dense visual detail

Do not eyeball values from the screenshot first if the DOM can be inspected.
Measure first.

#### Mode B, screenshot or image only

When the design is only available as an image, infer structure and measure visually.

Determine:

- target viewport size, or estimate it
- main layout containers
- relative spacing between sections
- padding inside cards and containers
- text hierarchy
- likely font size relationships
- approximate border radius
- approximate icon sizes
- color samples from pixels
- gradient stops when visible
- alignment pattern and grid rhythm

Use repeated screenshot comparison during implementation to refine uncertain values.

### Phase 3, write the execution plan

Before writing the detailed specification, write a concise execution plan.

This plan should include:

- source type
- measurement approach
- implementation target
- validation approach
- known risks or uncertainties

Example:

```
Source: clickable demo
Measurement: Playwright DOM inspection plus screenshots
Target: React Native screen on iPhone-sized viewport
Validation: simulator screenshots matched against reference
Risk: native font rendering may differ slightly from browser rendering
```

Keep the plan short. It is an execution plan, not the full specification.

### Phase 4, write the detailed implementation specification

Create a measurement-based UI spec before coding.

The specification must be concrete enough that another engineer could implement the screen without seeing the original reference.

The specification should contain the following sections.

#### 1. Screen metadata

Include:

- target viewport or device size
- orientation
- safe area behavior
- background color
- whether the screen scrolls
- whether sections are fixed, sticky, or static

#### 2. Component hierarchy

Represent the visual structure as a tree so the spatial relationship between components is clear.

Example:

```
Screen
 ├ Header
 │  ├ BackButton
 │  ├ Title
 │  └ SettingsButton
 ├ BalanceCard
 │  ├ BalanceLabel
 │  ├ BalanceAmount
 │  └ DeltaRow
 ├ ActionRow
 │  ├ SendButton
 │  └ ReceiveButton
 ├ TokenInfoCard
 │  ├ ContractRow
 │  └ PriceRow
 └ ActivitySection
    ├ ActivityHeader
    └ ActivityList
       ├ ActivityRow
       ├ ActivityRow
       └ ActivityRow
```

#### 3. Section-by-section measurements

For every major section specify exact or estimated values.

Example:

```
BalanceCard
width: viewport minus 40
margin-top: 24
margin-horizontal: 20
padding-top: 24
padding-bottom: 24
padding-horizontal: 24
border-radius: 24
background: linear gradient #5B5CE6 → #7A3FF2
shadow: subtle, low blur, low offset
```

For each section include:

- width
- height, if fixed
- margin-top
- margin-bottom
- margin-left
- margin-right
- padding-top
- padding-bottom
- padding-left
- padding-right
- gap between children
- alignment
- border radius
- border
- background
- shadow

#### 4. Typography spec

For every visible text element define:

- content or role
- font family if known
- font size
- font weight
- line height
- letter spacing if relevant
- color
- alignment
- casing if stylistic

Example:

```
BalanceAmount
font-size: 34
font-weight: 700
line-height: 40
color: #FFFFFF
alignment: left

SectionLabel
font-size: 14
font-weight: 500
line-height: 18
color: #6B7280
```

#### 5. Color palette

List all measured or sampled colors used on the screen.

Example:

```
Primary: #5B5CE6
Accent: #7A3FF2
TextPrimary: #111827
TextSecondary: #6B7280
Background: #FFFFFF
Border: #E5E7EB
```

Do not replace these with approximate theme tokens. Record the actual values.

#### 6. Border and radius spec

Example:

```
Card radius: 24
Button radius: 12
Divider thickness: 1
Divider color: #E5E7EB
```

#### 7. Iconography spec

Specify:

- icon size
- icon stroke or fill feel
- placement
- spacing between icon and text
- directional meaning if relevant

Example:

```
Send icon: arrow up-right
Receive icon: arrow down-left
Icon size: 20
Icon spacing from label: 8
```

#### 8. Asset parity and fallback decision

For fonts and icons, document source assets and parity status before implementation.

Include:

- exact font family names and font files used by the reference, if available
- exact icon pack, icon version, and glyph names, if available
- whether each required asset is available in the target environment
- for each missing asset, at least one fallback option with expected visual impact

Fallback policy:

- do not automatically choose font or icon fallbacks
- when an exact asset is unavailable, ask the user to choose how to proceed
- present concise options, for example:
  - provide exact asset files
  - approve a specified fallback asset
  - proceed with placeholder only for temporary implementation
- record the user decision in the specification and validation report

#### 9. Interaction and state notes

Specify visible interaction behavior that affects layout or styling.

Example:

```
SendButton
height: 48
background: gradient
text color: white
radius: 12

ReceiveButton
height: 48
background: white
border: 2px accent color
text color: accent
radius: 12
```

#### 10. Platform translation notes

Example:

```
React Native notes
- CSS box-shadow approximated using RN shadow props
- gradients require LinearGradient component
- viewport width mapped to simulator width
```

These notes document translation constraints but do not allow redesign.

### Phase 5, implement from the specification

Write code using the specification as the source of truth.

Rules:

- implement one section at a time
- use explicit values
- avoid framework defaults when they change the appearance
- do not normalize arbitrary measured values into a spacing scale
- do not replace actual colors with nearby theme colors
- do not change font sizes to "more standard" values
- do not make buttons more balanced or modern
- do not remove or add detail
- do not auto-select fallback fonts or icon packs when exact assets are missing
- implement fallback assets only after explicit user approval is recorded in the specification

If the source uses odd values such as 23px or 18px, keep them.

### Phase 6, run and capture

Run the implementation in the correct target environment.

For each required viewport in the selected viewport set, capture screenshots of:

- the full screen
- each major section
- any area that visually differs from the reference

Use the exact viewport size declared in the plan for each pass.

### Phase 7, visual validation

Compare the implementation screenshots against the reference for each required viewport.

Check specifically for:

- top spacing
- horizontal page padding
- card width
- section spacing
- inner card padding
- text size differences
- text weight differences
- line-height differences
- incorrect colors
- overly rounded or insufficiently rounded corners
- shadow mismatch
- button height mismatch
- icon placement mismatch
- row density mismatch
- alignment drift

Also run objective diff checks and record numeric results.

Validation profiles:

`lenient` (allowed only when explicitly justified)
- global pixel difference across full-screen comparison: less than or equal to 3.5 percent
- per-section pixel difference for each major section (header, primary cards, main action area, list area): less than or equal to 2.5 percent
- text baseline or text block position drift for key text elements (title, primary numeric value, section headers, button labels): less than or equal to 3 px
- spacing deltas for key measured gaps and paddings: less than or equal to 2 px
- sampled key color mismatch tolerance for core colors (primary text, secondary text, primary background, accent, border): deltaE less than or equal to 4

`portable` (default for cross-renderer work)
- global pixel difference: less than or equal to 1.5 percent
- per-section pixel difference: less than or equal to 1.0 percent
- text baseline drift: less than or equal to 2 px
- spacing deltas: less than or equal to 1 px
- color deltaE: less than or equal to 2.5

`strict` (default for same-renderer work)
- global pixel difference: less than or equal to 0.8 percent
- per-section pixel difference: less than or equal to 0.5 percent
- text baseline drift: less than or equal to 1 px
- spacing deltas: less than or equal to 1 px
- color deltaE: less than or equal to 1.5

`ultra` (opt-in only, never default)
- global pixel difference: less than or equal to 0.4 percent
- per-section pixel difference: less than or equal to 0.25 percent
- text baseline drift: less than or equal to 0.5 px
- spacing deltas: less than or equal to 0.5 px
- color deltaE: less than or equal to 1.0

Profile selection rules:

- use `strict` by default when source and target use effectively the same renderer and font stack
- use `portable` by default when source and target render differently, such as browser to React Native
- use `ultra` only when the user explicitly asks for it and conditions are controlled (same renderer version, same OS, same DPR, same fonts, same capture pipeline)
- use `lenient` only when hard constraints prevent higher-fidelity matching; record the exact blocker and why higher profiles are not achievable

For every run, report the selected profile and why it was selected before reporting metrics.
For every run, report viewport-level metrics for every required viewport.

Example mismatch report:

```
Header top padding is 4px too large
Balance amount font appears smaller than reference
Primary gradient too blue and insufficiently purple
Action buttons 6px too tall
Token info card bottom padding too large
```

Example validation summary:

```
Viewport: 390x844
Profile: portable (source browser, target React Native)
Global pixel difference: 1.2% (pass, threshold 1.5%)
Header section difference: 0.8% (pass, threshold 1.0%)
Balance card section difference: 1.4% (fail, threshold 1.0%)
Primary title baseline drift: 1px (pass, threshold 2px)
Balance amount baseline drift: 3px (fail, threshold 2px)
Primary background deltaE: 1.6 (pass, threshold 2.5)
Accent color deltaE: 2.1 (pass, threshold 2.5)
```

### Phase 8, refine

Adjust the code to remove visible mismatches.

If a mismatch reveals the specification was incomplete or wrong, update the specification.

Repeat:

- implement
- run
- capture
- compare
- refine

until obvious differences are gone or a hard platform limitation blocks perfect replication.

If blocked, document the limitation and the remaining discrepancy.

## Measurement guidance

### When a live demo is available

Prefer direct measurement via browser automation.

Typical methods:

```
query selectors for elements
getBoundingClientRect for geometry
getComputedStyle for visual values
screenshot capture for comparison
pixel sampling when needed for colors
```

Measure real values whenever possible.

### When only screenshots are available

Use visual measurement carefully.

Guidance:

```
infer spacing from repeated patterns
sample colors from flat regions
estimate padding from repeated components
validate visually after each pass
```

A screenshot-only source is less precise. Compensate with more validation passes.

## Definition of done

The skill is done only when all of the following are true:

1. A concise execution plan exists.
2. A detailed measurement-based UI specification exists.
3. The UI is implemented in code.
4. The rendered output has been compared visually to the reference.
5. A validation profile is selected using the profile selection rules and is recorded in the report.
6. Objective validation metrics are recorded and all required thresholds pass for the selected profile.
7. If `lenient` is used, the blocker and reason are explicitly documented.
8. Asset parity status for fonts and icons is documented, and any fallback usage has explicit user approval recorded.
9. All required viewports in the selected viewport set pass validation.
10. No obvious mismatches remain in spacing, typography, colors, border radius, alignment, or section sizing.

"Roughly similar" is not done.
"Good enough" is not done.
"Framework-idiomatic but slightly different" is not done.

## Failure modes to avoid

Do not do any of the following:

- implement from memory after a quick glance at the design
- skip the specification
- use generic spacing like 16 everywhere because it feels right
- use default font sizes because they are close
- replace measured colors with theme colors
- auto-pick font or icon fallbacks without user approval
- make subjective UX improvements
- stop after the first pass
- declare success without screenshot comparison

## Example invocation phrases

```
Use pixel-perfect to copy this screen exactly
Use pixel-perfect to recreate this Figma preview in React Native
Use pixel-perfect to clone this clickable demo without redesigning it
Use pixel-perfect to port this web design into native while preserving the look
```

## Expected behavior summary

This skill turns a vague prompt like "copy this design" into a strict process:

- inspect the source
- measure the source
- write a plan
- write a detailed specification
- implement from the specification
- run the target
- capture screenshots
- compare against the reference
- refine until matched

This skill does not ask the agent to be creative. It asks the agent to be precise.
