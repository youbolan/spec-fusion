---
name: investigate-bug
description: "Alias for spec-fusion-investigate-bug: read-only legacy codebase bug investigation, root cause analysis, blast radius, smallest safe fix, and Jira-ready report. Use when the user says 'Investigate bug' or invokes investigate-bug."
---

# Investigate Bug

This skill is a convenience alias for **`spec-fusion-investigate-bug`**.

Read and follow the full instructions in [../spec-fusion-investigate-bug/SKILL.md](../spec-fusion-investigate-bug/SKILL.md) (or the installed `spec-fusion-investigate-bug` skill).

Key reminders:
- If the user invoked this skill without providing any bug description, Jira ticket, or file(s), **STOP** and ask for the `BUG DESCRIPTION`, explicitly presenting these exact three options (including `(if Jira MCP server installed)` on option 1):
  1. **Give the Jira ticket number or ticket link (if Jira MCP server installed).**
  2. **Upload file(s)** containing the bug details, logs, or reproduction notes.
  3. **Type the bug details directly in the chat.**
- After receiving the `BUG DESCRIPTION` and before starting code analysis, ask the three starting-context questions (start point, search folder, and any other bug analysis tips) defined in `spec-fusion-investigate-bug`, wait for the user's reply, and then begin the analysis.
- Follow every investigation step, deliverable (`investigations/<bug-id>/HANDOFF.md` and `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`), and read-only constraint defined in `spec-fusion-investigate-bug`.
