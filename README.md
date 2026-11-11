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

The initializer installs the main guide and eight Codex stage skills into `.agents/skills/`, eight Gemini TOML commands under `.gemini/commands/spec-fusion/`, eight Claude Markdown commands under `.claude/commands/spec-fusion/`, and the main Claude guide under `.claude/skills/spec-fusion/` (linked to the shared guide when possible). It does not write to `~/.agents`, `~/.codex`, `~/.gemini`, or `~/.claude`.

To choose a subset of agents, run `npx spec-fusion init --agent codex`, `--agent gemini`, or `--agent claude`; repeat `--agent` as needed. Add `--copy` to avoid symlinks. Existing skill files and directories are skipped, not overwritten.

Before npm publication, build/test the package locally:

```sh
npm test
npm pack
npm install --save-dev /absolute/path/to/spec-fusion-0.2.0.tgz
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

## Stage-specific commands — manual, one at a time

The project-local `npx spec-fusion init` installer now installs **eight independently invocable commands** alongside the original guide:

| Step | Claude Code / Gemini CLI | Codex |
|---|---|---|
| 1 | `/spec-fusion:1-interview-and-clarify` | `$spec-fusion-1-interview-and-clarify` |
| 2 | `/spec-fusion:2-write-spec` | `$spec-fusion-2-write-spec` |
| 3 | `/spec-fusion:3-create-change` | `$spec-fusion-3-create-change` |
| 4 | `/spec-fusion:4-plan` | `$spec-fusion-4-plan` |
| 5 | `/spec-fusion:5-implement` | `$spec-fusion-5-implement` |
| 6 | `/spec-fusion:6-code-review` | `$spec-fusion-6-code-review` |
| 7 | `/spec-fusion:7-verify` | `$spec-fusion-7-verify` |
| 8 | `/spec-fusion:8-archive` | `$spec-fusion-8-archive` |

Run one command, review the output, then choose the next command manually. The wrapper routes to the matching installed Matt Pocock or OpenSpec workflow where the agent permits it. Commands are not literal shell aliases and cannot bypass upstream user-invocation restrictions. The installer does not download the upstream dependencies automatically.

**Project-local installation**: `.agents/skills/` (Codex stages and main guide), `.claude/commands/spec-fusion/` (Claude namespace), `.gemini/commands/spec-fusion/` (Gemini namespace), plus Claude main guide under `.claude/skills/spec-fusion/`. **Claude plugin** installation exposes the eight slash commands under the `spec-fusion` plugin namespace, and the Codex plugin exposes the eight stage skills. `npx skills add` installs SKILL.md directories but does **not** install Gemini TOML or Claude custom command adapters; use `npx spec-fusion init` after publishing the npm installer or install the adapters manually from this repository.

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
skills/spec-fusion-[1-8]-*/      Eight standalone Codex stage skills
commands/                       Claude plugin commands
adapters/gemini/commands/        Gemini project command templates
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
