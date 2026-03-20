# perfect-agent

`perfect-agent` is a collection of narrow [AI-agent skills](https://agentskills.io/) for tasks agents often do poorly without strict guidance.

Skills are explicit and situational, not general workflow helpers. Skills are opinionated and optimized for one task done very well. Skills include detailed, concrete instructions and leave little room for interpretation. Skills are written for a technical user, not for hand-holding.

Use a skill explicitly when the task matches it. Do not treat these as default coding flow instructions.

## Install

```sh
npx skills add jasny/perfect-agent
```

## Skills

### pixel-perfect

Agents naturally drift when copying a design: spacing rounds, colors approximate, breakpoints get skipped. Use this skill when you need the output to actually match a reference (Figma, screenshot, or live page), not just resemble it. The result is a component that passes measurable visual thresholds at every viewport, not one that looks "close enough" on a single glance.

### tailwind-to-cva

Utility-heavy Tailwind code scatters styling logic across feature files, making variants implicit and hard to reuse. CVA (Class Variance Authority) centralizes that into explicit, typed variant definitions so each component has one place that owns its styles. This skill migrates a React + TypeScript + Tailwind codebase to CVA-based components with normalized `ui/` wrappers.

The result is less duplicated utility code, fewer tokens for the agent to reason about, and a more consistent UI because variants are defined once and shared rather than re-implemented per feature. Choose `consistent` mode (default) when you want better contracts with minimal visual change, or `precise` mode when you cannot tolerate any layout drift.
