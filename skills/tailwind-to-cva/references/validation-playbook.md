# Validation Playbook

Each batch must satisfy hard gates.

## Hard gates (required)

1. `check-styles` passes.
2. Repo typecheck passes for touched code.
3. Repo lint passes for touched code.
4. Relevant tests pass for touched code.
5. No new feature-level direct primitive imports where wrappers exist.
6. No residual inline class branching in migrated hotspots.

A batch cannot be marked complete if any hard gate fails.

## Command policy

Default command for style gate:

```bash
node skills/tailwind-to-cva/scripts/check-styles.mjs
```

If the repository keeps its own script (for example `bin/check-styles.mjs`), run that canonical command as the primary gate and keep the skill script as fallback/reference.

## Evidence to record

- exact commands run
- pass/fail per command
- key failing paths/findings (if any)
- resolution status before signoff

## Drift policy

- visual and behavior drift are failures by default
- any accepted drift requires explicit user approval recorded in the report

## Signoff requirement

Signoff is allowed only when:

- all hard gates pass
- deferred items are explicitly listed
- next batch scope is identified
