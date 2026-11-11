# Spec Fusion

**Matt Pocock + OpenSpec**, with eight human-controlled stages and a review checkpoint after each. This repository is a publish-ready template for installing Spec Fusion as an npm CLI, a Codex plugin marketplace, a Claude Code plugin, or a project-local skill for Codex, Gemini CLI, and Claude Code.

Spec Fusion **does not bundle** Matt Pocock's skills or OpenSpec. Install them separately. It does not automatically execute any development phase.

## Install using npm (project-local)

These commands work **after a maintainer publishes the npm package** and confirms that the `spec-fusion` package name is available:

```sh
cd /path/to/your/repository
npm install --save-dev spec-fusion
npx spec-fusion init
```

The initializer installs one shared skill into `.agents/skills/spec-fusion/` for Codex and Gemini CLI, plus a project-local `.claude/skills/spec-fusion/` symlink (falling back to a copy). It does not write to `~/.agents`, `~/.codex`, `~/.gemini`, or `~/.claude`.

To choose a subset of agents, run `npx spec-fusion init --agent codex`, `--agent gemini`, or `--agent claude`; repeat `--agent` as needed. Add `--copy` to avoid symlinks. Existing skill folders are skipped, not overwritten.

Before npm publication, build/test the package locally:

```sh
npm test
npm pack
npm install --save-dev /absolute/path/to/spec-fusion-0.1.0.tgz
npx spec-fusion init
```

## Install from the Codex plugin marketplace

After pushing **this repository**, with `.agents/plugins/marketplace.json`, to GitHub:

```sh
codex plugin marketplace add YOUR_GITHUB_OWNER/spec-fusion
codex plugin add spec-fusion@spec-fusion
```

Replace `YOUR_GITHUB_OWNER` with your real GitHub username or organization, and confirm the repository name matches. Adding the marketplace and installing the plugin are separate steps. These commands are **not active yet** until the repository is published.

The Codex plugin manager installs plugins as managed components, which is different from copying a skill into a project. If a physical project-local skill is needed, use npm `init` above. For project-scoped plugin enablement, see the project `.codex/config.toml` documentation.

## Claude Code plugin option

After pushing the same repository, Claude Code can use the compatibility marketplace:

```text
/plugin marketplace add YOUR_GITHUB_OWNER/spec-fusion
/plugin install spec-fusion@spec-fusion
```

Alternatively, use npm `init`, which installs `.claude/skills/spec-fusion/` in your repository. The npm approach also serves Gemini CLI.

## Manual development sequence

1. Matt Pocock `grill-with-docs`: interview and capture decisions.
2. Matt Pocock `to-spec`: create draft feature specification.
3. OpenSpec `new`: start a change.
4. OpenSpec `ff` (or `continue`): create proposal, design, deltas, tasks.
5. OpenSpec `apply`: implement and test.
6. Matt Pocock `code-review`: review implementation and spec fidelity.
7. OpenSpec `verify`: verify acceptance against change specs.
8. OpenSpec `archive`: merge deltas into canonical capability specs.

The actual agent commands and handoff prompts are in `skills/spec-fusion/references/`.

## Repository layout

```text
.agents/plugins/marketplace.json  Codex marketplace catalog
.codex-plugin/plugin.json        Codex compatibility manifest
.claude-plugin/marketplace.json  Claude marketplace catalog
.claude-plugin/plugin.json       Claude plugin manifest
plugin.json                      Portable Agent Plugins manifest
skills/spec-fusion/              Shared canonical skill
bin/spec-fusion.mjs              npm project-local installer
package.json                     npm package metadata
test/                            Node built-in test suite
RELEASE.md                       Publishing checklist
```

## Publishing

See [RELEASE.md](RELEASE.md). Ownership of the GitHub repository and npm namespace is required. This ZIP is **not** already published to GitHub or npm, and the package name's availability has not been confirmed.

## Upstream projects

- Matt Pocock: https://github.com/mattpocock/skills
- OpenSpec: https://github.com/Fission-AI/OpenSpec

Spec Fusion is an independent workflow guide, not an official distribution of either upstream project.
