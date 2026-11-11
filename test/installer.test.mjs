import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, lstatSync, readlinkSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../bin/spec-fusion.mjs', import.meta.url));
function withProject(fn) {
  const dir = mkdtempSync(path.join(tmpdir(), 'spec-fusion-test-'));
  try { fn(dir); } finally { rmSync(dir, { recursive: true, force: true }); }
}
function run(project, ...args) {
  return spawnSync(process.execPath, [cli, 'init', '--project', project, ...args], { encoding: 'utf8' });
}
test('default installs Codex and Gemini shared skill and Claude link', () => withProject(p => {
  const r = run(p);
  assert.equal(r.status, 0, r.stderr);
  const shared = path.join(p, '.agents/skills/spec-fusion/SKILL.md');
  const claude = path.join(p, '.claude/skills/spec-fusion');
  assert.ok(existsSync(shared));
  assert.ok(existsSync(path.join(claude, 'SKILL.md')));
  assert.ok(lstatSync(claude).isSymbolicLink() || lstatSync(claude).isDirectory());
  assert.ok(!existsSync(path.join(p, 'node_modules')));
}));
test('claude-only install does not create shared agents skill', () => withProject(p => {
  const r = run(p, '--agent', 'claude');
  assert.equal(r.status, 0, r.stderr);
  assert.ok(existsSync(path.join(p, '.claude/skills/spec-fusion/SKILL.md')));
  assert.ok(!existsSync(path.join(p, '.agents/skills/spec-fusion')));
}));
test('existing files never overwritten', () => withProject(p => {
  const target = path.join(p, '.agents/skills/spec-fusion');
  mkdirSync(target, { recursive: true });
  writeFileSync(path.join(target, 'SKILL.md'), 'user-edit');
  const r = run(p, '--agent', 'codex');
  assert.equal(r.status, 0, r.stderr);
  assert.equal(readFileSync(path.join(target, 'SKILL.md'), 'utf8'), 'user-edit');
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
