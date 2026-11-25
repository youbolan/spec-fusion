---
name: create-new-jira-ticket
description: "Alias for spec-fusion-create-new-jira-ticket: create a new Jira ticket with the bug description, add BUG-ANALYSIS-AND-FIX-SUGGESTION.md as a comment, and attach HANDOFF.md and BUG-ANALYSIS-AND-FIX-SUGGESTION.md after confirmation. Use when the user says 'Create New Jira Ticket' or invokes create-new-jira-ticket."
---

# Create New Jira Ticket

This skill is a convenience alias for **`spec-fusion-create-new-jira-ticket`**.

Read and follow the full instructions in [../spec-fusion-create-new-jira-ticket/SKILL.md](../spec-fusion-create-new-jira-ticket/SKILL.md) (or the installed `spec-fusion-create-new-jira-ticket` skill).

Key reminders:
- Verify a Jira MCP server is available before proceeding.
- Always confirm the Jira project key, issue type, summary, description, comment, and attachments with the user before writing to Jira.
- Never claim attachments were uploaded unless the Jira MCP server supports attachment uploads and returns success.
