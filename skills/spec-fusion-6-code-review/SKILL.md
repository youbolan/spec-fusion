---
name: spec-fusion-6-code-review
description: "Manual Spec Fusion stage 6: Review OpenSpec implementation without automatically fixing issues. Use when user explicitly invokes or requests stage 6-code-review; stop after this one stage and preserve OpenSpec/Matt Pocock roles."
---

# Spec Fusion: 6-code-review

Stage: **Review OpenSpec implementation without automatically fixing issues.**
Owner: **Matt Pocock**. Upstream skill/command: **code-review** (Claude/Gemini identifier: `/code-review`; Codex equivalent: `$code-review (if exposed)`).

Use the installed Matt Pocock code-review workflow to review the Git diff, OpenSpec change artifacts, current canonical specs and test results. Check implementation quality, concurrency, security, edge cases, test sufficiency, and spec fidelity. Present actionable findings ranked by severity. Do not automatically change code or proceed to OpenSpec Verify; the user decides whether to return to step 5.

Execution contract:
- Execute ONLY this named stage; never automatically move to a later stage.
- Check prerequisites and ask for missing approvals or inputs instead of guessing.
- Prefer the installed upstream skill or command and use its documented instructions and tool permissions. Do not treat merely quoting a slash command as invoking it.
- When the client cannot invoke an upstream skill from another skill, inspect the installed upstream instructions and follow them if allowed and accessible; if upstream forbids delegated invocation or is unavailable, tell the user the exact direct upstream command to run and STOP. Never falsely claim upstream execution.
- Keep OpenSpec as the only canonical capability specification system and its Apply as the only implementation/task driver.
- Summarize outputs and leave the user at a manual review checkpoint. Do not perform remote publication without explicit authorization.

On completion, report: **Review findings, severity, relevant paths/lines, and proposed next action.**
