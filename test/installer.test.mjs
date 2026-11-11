import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, lstatSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const cli = path.join(root, 'bin', 'spec-fusion.mjs');
const stages = ['1-interview-and-clarify', '2-write-spec', '3-create-change', '4-plan', '5-implement', '6-code-review', '7-verify', '8-archive'];
function withProject(fn) {
  const dir = mkdtempSync(path.join(tmpdir(), 'spec-fusion-test-'));
  try { fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
}
function run(project, ...args) {
  return spawnSync(process.execPath, [cli, 'init', '--project', project, ...args], { encoding: 'utf8' });
}
test('default installs eight Codex skills and Claude/Gemini stage commands', () => withProject(p => {
  const r = run(p);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(existsSync(path.join(p, '.agents/skills/spec-fusion/SKILL.md')));
  assert.ok(existsSync(path.join(p, '.claude/skills/spec-fusion/SKILL.md')));
  for (const slug of stages) {
    assert.ok(existsSync(path.join(p, `.agents/skills/spec-fusion-${slug}/SKILL.md`)), slug);
    assert.ok(existsSync(path.join(p, `.claude/commands/spec-fusion/${slug}.md`)), slug);
    assert.ok(existsSync(path.join(p, `.gemini/commands/spec-fusion/${slug}.toml`)), slug);
  }
  assert.ok(!existsSync(path.join(p, 'node_modules')));
}));
test('claude-only install creates no shared skills and only Claude commands', () => withProject(p => {
  const r = run(p, '--agent', 'claude');
  assert.equal(r.status, 0, r.stderr);
  assert.ok(existsSync(path.join(p, '.claude/skills/spec-fusion/SKILL.md')));
  assert.ok(existsSync(path.join(p, '.claude/commands/spec-fusion/1-interview-and-clarify.md')));
  assert.ok(!existsSync(path.join(p, '.agents/skills/spec-fusion')));
  assert.ok(!existsSync(path.join(p, '.gemini')));
}));
test('gemini-only install creates eight TOML commands, not Claude commands', () => withProject(p => {
  const r = run(p, '--agent', 'gemini');
  assert.equal(r.status, 0, r.stderr);
  assert.ok(existsSync(path.join(p, '.gemini/commands/spec-fusion/8-archive.toml')));
  assert.ok(existsSync(path.join(p, '.agents/skills/spec-fusion/SKILL.md')));
  assert.ok(!existsSync(path.join(p, '.claude')));
}));
test('codex-only install creates eight stage skills, not Claude or Gemini commands', () => withProject(p => {
  const r = run(p, '--agent', 'codex');
  assert.equal(r.status, 0, r.stderr);
  assert.ok(existsSync(path.join(p, '.agents/skills/spec-fusion-6-code-review/SKILL.md')));
  assert.ok(!existsSync(path.join(p, '.claude')));
  assert.ok(!existsSync(path.join(p, '.gemini')));
}));
test('existing files never overwritten and missing files still installed on a rerun', () => withProject(p => {
  const target = path.join(p, '.agents/skills/spec-fusion');
  const custom = path.join(p, '.claude/commands/spec-fusion/2-write-spec.md');
  mkdirSync(target, { recursive: true });
  mkdirSync(path.dirname(custom), { recursive: true });
  writeFileSync(path.join(target, 'SKILL.md'), 'user-edit');
  writeFileSync(custom, 'custom-command');
  const r = run(p);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(readFileSync(path.join(target, 'SKILL.md'), 'utf8'), 'user-edit');
  assert.equal(readFileSync(custom, 'utf8'), 'custom-command');
  assert.ok(existsSync(path.join(p, '.agents/skills/spec-fusion-4-plan/SKILL.md')));
  assert.match(r.stdout, /skipped/);
}));
test('invalid agent rejected', () => withProject(p => {
  const r = run(p, '--agent', 'invalid');
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Unsupported agent/);
}));
test('copy mode works without symlink', () => withProject(p => {
  const r = run(p, '--copy');
  assert.equal(r.status, 0, r.stderr);
  assert.ok(lstatSync(path.join(p, '.claude/skills/spec-fusion')).isDirectory());
}));
