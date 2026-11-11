---
name: spec-fusion-4-plan
description: "Manual Spec Fusion stage 4: Produce and approve OpenSpec proposal, design, deltas, and tasks. Use when user explicitly invokes or requests stage 4-plan; stop after this one stage and preserve OpenSpec/Matt Pocock roles."
---

# Spec Fusion: 4-plan

Stage: **Produce and approve OpenSpec proposal, design, deltas, and tasks.**
Owner: **OpenSpec**. Upstream skill/command: **ff** (Claude/Gemini identifier: `/opsx:ff`; Codex equivalent: `$openspec-ff-change`).

Read the approved Matt Pocock draft spec, current canonical capability specs and the new change folder. Use the installed OpenSpec fast-forward planning workflow (or a user-selected continue variant) to generate proposal, design, requirement deltas, and tasks. Ensure deltas accurately preserve and modify canonical requirements, and avoid duplicating or contradicting existing specs. Do not modify application code.

Execution contract:
- Execute ONLY this named stage; never automatically move to a later stage.
- Check prerequisites and ask for missing approvals or inputs instead of guessing.
- Prefer the installed upstream skill or command and use its documented instructions and tool permissions. Do not treat merely quoting a slash command as invoking it.
- When the client cannot invoke an upstream skill from another skill, inspect the installed upstream instructions and follow them if allowed and accessible; if upstream forbids delegated invocation or is unavailable, tell the user the exact direct upstream command to run and STOP. Never falsely claim upstream execution.
- Keep OpenSpec as the only canonical capability specification system and its Apply as the only implementation/task driver.
- Summarize outputs and leave the user at a manual review checkpoint. Do not perform remote publication without explicit authorization.

On completion, report: **Files for proposal, design, spec deltas, and tasks plus conflicts awaiting approval.**
