---
name: spec-fusion
description: Manual, stop-after-each-step software development guide combining Matt Pocock's grill-with-docs, to-spec, and code-review skills with OpenSpec's canonical capability specs, requirement deltas, implementation, verification, and archival. Use as a repository-local skill or installed Codex plugin to show the spec-fusion workflow, check current progress, identify the correct Codex, Gemini CLI, or Claude Code command for a specific stage, or prepare a handoff. Never automatically chain stages or act without explicit permission.
---

# Spec Fusion

**Project-local by default:** install manually or using the npm CLI in the repository at `.agents/skills/spec-fusion/` for Codex and Gemini CLI, and expose the same directory via `.claude/skills/spec-fusion/` for Claude Code. No agent-global installation is required for project-local skills. Optionally distribute the same skill as a Codex plugin. See [INSTALL.md](references/INSTALL.md).

Guide the user through **separate, manually invoked** Matt Pocock and OpenSpec stages. Do not act as an orchestrator. The user may inspect, stop, edit, commit, switch agents, or resume between any steps.

## Non-negotiable rules

1. **Do not auto-run any stage.** Showing `$spec-fusion` or `/spec-fusion` only displays guidance. Execute a particular stage only when the user explicitly requests that stage, and never continue to another stage without a separate request.
2. **Use exact upstream skill names.** Matt Pocock's published skill names are `grill-with-docs`, `to-spec`, and `code-review`.
3. **Preserve one source of truth.** OpenSpec's `openspec/specs/` is authoritative for durable capability behavior; in-flight changes are in `openspec/changes/<change-name>/specs/`. The Matt `/to-spec` document is an approved planning input, not a second permanent spec system.
4. **Let OpenSpec implement.** Use OpenSpec Apply, not Matt's `implement` or `implement-spec`. Matt's `code-review` examines the resulting Git diff and originating OpenSpec artifacts.
5. **Approval gates matter.** Stop for user review after interview, draft spec, planning artifacts, implementation, code review, and verification; never archive without explicit approval.
6. **Use actual installed commands.** The names in the table below are upstream identifiers. Verify installed skills and tool-specific spelling. If something is missing, explain how to install/enable it; do not silently substitute another flow.
7. **Do not publish without consent.** Matt `/to-spec` can publish to the configured issue tracker. Ensure the user understands the destination and authorizes external publication; use a local-file tracker if they want a file-only workflow.

## Stage-specific Spec Fusion commands

To run **one step and stop**, use `/spec-fusion:1-interview-and-clarify` through `/spec-fusion:8-archive` in a Claude Code plugin or project-local command installation; Gemini CLI uses the same namespaced commands after installation. In Codex, invoke `$spec-fusion-1-interview-and-clarify` through `$spec-fusion-8-archive` as separate skills. Each stage attempts to use the corresponding **installed upstream** Matt Pocock or OpenSpec workflow, without automatically chaining to the next stage. Some agents restrict skill-to-skill invocation: follow installed upstream instructions only when allowed or ask the user to invoke the original command directly; do not claim an underlying command ran merely because its name was written in a prompt. See [STAGES.md](references/STAGES.md).

## Eight manual stages

| # | Owner | Claude Code / Gemini CLI identifier | Codex OpenSpec equivalent | Stop-and-review outcome |
|---|---|---|---|---|
| 1 | Matt Pocock | `/grill-with-docs` | Invoke `grill-with-docs` skill | Interview results, `GLOSSARY.md`, ADRs reviewed |
| 2 | Matt Pocock | `/to-spec` | Invoke `to-spec` skill | Draft specification approved and its path recorded |
| 3 | OpenSpec (expanded) | `/opsx:new <change>` | `$openspec-new-change` | Change scaffold confirmed |
| 4 | OpenSpec (expanded) | `/opsx:ff <change>` | `$openspec-ff-change` | Proposal, spec deltas, design, and tasks approved |
| 5 | OpenSpec | `/opsx:apply <change>` | `$openspec-apply-change` | Code, tests, and task checkboxes reviewed |
| 6 | Matt Pocock | `/code-review` | Invoke `code-review` skill | Review findings triaged; return to step 5 for fixes |
| 7 | OpenSpec (expanded) | `/opsx:verify <change>` | `$openspec-verify-change` | Requirement, scenario, design, task acceptance reviewed |
| 8 | OpenSpec | `/opsx:archive <change>` | `$openspec-archive-change` | Approved deltas synced into canonical specs; change archived |

OpenSpec's names in the middle column are **command** names; Codex's are **generated skill** names and are not a one-to-one string substitution. Matt skill invocation syntax can vary by client; if direct slash invocation is unavailable, ask the agent to use the installed skill by its exact name.

### Workflow variants (never switch silently)

- **Prefer one artifact at a time?** Use OpenSpec `/opsx:continue` (Codex `$openspec-continue-change`) repeatedly in step 4 instead of `/opsx:ff`; inspect each artifact before requesting the next. This preserves finer manual control.
- **Planning artifacts need revisions?** Use `/opsx:update` (Codex `$openspec-update-change`) or manually edit the Markdown, then re-check coherence before Apply.
- **OpenSpec core profile only?** Use `/opsx:propose <change>` (Codex `$openspec-propose`) for stages 3-4 combined, if the user chooses this variation. For a separate Verify stage, enable the expanded profile (`openspec config profile` then `openspec update`).
- **No separate Matt tickets or implementation pass.** OpenSpec owns `tasks.md` and Apply; avoid duplicate Matt `to-tickets` / `implement-spec` workflows.

## Handoff requirements

- **Before the grill:** Read relevant existing capability specs where accessible, then interview only on unclear behavior. `grill-with-docs` may write glossary/ADR files; review them.
- **Draft to OpenSpec:** Supply the approved `/to-spec` output and existing canonical specs. Translate into new/modified/removed requirement deltas without losing existing scenarios; flag conflicts rather than silently guessing.
- **Apply to code-review:** Supply the Git base/ref, diff, OpenSpec change path, and test results. Review standards **and** spec fidelity. Do not automatically apply fixes from review.
- **Code-review to Verify:** Fix findings only when requested, rerun relevant tests, and perform OpenSpec Verify as a focused final requirement/design/task acceptance check.
- **Verify to Archive:** Require explicit approval, confirm delta synchronization with `openspec/specs/`, and preserve the change archive.

## What to do when invoked

- If asked for the workflow, show all eight stages and the exact applicable commands, including Codex mapping when relevant. **Do not execute them.**
- If asked for "step N," show prerequisites, the command, files affected, and review checkpoint; do not run it unless explicitly requested.
- If asked to resume, inspect user-provided approvals and on-disk artifacts when available, report the last confirmed stage and next *suggested* command, and stop.
- If asked to run a step, run **only that step**, summarize artifacts and blockers, and stop.

## Reference documents

- [WORKFLOW.md](references/WORKFLOW.md): flowchart and review gates.
- [HANDOFFS.md](references/HANDOFFS.md): copy/paste prompts for each manual stage and a fresh-session handoff.
- [INSTALL.md](references/INSTALL.md): verified upstream names, setup steps, and Codex / Gemini CLI / Claude Code mapping.
