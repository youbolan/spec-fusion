# Spec Fusion — Direct stage commands

Each command executes one stage and stops. Claude Code and Gemini CLI namespaced commands require a plugin or `spec-fusion init` project-local command setup; Codex uses the `$` skill names.

| Stage | Claude/Gemini command | Codex skill | Upstream |
|---|---|---|---|
| 1 — Interview and clarify requirements against current capability specs. | `/spec-fusion:1-interview-and-clarify` | `$spec-fusion-1-interview-and-clarify` | Matt Pocock: `grill-with-docs` |
| 2 — Draft and approve a feature specification. | `/spec-fusion:2-write-spec` | `$spec-fusion-2-write-spec` | Matt Pocock: `to-spec` |
| 3 — Create a new OpenSpec change scaffold only. | `/spec-fusion:3-create-change` | `$spec-fusion-3-create-change` | OpenSpec: `new` |
| 4 — Produce and approve OpenSpec proposal, design, deltas, and tasks. | `/spec-fusion:4-plan` | `$spec-fusion-4-plan` | OpenSpec: `ff` |
| 5 — Implement approved OpenSpec tasks, then stop. | `/spec-fusion:5-implement` | `$spec-fusion-5-implement` | OpenSpec: `apply` |
| 6 — Review OpenSpec implementation without automatically fixing issues. | `/spec-fusion:6-code-review` | `$spec-fusion-6-code-review` | Matt Pocock: `code-review` |
| 7 — Verify requirements, design and task acceptance before archiving. | `/spec-fusion:7-verify` | `$spec-fusion-7-verify` | OpenSpec: `verify` |
| 8 — Archive an approved, verified OpenSpec change. | `/spec-fusion:8-archive` | `$spec-fusion-8-archive` | OpenSpec: `archive` |

## Use and limitations

The wrappers are agent instructions, not native process-to-process command dispatch. An agent may invoke installed upstream skills if its runtime supports that. If the upstream skill is marked for direct user invocation, requires unavailable permissions, or cannot be loaded, stop and ask the user to run the original upstream command. Never silently recreate proprietary internal behavior or claim equivalent execution.

User approval is required after every stage; no automatic chaining or publishing.
