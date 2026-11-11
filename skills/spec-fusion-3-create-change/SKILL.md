---
name: spec-fusion-3-create-change
description: "Manual Spec Fusion stage 3: Create a new OpenSpec change scaffold only. Use when user explicitly invokes or requests stage 3-create-change; stop after this one stage and preserve OpenSpec/Matt Pocock roles."
---

# Spec Fusion: 3-create-change

Stage: **Create a new OpenSpec change scaffold only.**
Owner: **OpenSpec**. Upstream skill/command: **new** (Claude/Gemini identifier: `/opsx:new`; Codex equivalent: `$openspec-new-change`).

Read the approved feature spec and relevant current OpenSpec capability specs. Obtain or derive a sensible change ID; invoke the installed OpenSpec new-change workflow for this ID, creating the scaffold only. Do not create all artifacts, apply code, or archive.

Execution contract:
- Execute ONLY this named stage; never automatically move to a later stage.
- Check prerequisites and ask for missing approvals or inputs instead of guessing.
- Prefer the installed upstream skill or command and use its documented instructions and tool permissions. Do not treat merely quoting a slash command as invoking it.
- When the client cannot invoke an upstream skill from another skill, inspect the installed upstream instructions and follow them if allowed and accessible; if upstream forbids delegated invocation or is unavailable, tell the user the exact direct upstream command to run and STOP. Never falsely claim upstream execution.
- Keep OpenSpec as the only canonical capability specification system and its Apply as the only implementation/task driver.
- Summarize outputs and leave the user at a manual review checkpoint. Do not perform remote publication without explicit authorization.

On completion, report: **Created OpenSpec change directory and change ID.**
