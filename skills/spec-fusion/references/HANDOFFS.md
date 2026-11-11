# Copy/paste prompts for manual stage transitions

Replace bracketed placeholders. Every prompt is for a **single** manual stage; it does not authorize the next stage. The listed names are the published skill or OpenSpec command identifiers. Codex OpenSpec skill equivalents are in [INSTALL.md](INSTALL.md).

## 1. Matt Pocock: grill-with-docs

> Use the `grill-with-docs` skill on [feature]. Read existing relevant OpenSpec capability specs first, then interview me about unresolved business rules, edge cases, terminology, and scope. Capture decisions using the skill's glossary/ADR conventions. Stop when the interview and docs are ready for my approval. Do not create OpenSpec change artifacts or implement.

## 2. Matt Pocock: to-spec

> Use the `to-spec` skill to synthesize the approved interview into a specification for [feature], with scope, scenarios, non-goals, business rules, and acceptance criteria. First tell me the intended output location and any issue-tracker publication effects; do not publish externally without my permission. Stop after producing the draft for review.

## 3. OpenSpec: new

> Use OpenSpec New to create the change named [change-name], using the approved spec [path] as input. Inspect `openspec/specs/` to identify impacted capabilities first. Only scaffold the change and stop; do not author all artifacts or implement yet.

## 4. OpenSpec: ff (or continue for one file at a time)

> Use OpenSpec Fast Forward to draft the proposal, design, spec deltas, and tasks for [change-name] using approved draft [path] and canonical specs at `openspec/specs/`. Do not replace existing requirements with conflicting behavior or invent missing decisions. Show unresolved questions and stop before Apply. If I ask for one artifact at a time, use OpenSpec Continue instead.

## 5. OpenSpec: apply

> Use OpenSpec Apply for [change-name] following the approved `tasks.md`, design, and requirement deltas. Run relevant tests, report changed files and incomplete tasks, and stop. Do not trigger code review, Verify, or Archive automatically.

## 6. Matt Pocock: code-review

> Use Matt Pocock's `code-review` skill on the Git diff since [base-ref] for [change-name]. Read OpenSpec proposal, design, delta specs, and tasks, and include the test evidence. Check repo standards and fidelity to the approved spec. Report prioritized actionable findings with file/line locations; do not fix without asking.

## 7. OpenSpec: verify

> Use OpenSpec Verify for [change-name]. Treat the previous code review and tests as evidence, but check whether OpenSpec requirements, scenarios, design, and tasks are fully satisfied. Focus on acceptance gaps; do not repeat ordinary style advice. Report any blockers and stop for my approval.

## 8. OpenSpec: archive

> Use OpenSpec Archive for verified change [change-name] after my explicit approval. Confirm any delta specs have been merged into canonical capability specs and report the archive location and synchronized files.

## Resuming later or in a different agent

> I am using the `spec-fusion` manual workflow. Read approved draft [path], `openspec/changes/[change-name]/`, relevant canonical specs, and existing Git changes. The last user-approved stage was [number]. Report current state and the next *suggested* installed command for this agent, but do not run it.
