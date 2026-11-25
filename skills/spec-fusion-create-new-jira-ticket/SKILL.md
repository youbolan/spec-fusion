---
name: spec-fusion-create-new-jira-ticket
description: "Create New Jira Ticket using the bug description (from chat or uploaded file), then add BUG-ANALYSIS-AND-FIX-SUGGESTION.md as a comment and attach HANDOFF.md and BUG-ANALYSIS-AND-FIX-SUGGESTION.md via Jira MCP after user confirmation. Use when the user asks to create a new Jira ticket from a bug investigation or invokes spec-fusion-create-new-jira-ticket."
---

# Create New Jira Ticket

Create a new Jira ticket using the original bug description (from chat or uploaded file), then post `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` as a comment and attach both investigation deliverables.

## PREREQUISITES & INPUT CHECK

1. **Verify Jira MCP server availability**
   - Check whether a Jira MCP server (e.g., Atlassian Remote MCP) is connected and exposes Jira issue creation and comment tools.
   - If no Jira MCP server is available, **STOP**, inform the user, and explain that they can configure it with `npx spec-fusion init --with-jira` (or create the ticket manually in Jira using the saved reports).

2. **Gather required inputs**
   - **Bug description detail** (for the new ticket's description): use the bug description provided in the chat or uploaded/referenced file(s). If none is in context, check `investigations/<bug-id>/HANDOFF.md` or ask the user to provide/reference it.
   - **Investigation deliverables**: locate `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md` and `investigations/<bug-id>/HANDOFF.md`. If multiple investigation folders exist or none are found, ask the user which folder to use.
   - **Required Jira ticket fields**: ask the user to confirm (never guess):
     - **Project key** (e.g., `PROJ`)
     - **Issue type** (default: `Bug`)
     - **Summary / Title** (propose a concise title based on the bug description for the user to approve or edit)
     - Optional: priority, labels, assignee, or components if the user wants to set them.

## CONFIRMATION GATE (REQUIRED)

Before making any write call to Jira, display a concise preview and ask for explicit user confirmation:
- **Project**: `<PROJECT-KEY>`
- **Issue Type**: `<Bug>`
- **Summary**: `<proposed summary>`
- **Ticket Description**: Bug description detail (from chat or uploaded file)
- **Follow-up Comment**: Full contents of `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`
- **Attachments**:
  - `investigations/<bug-id>/HANDOFF.md`
  - `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`

Wait for the user to confirm before calling any Jira write tool.

## EXECUTION

After the user confirms:

1. **Create the Jira Ticket**
   - Create the new Jira ticket using the Jira MCP issue-creation tool with the confirmed project, issue type, summary, and the **bug description detail** (from chat or uploaded file) as the ticket description.
   - Record the newly created ticket key and URL.

2. **Add Investigation Comment**
   - Post the full content of `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md` as a comment on the newly created ticket.

3. **Attach Deliverable Files**
   - Check whether the connected Jira MCP server exposes an attachment upload tool.
   - If supported, upload both:
     - `investigations/<bug-id>/HANDOFF.md`
     - `investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`
   - If the connected Jira MCP server does **not** expose an attachment upload tool (or attachment upload fails), do **not** claim the files were attached. Clearly report that attachment upload is not supported by the active Jira MCP server and provide the exact local paths of both files so the user can attach them manually.

## FINAL RESPONSE

Report:
- The newly created Jira ticket key and link.
- Whether the comment from `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` succeeded.
- Whether `HANDOFF.md` and `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` were attached (or local paths for manual attachment if unsupported).

## CONSTRAINTS

- Never modify application source code or create commits.
- Never guess the Jira project key or create a ticket without explicit user confirmation.
- Never alter the technical facts of `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` or `HANDOFF.md`.
- Never claim a ticket, comment, or attachment succeeded unless the Jira MCP tool returned success.
