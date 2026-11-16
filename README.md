# Spec Fusion

**Matt Pocock + OpenSpec**, with eight human-controlled stages and a review checkpoint after each. Install Spec Fusion as a project-local npm CLI (recommended), via `npx skills add`, or as a Codex / Claude Code plugin.

Spec Fusion does not automatically execute any development phase.

## Quick start — install with npm (recommended, project-local)

Run inside your target project's root directory:

```sh
cd /path/to/your/repository
npm init -y                           # skip if package.json already exists
npm install --save-dev spec-fusion@latest
npx spec-fusion init
```

By default, `npx spec-fusion init` installs everything project-locally for **Codex**, **Gemini CLI**, and **Claude Code**:
- **Spec Fusion**: main guide and eight Codex stage skills in `.agents/skills/`, eight Gemini TOML commands in `.gemini/commands/spec-fusion/`, eight Claude Markdown commands in `.claude/commands/spec-fusion/`, and the main Claude guide in `.claude/skills/spec-fusion/` (symlinked to `.agents/skills/spec-fusion/` when possible).
- **Matt Pocock's skills**: installs `mattpocock/skills` (`--skill '*'`) for the selected agents.
- **OpenSpec**: initializes `openspec/` and OpenSpec skills (`@fission-ai/openspec` v2.0.0+) for the selected agents.

> **OpenSpec workflows note:** OpenSpec installs its default `core` workflow set unless you have enabled additional workflows globally. To enable `new`, `ff`, `continue`, and `update` alongside `apply`, `verify`, and `archive`, run:
> ```sh
> openspec config profile   # select all or enable New/Continue/Update/Fast-forward
> openspec update
> ```

### Installer options
- **Select specific agents**: `npx spec-fusion init --agent codex`, `--agent gemini`, or `--agent claude` (repeat `--agent` as needed).
- **Avoid symlinks**: add `--copy`.
- **Skip Matt Pocock & OpenSpec**: add `--skip-deps` to install only Spec Fusion's skills and commands.
- Existing files and directories are skipped, not overwritten.

To test from a local checkout before publishing:

```sh
npm test
npm pack
npm install --save-dev /absolute/path/to/spec-fusion-0.3.1.tgz
npx spec-fusion init
```

## Alternative — install skills only with `npx skills add`

Requires Node.js **22.20+**. Run from the **target code project's root**:

```sh
cd /path/to/your/code-project

# Install the main workflow guide and all eight stage skills
npx skills add youbolan/spec-fusion --skill '*' \
  -a codex -a gemini-cli -a claude-code

# Confirm skills were installed in this project
npx skills list
```

To install *only* the main workflow guide instead of all nine skills:

```sh
npx skills add youbolan/spec-fusion --skill spec-fusion \
  -a codex -a gemini-cli -a claude-code
```

To test from a local checkout:

```sh
cd /path/to/your/code-project
npx skills add /absolute/path/to/spec-fusion-publisher --skill '*' \
  -a codex -a gemini-cli -a claude-code
```

**Limitations of `npx skills add`:** It installs `SKILL.md` directories only—it does **not** install the custom Claude/Gemini slash-command adapters (`/spec-fusion:1-interview-and-clarify`, etc.), Matt Pocock's skills, or OpenSpec. Use `npx spec-fusion init` (or `node /path/to/spec-fusion-publisher/bin/spec-fusion.mjs init --project /path/to/your/code-project`) if you want the full setup. See [the skill installation guide](skills/spec-fusion/references/INSTALL.md).

## Install from the Codex plugin marketplace

```sh
codex plugin marketplace add youbolan/spec-fusion
codex plugin add spec-fusion@spec-fusion
```

The Codex plugin manager installs plugins as managed components, which is different from copying a skill into a project. If a physical project-local skill is needed, use npm `init` above. For project-scoped plugin enablement, see the project `.codex/config.toml` documentation.

## Claude Code plugin option

```text
/plugin marketplace add youbolan/spec-fusion
/plugin install spec-fusion@spec-fusion
```

Alternatively, use `npx spec-fusion init`, which installs `.claude/skills/spec-fusion/` in your repository and also serves Codex and Gemini CLI.

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

Run one command, review the output, then choose the next command manually. The wrapper routes to the matching installed Matt Pocock or OpenSpec workflow where the agent permits it. Commands are not literal shell aliases and cannot bypass upstream user-invocation restrictions.

**Project-local installation**: `.agents/skills/` (Codex stages and main guide), `.claude/commands/spec-fusion/` (Claude namespace), `.gemini/commands/spec-fusion/` (Gemini namespace), plus Claude main guide under `.claude/skills/spec-fusion/`. **Claude plugin** installation exposes the eight slash commands under the `spec-fusion` plugin namespace, and the Codex plugin exposes the eight stage skills. `npx skills add` installs SKILL.md directories only; use `npx spec-fusion init` to also install the Gemini TOML / Claude custom command adapters, Matt Pocock's skills, and OpenSpec.

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

See [RELEASE.md](RELEASE.md) for maintainer release steps.

## Upstream projects

- Matt Pocock: https://github.com/mattpocock/skills
- OpenSpec: https://github.com/Fission-AI/OpenSpec

Spec Fusion is an independent workflow guide, not an official distribution of either upstream project.
