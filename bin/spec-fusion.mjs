#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { cpSync, existsSync, lstatSync, mkdirSync, symlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = fileURLToPath(new URL('../', import.meta.url));
const SKILLS_ROOT = path.join(PACKAGE_ROOT, 'skills');
const MAIN_SKILL = path.join(SKILLS_ROOT, 'spec-fusion');
const STAGES = [
  '1-interview-and-clarify', '2-write-spec', '3-create-change', '4-plan',
  '5-implement', '6-code-review', '7-verify', '8-archive',
];
const SKILLS_AGENT_MAP = {
  codex: 'codex',
  gemini: 'gemini-cli',
  claude: 'claude-code',
};
const usage = `Spec Fusion — project-local workflow and stage-command installer

Usage:
  spec-fusion init [--project DIR] [--agent codex|gemini|claude|all] [--copy] [--skip-deps]
  spec-fusion --help

Default: install Spec Fusion for Codex, Gemini CLI, and Claude Code in the current project,
plus Matt Pocock's skills (mattpocock/skills) and OpenSpec (@fission-ai/openspec).
Use --skip-deps to install only Spec Fusion without running external installers.
No files are installed to agent-global directories by Spec Fusion. Existing paths are skipped.
`;
function die(message) { console.error(`Error: ${message}`); process.exit(1); }
function isPresent(location) {
  try { lstatSync(location); return true; }
  catch (e) { if (e.code === 'ENOENT') return false; throw e; }
}
function readArgs(args) {
  let directory = process.cwd();
  const agents = new Set();
  let copy = false, skipDeps = false, action = 'help';
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-h' || arg === '--help' || arg === 'help') return { action: 'help' };
    if (arg === 'init') { action = 'init'; continue; }
    if (arg === '--project') { if (!args[i + 1]) die('--project needs a directory'); directory = args[++i]; continue; }
    if (arg.startsWith('--project=')) { directory = arg.slice('--project='.length); continue; }
    if (arg === '--agent') { if (!args[i + 1]) die('--agent needs a name'); agents.add(args[++i]); continue; }
    if (arg.startsWith('--agent=')) { agents.add(arg.slice('--agent='.length)); continue; }
    if (arg === '--copy') { copy = true; continue; }
    if (arg === '--skip-deps') { skipDeps = true; continue; }
    die(`Unknown option: ${arg}`);
  }
  if (agents.has('all') && agents.size > 1) die('Use --agent all alone or choose specific agents');
  if (agents.size === 0 || agents.has('all')) { agents.clear(); for (const a of ['codex', 'gemini', 'claude']) agents.add(a); }
  for (const a of agents) if (!['codex', 'gemini', 'claude'].includes(a)) die(`Unsupported agent: ${a}`);
  return { action, directory: path.resolve(directory), agents, copy, skipDeps };
}
function copyIfMissing(source, destination) {
  if (isPresent(destination)) { console.log(`Already exists, skipped: ${destination}`); return false; }
  if (!existsSync(source)) die(`Missing package resource: ${source}`);
  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(source, destination, { recursive: true, force: false, errorOnExist: true });
  console.log(`Installed: ${destination}`);
  return true;
}
function runExternal(command, args, cwd, label) {
  console.log(`\n${label}...`);
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.error) {
    die(`${label} failed (${result.error.message}). Re-run with --skip-deps to install Spec Fusion only.`);
  }
  if (result.status !== 0) {
    die(`${label} exited with code ${result.status}. Re-run with --skip-deps to install Spec Fusion only.`);
  }
}
function hasCommand(command) {
  const result = spawnSync(command, ['--version'], {
    stdio: 'ignore',
    shell: process.platform === 'win32',
  });
  return !result.error && result.status === 0;
}
function installMattSkills(directory, agents) {
  const args = ['--yes', 'skills@latest', 'add', 'mattpocock/skills', '--skill', '*'];
  for (const agent of agents) {
    args.push('-a', SKILLS_AGENT_MAP[agent]);
  }
  args.push('-y');
  runExternal('npx', args, directory, 'Installing Matt Pocock skills (mattpocock/skills)');
}
function installOpenSpec(directory, agents) {
  const tools = [...agents].join(',');
  const initArgs = ['init', '--tools', tools, '--force', '--no-animation'];
  if (hasCommand('openspec')) {
    runExternal('openspec', initArgs, directory, 'Initializing OpenSpec');
  } else {
    runExternal('npx', ['--yes', '@fission-ai/openspec@latest', ...initArgs], directory, 'Initializing OpenSpec');
  }
}
function init({ directory, agents, copy, skipDeps }) {
  if (!existsSync(path.join(MAIN_SKILL, 'SKILL.md'))) die('Missing bundled Spec Fusion SKILL.md');
  if (!existsSync(directory)) die(`Project directory not found: ${directory}`);
  const sharedDest = path.join(directory, '.agents', 'skills', 'spec-fusion');
  const claudeDest = path.join(directory, '.claude', 'skills', 'spec-fusion');
  const shared = agents.has('codex') || agents.has('gemini');
  if (shared) {
    copyIfMissing(MAIN_SKILL, sharedDest);
    for (const slug of STAGES) {
      const name = `spec-fusion-${slug}`;
      copyIfMissing(path.join(SKILLS_ROOT, name), path.join(directory, '.agents', 'skills', name));
    }
  }
  if (agents.has('claude')) {
    if (shared && !copy) {
      if (isPresent(claudeDest)) console.log(`Already exists, skipped: ${claudeDest}`);
      else {
        mkdirSync(path.dirname(claudeDest), { recursive: true });
        const target = path.relative(path.dirname(claudeDest), sharedDest);
        try { symlinkSync(target, claudeDest, 'dir'); console.log(`Linked: ${claudeDest} -> ${target}`); }
        catch (e) { console.warn(`Symlink unavailable (${e.code || e.message}); copying instead.`); copyIfMissing(MAIN_SKILL, claudeDest); }
      }
    } else copyIfMissing(MAIN_SKILL, claudeDest);
    for (const slug of STAGES) {
      copyIfMissing(path.join(PACKAGE_ROOT, 'commands', `${slug}.md`),
        path.join(directory, '.claude', 'commands', 'spec-fusion', `${slug}.md`));
    }
  }
  if (agents.has('gemini')) {
    for (const slug of STAGES) {
      copyIfMissing(path.join(PACKAGE_ROOT, 'adapters', 'gemini', 'commands', 'spec-fusion', `${slug}.toml`),
        path.join(directory, '.gemini', 'commands', 'spec-fusion', `${slug}.toml`));
    }
  }
  if (skipDeps) {
    console.log('Installed Spec Fusion guide and manual stage commands (skipped Matt Pocock skills and OpenSpec due to --skip-deps).');
    return;
  }
  installMattSkills(directory, agents);
  installOpenSpec(directory, agents);
  console.log('\nInstalled Spec Fusion, Matt Pocock skills, and OpenSpec.');
}
const options = readArgs(process.argv.slice(2));
if (options.action === 'help') { process.stdout.write(usage); process.exit(0); }
if (options.action !== 'init') die('Expected init');
init(options);
