---
name: spec-fusion-add-bug-deliverable-to-jira
description: "Add Bug Investigation deliverable to JIRA: post BUG-ANALYSIS-AND-FIX-SUGGESTION.md as a comment on an existing Jira ticket and attach HANDOFF.md and BUG-ANALYSIS-AND-FIX-SUGGESTION.md via Jira MCP after user confirmation. Use when the user asks to add bug investigation deliverables to Jira or invokes spec-fusion-add-bug-deliverable-to-jira."
---

# Add Bug Investigation Deliverable to JIRA

Post the bug investigation report as a comment on an existing Jira ticket and attach both investigation deliverable files.

## PREREQUISITES & INPUT CHECK

1. **Verify Jira MCP server availability**
   - Check whether a Jira MCP server (e.g., Atlassian Remote MCP) is connected and exposes Jira issue/comment tools.
   - If no Jira MCP server is available, **STOP**, inform the user, and explain that they can configure it with `npx spec-fusion init --with-jira` (or copy/paste `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` and attach both files manually in Jira).

2. **Identify the Jira ticket and investigation deliverables**
   - Confirm the target **Jira ticket number or link** (e.g., `PROJ-123`). If not provided, ask the user for it before proceeding.
   - Locate `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md` and `investigations/<bug-id>/HANDOFF.md`.
   - If the folder is not specified, check `investigations/` for a folder matching `<TICKET-KEY>` or the single available folder; if multiple folders exist or none are found, ask the user which path to use.
   - Verify that both `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` and `HANDOFF.md` exist and are non-empty before proceeding.

## CONFIRMATION GATE (REQUIRED)

Before making any write call to Jira, display a concise preview and ask for explicit user confirmation:
- **Target Jira ticket**: `<TICKET-KEY>`
- **Comment**: Full contents of `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`
- **Attachments**:
  - `investigations/<bug-id>/HANDOFF.md`
  - `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`

Wait for the user to confirm before calling any Jira write tool.

## EXECUTION

After the user confirms:

1. **Add Comment**
   - Post the full content of `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md` as a comment on `<TICKET-KEY>` using the Jira MCP comment tool.

2. **Attach Deliverable Files**
   - Check whether the connected Jira MCP server exposes an attachment upload tool.
   - If supported, upload both:
     - `investigations/<bug-id>/HANDOFF.md`
     - `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`
   - If the connected Jira MCP server does **not** expose an attachment upload tool (or attachment upload fails), do **not** claim the files were attached. Clearly report that attachment upload is not supported by the active Jira MCP server and provide the exact local paths of both files so the user can attach them manually.

## FINAL RESPONSE

Report:
- The Jira ticket key/link updated.
- Whether the comment from `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` succeeded.
- Whether `HANDOFF.md` and `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` were attached (or local paths for manual attachment if unsupported).

## CONSTRAINTS

- Never modify application source code or create commits.
- Never write to Jira without explicit user confirmation.
- Never alter the technical facts of `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` or `HANDOFF.md` when posting.
- Never claim a comment or attachment succeeded unless the Jira MCP tool returned success.
