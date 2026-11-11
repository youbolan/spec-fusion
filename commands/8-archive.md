---
description: Spec Fusion stage 8 — Archive an approved, verified OpenSpec change.
argument-hint: [feature or change identifier]
---

# Spec Fusion: 8-archive

Stage: **Archive an approved, verified OpenSpec change.**
Owner: **OpenSpec**. Upstream skill/command: **archive** (Claude/Gemini identifier: `/opsx:archive`; Codex equivalent: `$openspec-archive-change`).

Confirm the user explicitly requested archival, that verification is satisfactory and any review blockers are resolved. Use the installed OpenSpec archive workflow and confirm the in-flight spec deltas are synchronized into canonical openspec/specs/ by the tool's documented behavior. Do not archive on missing verification or unresolved critical issues without explaining and obtaining explicit override approval.

Execution contract:
- Execute ONLY this named stage; never automatically move to a later stage.
- Check prerequisites and ask for missing approvals or inputs instead of guessing.
- Prefer the installed upstream skill or command and use its documented instructions and tool permissions. Do not treat merely quoting a slash command as invoking it.
- When the client cannot invoke an upstream skill from another skill, inspect the installed upstream instructions and follow them if allowed and accessible; if upstream forbids delegated invocation or is unavailable, tell the user the exact direct upstream command to run and STOP. Never falsely claim upstream execution.
- Keep OpenSpec as the only canonical capability specification system and its Apply as the only implementation/task driver.
- Summarize outputs and leave the user at a manual review checkpoint. Do not perform remote publication without explicit authorization.

On completion, report: **Archive location, canonical specs touched, final change status.**


User-supplied context: $ARGUMENTS
