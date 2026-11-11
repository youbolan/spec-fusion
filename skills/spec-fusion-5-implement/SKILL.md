---
name: spec-fusion-5-implement
description: "Manual Spec Fusion stage 5: Implement approved OpenSpec tasks, then stop. Use when user explicitly invokes or requests stage 5-implement; stop after this one stage and preserve OpenSpec/Matt Pocock roles."
---

# Spec Fusion: 5-implement

Stage: **Implement approved OpenSpec tasks, then stop.**
Owner: **OpenSpec**. Upstream skill/command: **apply** (Claude/Gemini identifier: `/opsx:apply`; Codex equivalent: `$openspec-apply-change`).

Check that the OpenSpec proposal, design, deltas, and tasks are approved. Use the installed OpenSpec apply workflow to implement the selected approved change tasks and run relevant tests. OpenSpec remains responsible for task tracking. Do not invoke Matt Pocock implement or implement-spec, and do not automatically run code review or verification.

Execution contract:
- Execute ONLY this named stage; never automatically move to a later stage.
- Check prerequisites and ask for missing approvals or inputs instead of guessing.
- Prefer the installed upstream skill or command and use its documented instructions and tool permissions. Do not treat merely quoting a slash command as invoking it.
- When the client cannot invoke an upstream skill from another skill, inspect the installed upstream instructions and follow them if allowed and accessible; if upstream forbids delegated invocation or is unavailable, tell the user the exact direct upstream command to run and STOP. Never falsely claim upstream execution.
- Keep OpenSpec as the only canonical capability specification system and its Apply as the only implementation/task driver.
- Summarize outputs and leave the user at a manual review checkpoint. Do not perform remote publication without explicit authorization.

On completion, report: **Completed/pending task status, changed files, tests run and outcomes.**
