---
name: spec-fusion-investigate-bug
description: "Read-only legacy codebase bug investigation: identify root cause, analyze blast radius, recommend the smallest safe fix, and produce a technical handoff plus a Jira-ready report without modifying application code. Use when the user asks to investigate a bug or invokes spec-fusion-investigate-bug."
---

# Investigate Bug

Investigate the reported bug in this existing legacy codebase.

## BUG DESCRIPTION & INPUT CHECK

Before starting the investigation, check whether the user has provided a bug description, a Jira ticket number/link, or one or more attached/referenced files.

**If the user invoked this skill without providing any bug description, Jira ticket, or file(s), STOP and ask the user to provide the `BUG DESCRIPTION`, explicitly presenting these exact three options (including the `(if Jira MCP server installed)` note on option 1):**
1. **Give the Jira ticket number or ticket link (if Jira MCP server installed).**
2. **Upload file(s)** containing the bug details, logs, or reproduction notes.
3. **Type the bug details directly in the chat.**

Do not guess or start investigating until the user supplies at least one of the above.

Once provided:
- If a Jira ticket number or link is given and a Jira MCP is installed, fetch the ticket details (summary, description, comments, and relevant metadata) before investigating. If no Jira MCP is available, inform the user and ask them to paste the details or upload them as a file.
- Review all attached or referenced files and chat details as part of the bug investigation.

### STARTING CONTEXT QUESTIONS (ASK BEFORE ANALYZING)

After receiving the `BUG DESCRIPTION` (and before starting code analysis), ask the user these three questions unless they already provided all three answers:
1. **What is the bug analysis start point (for example, the API endpoint, the job function etc)? If you don't know, type "I don't know."**
2. **Which folder starts to search? If you don't know, type "I don't know."**
3. **What are other bug analysis tips? If you have tips, provide them here. Otherwise, type "No".**

Wait for the user's reply, then start analyzing the codebase. If the user replies `"I don't know."` or `"No"`, proceed with a broader repository search.

## GOAL

Identify the root cause, analyze the impact scope, and recommend the smallest safe fix. **Do not implement the fix.**

## INVESTIGATION

1. **Understand the Existing Code**
   - Locate the relevant source code, entry points, functions, services, APIs, and database operations.
   - Trace the actual execution path and data flow.
   - Understand existing business rules and dependencies.
   - Do not assume documentation accurately reflects current behavior.

2. **Reproduce the Bug**
   - Review the bug description and all attached files before investigating.
   - Reproduce the issue when practical.
   - Examine logs, error messages, existing tests, configurations, and recent code changes when available.
   - Record reproduction steps and observed behavior.
   - If reproduction is not possible, explain why and continue with static code analysis.

3. **Root Cause Analysis**
   - Identify the underlying cause rather than only the visible symptom.
   - Trace the relevant execution path to the defective logic.
   - Provide evidence using source file paths, functions, and line numbers.
   - Distinguish confirmed findings from hypotheses.
   - Explicitly state when the root cause cannot be verified.

4. **Impact Scope / Blast Radius**
   - Identify affected modules, functions, APIs, workflows, and integrations.
   - Examine upstream callers and downstream dependencies.
   - Check shared libraries, business rules, database queries, stored procedures, and triggers.
   - Determine whether other customers, tenants, or sales channels may be affected.
   - Identify existing data that may already be incorrect.
   - Separate confirmed impact from potential impact.
   - Consider the potential side effects of the recommended fix.

5. **Suggested Fix**
   - Recommend the smallest safe fix compatible with existing legacy behavior.
   - Identify specific source files, functions, and logic requiring modification.
   - Explain why the proposed fix addresses the root cause.
   - Compare alternative solutions when relevant.
   - Avoid unnecessary refactoring or architectural redesign.
   - Do not implement the fix.

6. **Regression Tests and Verification**
   - Recommend tests to verify the bug is resolved.
   - Include normal cases, edge cases, and previously working scenarios.
   - Identify possible regressions in related modules and workflows.
   - Include database and integration verification when applicable.
   - Consider deployment risks, historical data repair, and rollback requirements.

7. **Skills and Tools**
   - Use relevant installed skills, such as `diagnosing-bugs`, PStack `how-and-why`, and PStack `blast-radius`, when available.
   - Verify skill availability rather than assuming a skill exists.
   - Use repository search, Git history, tests, and code analysis tools as needed.
   - Do not automatically invoke implementation workflows or modify source code.

## DELIVERABLE A: DETAILED TECHNICAL HANDOFF

Save the report to:
`investigations/<bug-id>/HANDOFF.md`

Include:
- Bug description and expected versus actual behavior
- Relevant code architecture and execution flow
- Reproduction steps and evidence
- Root cause analysis
- Impact scope / blast radius
- Proposed fix with specific code references
- Regression test plan
- Deployment, data repair, and rollback considerations
- Unresolved questions and confidence level
- Repository commit and exact source file paths and line numbers where available

## DELIVERABLE B: JIRA-READY REPORT

Save the report to:
`investigations/<bug-id>/BUG-ANALYSIS-AND-FIX-SUGGESTION.md`

Title:
`Bug Analysis and Fix Suggestion`

Use these exact sections:

1. **Bug Summary**
   - Briefly describe the bug.
   - Explain expected and actual behavior.

2. **Root Cause Analysis**
   - Explain the underlying technical cause.
   - Identify relevant source files, functions, and logic.
   - Include supporting evidence.
   - Clearly identify unverified hypotheses.

3. **Impact Scope**
   - Identify affected modules, APIs, workflows, integrations, and data.
   - Describe potential impact on other customers or tenants.
   - Separate confirmed impacts from possible impacts.

4. **Suggested Fix**
   - Describe the recommended solution.
   - Identify the specific code changes developers should make.
   - Explain why this is the safest approach for the legacy codebase.
   - Mention alternatives when relevant.

5. **Regression Tests / Verification**
   - List recommended test scenarios.
   - Include edge cases and related workflows.
   - Explain how to verify the fix.

6. **Risks and Considerations**
   - Identify compatibility risks, side effects, dependencies, and deployment considerations.
   - Mention historical data repair or rollback needs when applicable.

7. **Investigation Status**
   - State whether the root cause is confirmed, probable, or undetermined.
   - Summarize any verification limitations or outstanding questions.
   - Make clear that the proposed fix has not been implemented.

### JIRA REPORT REQUIREMENTS
- Make the report concise, professional, and self-contained.
- Format it so the entire content can be copied directly into a Jira ticket description or comment.
- Use clear headings and bullet points.
- Include specific source file paths and function names where useful.
- Avoid unnecessary implementation details and investigation logs.
- Do not include unsupported claims.
- Do not claim tests passed unless they were actually executed successfully.
- Do not claim the bug is fixed.

## FINAL RESPONSE

Display the **COMPLETE** Jira-ready "Bug Analysis and Fix Suggestion" report in the conversation so the user can copy and paste it directly into Jira.

Also provide:
- The saved paths for both Markdown reports.
- A brief summary of major findings.
- Any unresolved uncertainties or missing evidence.
- An optional next step (do not execute automatically):
  - If the user provided an existing Jira ticket, ask if they want to run **Add Bug Investigation deliverable to JIRA** (`spec-fusion-add-bug-deliverable-to-jira` / `/spec-fusion:add-bug-deliverable-to-jira`) to post `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` as a comment and attach both reports.
  - If the user provided a bug description in chat or uploaded file(s) without a Jira ticket, ask if they want to run **Create New Jira Ticket** (`spec-fusion-create-new-jira-ticket` / `/spec-fusion:create-new-jira-ticket`) to create a new Jira ticket with the bug description, post `BUG-ANALYSIS-AND-FIX-SUGGESTION.md` as a comment, and attach both reports.

## CONSTRAINTS

- This is a read-only investigation.
- Do not modify application source code.
- Do not change database schemas or production data.
- Do not implement the proposed fix.
- Do not automatically update Jira tickets.
- Do not create commits or pull requests.
- Ask questions only when essential information blocks meaningful investigation.
- If no bug ID is provided, use a descriptive local folder name.
- If attached files contain conflicting information, identify the conflicts and explain them.
- Never invent source references, evidence, or test results.
