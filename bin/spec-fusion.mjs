#!/usr/bin/env node
import { cpSync, existsSync, lstatSync, mkdirSync, symlinkSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = fileURLToPath(new URL('../', import.meta.url));
const SKILL_SOURCE = path.join(PACKAGE_ROOT, 'skills', 'spec-fusion');
const usage = `Spec Fusion — project-local skill installer

Usage:
  spec-fusion init [--project DIR] [--agent codex|gemini|claude|all] [--copy]
  spec-fusion --help

Default: install for Codex, Gemini CLI and Claude Code in the current project.
Nothing is installed into global agent directories.
Existing skill folders are never overwritten.
`;

function die(message) { console.error(`Error: ${message}`); process.exit(1); }
function isPresent(location) {
  try { lstatSync(location); return true; } catch (e) { if (e.code === 'ENOENT') return false; throw e; }
}
function readArgs(args) {
  let directory = process.cwd();
  const agents = new Set();
  let copy = false;
  let action = 'help';
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-h' || arg === '--help' || arg === 'help') return { action: 'help' };
    if (arg === 'init') { action = 'init'; continue; }
    if (arg === '--project') { if (!args[i + 1]) die('--project needs a directory'); directory = args[++i]; continue; }
    if (arg.startsWith('--project=')) { directory = arg.slice('--project='.length); continue; }
    if (arg === '--agent') { if (!args[i + 1]) die('--agent needs a name'); agents.add(args[++i]); continue; }
    if (arg.startsWith('--agent=')) { agents.add(arg.slice('--agent='.length)); continue; }
    if (arg === '--copy') { copy = true; continue; }
    die(`Unknown option: ${arg}`);
  }
  if (agents.has('all') && agents.size > 1) die('Use --agent all alone or choose specific agents');
  if (agents.size === 0 || agents.has('all')) { agents.clear(); for (const a of ['codex','gemini','claude']) agents.add(a); }
  for (const a of agents) if (!['codex','gemini','claude'].includes(a)) die(`Unsupported agent: ${a}`);
  return { action, directory: path.resolve(directory), agents, copy };
}
function copyIfMissing(destination) {
  if (isPresent(destination)) { console.log(`Already exists, skipped: ${destination}`); return false; }
  mkdirSync(path.dirname(destination), { recursive: true });
  cpSync(SKILL_SOURCE, destination, { recursive: true, force: false, errorOnExist: true });
  console.log(`Installed: ${destination}`);
  return true;
}
function init({ directory, agents, copy }) {
  if (!existsSync(path.join(SKILL_SOURCE, 'SKILL.md'))) die('Missing bundled SKILL.md');
  if (!existsSync(directory)) die(`Project directory not found: ${directory}`);
  const sharedDest = path.join(directory, '.agents', 'skills', 'spec-fusion');
  const claudeDest = path.join(directory, '.claude', 'skills', 'spec-fusion');
  const shared = agents.has('codex') || agents.has('gemini');
  if (shared) copyIfMissing(sharedDest);
  if (agents.has('claude')) {
    if (shared && !copy) {
      if (isPresent(claudeDest)) {
        console.log(`Already exists, skipped: ${claudeDest}`);
      } else {
        mkdirSync(path.dirname(claudeDest), { recursive: true });
        const target = path.relative(path.dirname(claudeDest), sharedDest);
        try {
          symlinkSync(target, claudeDest, 'dir');
          console.log(`Linked: ${claudeDest} -> ${target}`);
        } catch (e) {
          console.warn(`Symlink unavailable (${e.code || e.message}); copying instead.`);
          copyIfMissing(claudeDest);
        }
      }
    } else {
      copyIfMissing(claudeDest);
    }
  }
  console.log('Spec Fusion installed for the chosen agents. Matt Pocock and OpenSpec remain separate prerequisites.');
}
const options = readArgs(process.argv.slice(2));
if (options.action === 'help') { process.stdout.write(usage); process.exit(0); }
if (options.action !== 'init') die('Expected init');
init(options);
