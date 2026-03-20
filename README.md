# perfect-agent

`perfect-agent` is a collection of narrow [AI-agent skills](https://agentskills.io/) for tasks agents often do poorly without strict guidance.

Skills are explicit and situational, not general workflow helpers. Skills are opinionated and optimized for one task done very well. Skills include detailed, concrete instructions and leave little room for interpretation. Skills are written for a technical user, not for hand-holding.

Use a skill explicitly when the task matches it. Do not treat these as default coding flow instructions.

## Skills

### pixel-perfect

Reproduces a UI as exactly as possible from a reference (Figma, live source, or image). Enforces a strict process: source selection, measurement, spec-first implementation, multi-viewport capture, objective visual validation, and refinement until thresholds pass.

### tailwind-to-cva

Migrates React + TypeScript + Tailwind projects from utility-class-heavy feature code to CVA-based styling and normalized `ui/` component wrappers. Enforces an incremental module-by-module migration loop with hard validation gates.
