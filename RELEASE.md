# Release and publishing checklist

This distribution is prepared locally, **not published**. Do not claim the example install commands are live until completed.

## Before publishing

1. Choose the GitHub owner (`YOUR_GITHUB_OWNER`) and create a repository named `spec-fusion` under it. If naming differs, update install commands in README and skill references.
2. Check whether the npm package name `spec-fusion` is available (`npm view spec-fusion`). If unavailable, change `package.json.name` to a scope you control, e.g. `@YOUR_NPM_SCOPE/spec-fusion`, and update npm commands in README and skill references.
3. Decide a license and publisher metadata. MIT is supplied as a proposed license; modify before publishing if needed.
4. Ensure Matt Pocock and OpenSpec commands remain current. The package only references upstream projects; it does not vendor their code.
5. Run `npm test`, `npm pack --dry-run`, and optional `claude plugin validate . --strict` if Claude is installed; use Codex plugin commands to test from a local checkout if available.
6. Push the source repository. Keep `.agents/plugins/marketplace.json` and plugin manifests in Git (hidden directories matter).
7. Test marketplace installation: `codex plugin marketplace add YOUR_GITHUB_OWNER/spec-fusion`; then `codex plugin add spec-fusion@spec-fusion`.
8. Publish npm only after checking package name and login: `npm login`, `npm publish --access public` (requires account permissions).
9. Test `npm install --save-dev spec-fusion` and `npx spec-fusion init` in a separate project, and verify Codex, Gemini CLI, and Claude Code discovery.

## What this project does NOT do

- It does not publish to GitHub or npm, create credentials, or register a public directory listing.
- It does not install or repackage Matt Pocock's skills or OpenSpec.
- Installing the npm package does not mutate the project outside `node_modules` until the user runs `npx spec-fusion init`.
- It does not automate the eight individual development stages.
