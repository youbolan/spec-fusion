# Install Spec Fusion within a project (Codex, Gemini CLI, Claude Code)

**Project-local installation is the default.** Install this skill inside each repository that should use it. Do **not** copy it into an agent's global/home-level skill directory. Check the skill into Git if teammates should use the same workflow.

Spec Fusion is only a manual workflow guide. It does **not** bundle or automatically install Matt Pocock's skills or OpenSpec. Install these prerequisites separately as appropriate for each agent and repository.

## Recommended: one physical copy, all three agents (macOS/Linux)

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

The skill **never auto-chains stages**. Invoke Matt Pocock and OpenSpec independently, one stage at a time. The workflow is in [WORKFLOW.md](WORKFLOW.md), and copy/paste handoffs are in [HANDOFFS.md](HANDOFFS.md).

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

`npm install` places the CLI in `node_modules`; the explicit `init` command copies the
skill to `.agents/skills/spec-fusion` and links (or copies) it into `.claude/skills/`.
The initializer never writes to the agent's home directory, and it never replaces
an existing installed skill automatically. Select specific agents with
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
