# Release instructions — Spec Fusion

This guide covers testing, publishing `spec-fusion` to npm, and pushing updates to [youbolan/spec-fusion](https://github.com/youbolan/spec-fusion).

## 1. Pre-release checks

From `/Users/bolanyou/Projects/spec-fusion-publisher`:

```sh
npm test
npm pack --dry-run
```

Confirm all tests pass and `npm pack --dry-run` includes the expected files (`bin/`, `skills/`, `commands/`, `adapters/`, plugin manifests, `README.md`, `LICENSE`).

## 2. Bump the version

Update `"version"` in `package.json` (or use `npm version`):

```sh
npm version patch   # or minor / major
```

## 3. Log in and publish to npm

```sh
npm login
npm whoami
npm publish --dry-run
npm publish --access public
```

If an exact version number was previously used on npm, bump the version (`npm version patch`) and re-run `npm publish --access public`.

## 4. Verify the published npm package

Confirm the new version is live on the registry:

```sh
npm view spec-fusion versions --json
```

Test installing in a fresh temporary folder (using `--prefer-online` to bypass local cache right after publishing):

```sh
mkdir -p /tmp/spec-fusion-verify && cd /tmp/spec-fusion-verify
npm init -y
npm cache clean --force
npm install --save-dev spec-fusion@latest --prefer-online
npx spec-fusion init
```

Verify that `.agents/skills/`, `.claude/`, `.gemini/`, and `openspec/` are created, then clean up:

```sh
rm -rf /tmp/spec-fusion-verify
```

## 5. Push to GitHub

Keep `.agents/`, `.claude-plugin/`, and `.codex-plugin/` tracked in Git:

```sh
cd /Users/bolanyou/Projects/spec-fusion-publisher
git add -A
git commit -m "chore: release v$(node -p 'require("./package.json").version')"
git push origin master --tags
```

## Notes

- Installing the npm package only writes to `node_modules/` until the user runs `npx spec-fusion init`.
- `npx spec-fusion init` installs Spec Fusion, Matt Pocock's skills (`mattpocock/skills`), and OpenSpec (`@fission-ai/openspec` v2.0.0+) unless `--skip-deps` is passed.
- Spec Fusion does not automate the eight individual development stages.
