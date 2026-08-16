# Module 05: session evidence and typed memory

**Maps to:** L13, L14

## Outcome

Opt in to one local evidence lifecycle, inspect every retained layer, and then
use typed metadata and idempotent import without presenting either as truth.

## Part A: prove the default

With `.ai/course.env.example` active, start and exit a short harness session.
Then run:

```bash
cairn trajectory list --json
cairn artifact list --json
cairn evidence list --json
```

No new session, artifact, or Git work-evidence record should appear.
Credentials alone never enable these features.

## Part B: capture synthetic evidence

```bash
cp .ai/course-evidence.env.example .ai/.env
set -a
source .ai/.env
set +a
cairn sync --apply
```

Launch a supported harness. Reproduce the synthetic `unknown item` failure,
inspect `src/trail-ledger.mjs`, add no real data, and resolve the task. If the
harness supports explicit compaction, compact once after the task and then
exit normally.

```bash
cairn trajectory list --json
cairn trajectory show SESSION-ID --json
cairn notes distill --session SESSION-ID --json
printf '%s\n' 'Error: unknown item: course-missing' \
  | cairn notes search-error --project "$PWD" --json
cairn notes doctor --json
cairn artifact list --json
cairn artifact prune --dry-run --json
cairn evidence list --status complete --json
cairn evidence show EVIDENCE-ID --json
cairn evidence doctor --json
cairn evidence prune --dry-run --json
```

Confirm that the trajectory omits reasoning, built-in/custom redaction ran
before persistence, the deterministic note is distinct from reviewed memory,
and any compaction summary is an immutable local artifact rather than trusted
instructions. Note enrichment and artifact HTTP remain disabled.

Confirm that work evidence contains start/end Git state, touched path labels,
exit status and integrity digests, but no prompt, keystroke, command history or
reasoning. Explain why concurrent writers mean the interval does not prove
authorship. The workspace digest is content-derived and is not redaction.

## Part C: optional patch boundary

Use only the synthetic Trail Ledger fixture. Make one tracked edit before
launch, then add this second consent flag and relaunch through `.ai/start-*.sh`:

```bash
printf '%s\n' 'CAIRN_WORK_EVIDENCE_PATCH=1' >> .ai/.env
```

Make another tracked edit and create one untracked synthetic file. After exit,
inspect the evidence and linked artifact. The patch can include both tracked
edits because its scope is the starting commit to the ending worktree. Confirm
that the untracked body is absent and that Cairnkeep exposes no apply, restore,
or replay command. Remove the added flag before continuing.

## Part D: typed memory and controlled import

Exit the harness, replace `.ai/.env`, and restart so the server tool schema is
rebuilt with typed nodes:

```bash
cp .ai/course-typed.env.example .ai/.env
set -a
source .ai/.env
set +a
cairn doctor
```

In the relaunched harness:

1. Call `memory_write` in `project` scope with key
   `patterns/status-validation`, node type `knowledge`, tags `course`,
   `status`, and value `Validate status before opening the store.`
2. Call `memory_search` for `status` with `node_types: ["knowledge"]` and
   `tags_all: ["course"]`. Verify hard filters exclude nonmatching nodes.
3. Ask the harness to call `memory_import` with
   `fixtures/typed-memory/import-dry-run.json`. Verify it reports planned
   actions and writes nothing.
4. Repeat the same envelope with `dry_run: false`, then replay the same
   `import_id`. The replay must be idempotent.
5. Attempt an existing key with `conflict_policy: "reject"`; do not switch to
   supersession until history preservation is understood.

## Acceptance criteria

- Default-off produces no evidence.
- Capture is local, redacted, bounded, and explicitly inspectable.
- Trajectory, note, artifact, Git work evidence, and reviewed memory have
  distinct trust levels.
- Work evidence is interval context rather than authorship proof; optional
  patches require separate consent and cannot be applied by Cairnkeep.
- Typed filters apply before ranking.
- Dry run writes nothing; apply/replay is stable; reject does not overwrite.
- Cleanup removes only this clone's `.course-state/` and generated `.agentfs/`
  databases.
