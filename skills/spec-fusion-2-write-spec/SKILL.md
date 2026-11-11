---
name: spec-fusion-2-write-spec
description: "Manual Spec Fusion stage 2: Draft and approve a feature specification. Use when user explicitly invokes or requests stage 2-write-spec; stop after this one stage and preserve OpenSpec/Matt Pocock roles."
---

# Spec Fusion: 2-write-spec

Stage: **Draft and approve a feature specification.**
Owner: **Matt Pocock**. Upstream skill/command: **to-spec** (Claude/Gemini identifier: `/to-spec`; Codex equivalent: `$to-spec (if exposed)`).

Use the approved interview notes plus existing capability specs. Follow the installed Matt Pocock to-spec workflow, producing a local draft specification with acceptance cases, constraints and unresolved questions. If the installed upstream workflow proposes publishing tickets/issues remotely, request the user's approval before sending any data outside the repository. Treat this draft as OpenSpec planning input, not a competing long-lived canonical spec.

Execution contract:
- Execute ONLY this named stage; never automatically move to a later stage.
- Check prerequisites and ask for missing approvals or inputs instead of guessing.
- Prefer the installed upstream skill or command and use its documented instructions and tool permissions. Do not treat merely quoting a slash command as invoking it.
- When the client cannot invoke an upstream skill from another skill, inspect the installed upstream instructions and follow them if allowed and accessible; if upstream forbids delegated invocation or is unavailable, tell the user the exact direct upstream command to run and STOP. Never falsely claim upstream execution.
- Keep OpenSpec as the only canonical capability specification system and its Apply as the only implementation/task driver.
- Summarize outputs and leave the user at a manual review checkpoint. Do not perform remote publication without explicit authorization.

On completion, report: **Approved draft spec path, acceptance scenarios, unresolved questions.**
