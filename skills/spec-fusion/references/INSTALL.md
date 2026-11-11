# Install Spec Fusion within a project (Codex, Gemini CLI, Claude Code)

**Project-local installation is the default.** Install this skill inside each repository that should use it. Do **not** copy it into an agent's global/home-level skill directory. Check the skill into Git if teammates should use the same workflow.

Spec Fusion is a manual workflow guide plus eight stage-specific command adapters. It does **not** bundle or automatically install Matt Pocock's skills or OpenSpec. Install these prerequisites separately as appropriate for each agent and repository.

## Eight custom stage commands (v0.2.0)

To install the **namespaced stage commands**, use the project-local CLI from the publisher checkout, or the published npm CLI when available:

```sh
# From the checked-out spec-fusion publisher repository:
node ./bin/spec-fusion.mjs init --project /absolute/path/to/your-project

# Once the npm package is actually published:
# cd /path/to/your-project
# npm install --save-dev spec-fusion
# npx spec-fusion init
```

The installer writes **only inside the target project**:

- Codex: `.agents/skills/spec-fusion-1-interview-and-clarify/SKILL.md` through `.agents/skills/spec-fusion-8-archive/SKILL.md`, plus the main `spec-fusion` guide. Invoke `$spec-fusion-1-interview-and-clarify`, etc.
- Claude Code: `.claude/commands/spec-fusion/1-interview-and-clarify.md` through `8-archive.md`, plus the main skill at `.claude/skills/spec-fusion/`. Invoke `/spec-fusion:1-interview-and-clarify`, etc.
- Gemini CLI: `.gemini/commands/spec-fusion/1-interview-and-clarify.toml` through `8-archive.toml`, plus the shared skill under `.agents/skills/`. Invoke `/spec-fusion:1-interview-and-clarify`, etc., then use `/commands reload` if necessary.

The **Claude plugin** exposes `/spec-fusion:<stage>` directly when installed as a plugin; its `commands/` directory contains these same eight prompts. The **Codex plugin** exposes eight named stage skills. The generic `npx skills add OWNER/spec-fusion` installer installs the repository's skill directories but does *not* copy the Claude command or Gemini TOML adapters automatically. To get the exact namespaced commands when using GitHub-only distribution, clone the publisher repository and run the Node CLI shown above.

These aliases instruct the agent to use the installed upstream workflows, not programmatically invoke another slash command via guaranteed dispatch. If nested invocation is unsupported or upstream prohibits it, the stage must stop with the exact direct command and report the limitation. No stage auto-chains, and nothing publishes without user consent.

---

## Manual guide-only installation (macOS/Linux)

Run this **from the root of your code project**, not from the agent's installation directory:

```sh
cd /path/to/your/project
mkdir -p .agents/skills .claude/skills
unzip /path/to/skill.zip -d .agents/skills
ln -s ../../.agents/skills/spec-fusion .claude/skills/spec-fusion
```

This produces:

```text
my-project/
├── .agents/
│   └── skills/
│       └── spec-fusion/
│           ├── SKILL.md
│           ├── agents/openai.yaml
│           └── references/
│               ├── WORKFLOW.md
│               ├── HANDOFFS.md
│               └── INSTALL.md
├── .claude/
│   └── skills/
│       └── spec-fusion -> ../../.agents/skills/spec-fusion
└── openspec/             # if OpenSpec is initialized
```

- **Codex** discovers project-local `.agents/skills/spec-fusion/SKILL.md`.
- **Gemini CLI** discovers workspace-local `.agents/skills/spec-fusion/SKILL.md` (or `.gemini/skills/spec-fusion/SKILL.md`). If the workspace is not trusted, use Gemini `/trust`, then `/skills list` or `/skills reload`.
- **Claude Code** discovers project-local `.claude/skills/spec-fusion/SKILL.md`, including when the skill folder is a symlink.

If `.claude/skills/spec-fusion` already exists, review it before making the symlink; do not overwrite it. On Windows or an environment without reliable symlink support, copy the folder within the project instead:

```sh
mkdir -p .claude/skills
cp -R .agents/skills/spec-fusion .claude/skills/spec-fusion
```

This still remains completely project-local. A copy is less convenient to maintain because future updates must be applied in both places.

## Alternative: install individually per agent in the same project

| Agent | Project-relative location |
|---|---|
| Codex | `.agents/skills/spec-fusion/` |
| Gemini CLI | `.agents/skills/spec-fusion/` or `.gemini/skills/spec-fusion/` |
| Claude Code | `.claude/skills/spec-fusion/` |

Place the **folder** `spec-fusion` at the appropriate relative location so that `SKILL.md` is directly inside it. Do not install at `~/.agents/skills`, `~/.gemini/skills`, or `~/.claude/skills` unless you later *choose* a global installation.

## Invoke only when wanted

- **Codex:** Ask for `$spec-fusion` to see the manual process.
- **Claude Code:** Run `/spec-fusion`.
- **Gemini CLI:** Ask "Use the spec-fusion skill and show the manual workflow"; check `/skills list` if needed.

The skill **never auto-chains stages**. The new namespaced commands attempt to route one stage to an installed upstream workflow; invoke Matt Pocock or OpenSpec directly when nested invocation is unavailable. The workflow is in [WORKFLOW.md](WORKFLOW.md), and copy/paste handoffs are in [HANDOFFS.md](HANDOFFS.md).

## Prerequisites and published identifiers (checked November 2026)

Matt Pocock (`mattpocock/skills`):

- `grill-with-docs`
- `to-spec`
- `code-review`
- `setup-matt-pocock-skills` (project setup where required)

OpenSpec (`Fission-AI/OpenSpec`):

- Expanded workflow commands: `/opsx:new`, `/opsx:ff`, `/opsx:apply`, `/opsx:verify`, `/opsx:archive`.
- Optional planning review: `/opsx:continue`, `/opsx:update`.
- Core-profile alternative: `/opsx:propose`.

Set up OpenSpec in each project where you want to maintain canonical specs:

```sh
cd /path/to/your/project
npm install -g @fission-ai/openspec@latest
openspec init
openspec config profile
openspec update
```

Choose the **expanded** profile for independent `new`, `ff`, and `verify` steps. Select the coding agents you actually use when OpenSpec asks. Review the installed version's exact command list rather than assuming all optional commands are enabled.

Install Matt Pocock's official skills following the README for each selected agent, then run `setup-matt-pocock-skills` in that repository if needed. Note: `/to-spec` may publish to the configured issue tracker; select a local-file workflow or confirm before publishing.

### OpenSpec command mappings in Codex

OpenSpec's slash commands are not how Codex calls its generated OpenSpec skills:

| Manual stage | Claude Code / Gemini CLI | Codex |
|---|---|---|
| Create change | `/opsx:new` | `$openspec-new-change` |
| Generate plan | `/opsx:ff` | `$openspec-ff-change` |
| Incremental plan | `/opsx:continue` | `$openspec-continue-change` |
| Revise plan | `/opsx:update` | `$openspec-update-change` |
| Implement | `/opsx:apply` | `$openspec-apply-change` |
| Verify | `/opsx:verify` | `$openspec-verify-change` |
| Archive | `/opsx:archive` | `$openspec-archive-change` |
| Core profile alternative | `/opsx:propose` | `$openspec-propose` |

Matt Pocock's skill identifiers are `grill-with-docs`, `to-spec`, and `code-review`. Invocation syntax varies by agent; invoke by exact installed skill identifier rather than inventing a slash command.

### References

- Codex project-local skills: <https://developers.openai.com/blog/skills-agents-sdk>
- Gemini CLI workspace skills: <https://geminicli.com/docs/cli/using-agent-skills/>
- Claude Code project skills and symlinks: <https://code.claude.com/docs/en/skills>
- Matt Pocock skill source: <https://github.com/mattpocock/skills>
- OpenSpec project and CLI: <https://github.com/Fission-AI/OpenSpec>


## Published distribution options (optional)

After a maintainer publishes the `spec-fusion` package to npm, install and initialize
from the root of a **target project**:

```sh
npm install --save-dev spec-fusion
npx spec-fusion init
```

`npm install` places the CLI in `node_modules`; the explicit `init` command installs
the main guide, eight stage skills, and Claude/Gemini namespaced command files in the project.
The initializer never writes to the agent's home directory, and it never replaces
an existing installed skill or stage-command file automatically. Select specific agents with
`npx spec-fusion init --agent codex`, `--agent gemini`, or `--agent claude`.
The npm package name must be confirmed available before publishing.

For the **Codex plugin marketplace**, after a maintainer pushes the publisher repository
to GitHub:

```sh
codex plugin marketplace add YOUR_GITHUB_OWNER/spec-fusion
codex plugin add spec-fusion@spec-fusion
```

A Codex plugin may be managed independently of project-local skills. To constrain its
usage to a project, follow the installed Codex version's plugin enablement settings;
for a physical repository-local copy, prefer the npm initializer above. The plugin
contains Spec Fusion only; install Matt Pocock and OpenSpec separately.

The publisher repository also provides `.agents/plugins/marketplace.json`, the
portable `plugin.json`, Claude compatibility manifests, an npm CLI, and tests.
See the publisher repository README and RELEASE.md for the complete procedure.
