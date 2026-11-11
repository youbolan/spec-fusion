---
description: Spec Fusion stage 1 — Interview and clarify requirements against current capability specs.
argument-hint: [feature or change identifier]
---

# Spec Fusion: 1-interview-and-clarify

Stage: **Interview and clarify requirements against current capability specs.**
Owner: **Matt Pocock**. Upstream skill/command: **grill-with-docs** (Claude/Gemini identifier: `/grill-with-docs`; Codex equivalent: `$grill-with-docs (if exposed)`).

Read relevant existing OpenSpec capability specs first where available. Use Matt Pocock grill-with-docs interview methods to ask challenging, focused questions, clarify business rules, contradictions, non-goals, and edge cases. Capture an interview record and identify any GLOSSARY.md or ADRs created. Review decisions with the user; do not silently proceed to specification drafting.

Execution contract:
- Execute ONLY this named stage; never automatically move to a later stage.
- Check prerequisites and ask for missing approvals or inputs instead of guessing.
- Prefer the installed upstream skill or command and use its documented instructions and tool permissions. Do not treat merely quoting a slash command as invoking it.
- When the client cannot invoke an upstream skill from another skill, inspect the installed upstream instructions and follow them if allowed and accessible; if upstream forbids delegated invocation or is unavailable, tell the user the exact direct upstream command to run and STOP. Never falsely claim upstream execution.
- Keep OpenSpec as the only canonical capability specification system and its Apply as the only implementation/task driver.
- Summarize outputs and leave the user at a manual review checkpoint. Do not perform remote publication without explicit authorization.

On completion, report: **Approved interview decisions, document paths, open questions.**


User-supplied context: $ARGUMENTS
