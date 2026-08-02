# Module 08: local code graph

**Maps to:** L18
**Checkpoint:** `course-08-graph`

## Outcome

Exercise every Cairnkeep-owned graph mode against synthetic code, observe the
default-off boundary, and verify graph answers against their canonical source.

## Prepare

Use a disposable clone at `course-08-graph`. Resolve the tested Cairnkeep core
instead of assuming that a machine-wide `cairn` is current:

```bash
CORE_ROOT=$(node scripts/locate-cairnkeep-core.mjs)
CAIRN="$CORE_ROOT/bin/cairn"
"$CAIRN" version
git status --short
```

The version must be 2.7.0 or newer and the working tree must be clean. Run
`"$CAIRN" graph status` while `.planning/config.json` still has
`graphify.enabled` set to false. The command must refuse before invoking
Graphify or publishing a graph.

Install only the isolated CLI with `uv tool install graphifyy` or `pipx install
graphifyy`, then verify `graphify` is on `PATH`. Cairnkeep already owns the
harness adapters, policies, capability gate, and artifact lifecycle. Do not
install any additional harness assets from the dependency.

## Exercise

Enable the disposable course compatibility setting and build the first graph:

```bash
node scripts/set-course-graph.mjs enable
"$CAIRN" graph build
"$CAIRN" graph status
"$CAIRN" graph query addItem
"$CAIRN" graph explain addItem
"$CAIRN" graph path addItem writeLedger
```

Open `src/trail-ledger.mjs` and verify the returned symbols and call
relationship directly. Copy that file to
`.course-state/trail-ledger.before-graph.mjs`, add one small exported helper,
and run:

```bash
mkdir -p .course-state
cp src/trail-ledger.mjs .course-state/trail-ledger.before-graph.mjs
# Edit src/trail-ledger.mjs and add one small exported helper.
"$CAIRN" graph build
"$CAIRN" graph diff
git diff -- src/trail-ledger.mjs
```

The second successful build snapshots the previous graph before atomically
publishing the new one. Graphify keeps incremental work under `graphify-out/`;
Cairnkeep publishes the validated view under `.planning/graphs/`. Both are
ignored course-local derived state. The diff is discovery evidence, not proof
about the behavior of the source.

## Harness delegates

Claude Code and OpenCode receive `/graphify` through the normal operating-layer
sync. Kimi and Pi adapters are explicit and delegate only to the same CLI:

```bash
"$CAIRN" sync-kimi --apply
"$CAIRN" sync-pi --apply
```

These commands do not add a memory bridge to Pi and do not change Cairnkeep
memory transport.

## Verify

- The disabled check changed no file under `.planning/graphs/`.
- `build`, `status`, `query`, `explain`, `path`, and `diff` all ran through
  `cairn graph`.
- Exact symbol results were checked against `src/trail-ledger.mjs`.
- `git status --short` shows neither `graphify-out/` nor a published graph
  artifact staged for commit.
- No provider credential or semantic document-extraction path was configured.
- You can explain why `--force` is reserved for an intentional graph shrink
  after code deletion rather than used as a generic retry.

## Recovery

Restore the copied source file, rebuild once so the local graph matches the
canonical source again, and return the course capability to its default:

```bash
cp .course-state/trail-ledger.before-graph.mjs src/trail-ledger.mjs
"$CAIRN" graph build
node scripts/set-course-graph.mjs disable
git diff --exit-code -- src/trail-ledger.mjs .planning/config.json
```

If the final diff is not empty, stop and inspect it rather than deleting files
outside the disposable clone. The ignored `graphify-out/` workspace and
`.planning/graphs/` publication can be discarded with the clone.
