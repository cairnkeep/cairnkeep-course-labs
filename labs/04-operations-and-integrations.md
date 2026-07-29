# Module 04: operations and optional integrations

**Maps to:** L07, L08, L09, L10, L11, L12

## Outcome

Predict where data is written, take and restore a consistent course snapshot,
and distinguish optional integrations from the standalone memory workflow.

## 1. Storage and backup

```bash
cp .ai/course.env.example .ai/.env
mkdir -p .course-state/backups
cairn memory path
cairn memory export .course-state/backups/global-memory.tgz
```

`memory export` is a WAL-safe snapshot of named/global scope databases and
requires the `sqlite3` CLI. Project memory is separate at
`.agentfs/project.db`; back it up with SQLite's online backup operation while a
server may be writing, or stop the server before a filesystem copy.

Restore only into this disposable course store:

```bash
cairn memory import .course-state/backups/global-memory.tgz
cairn doctor
```

Import backs up databases it replaces. It is not a merge operation.

## 2. Multiple-machine reasoning

Draw two clients and label the process that runs `cairn memory-server`. In
stdio mode that process is a child on each client, so storage is local to each
machine. Shared memory requires an operator-configured authenticated HTTP
server and explicit client URL/token configuration; installation never
discovers a remote host.

For the course, simulate two machines with two disposable clones and different
`.course-state/memory` roots. Do not point either clone at a real service.

## 3. Optional document RAG

The standalone memory lab remains healthy with both variables unset:

```bash
env -u ANYTHINGLLM_BASE_URL -u ANYTHINGLLM_API_KEY cairn doctor
```

If the learner already operates a disposable local document-RAG service, place
its URL and key only in `.ai/.env`, configure a course-only workspace, sync
`README.md` and `docs/**/*.md`, then use `domain_knowledge_search` from the
harness. Verify citations against these public files. Remove the variables and
restart to prove Cairnkeep still works without RAG.

## 4. Optional context exploration

`/context-explore` requires an operator-owned token-miser binary. With
`CAIRN_EXPLORE_BINARY` unset it must fail with a configuration message without
breaking memory. If installed, point it at this clone, ask for the status
validation path, verify cited files, then remove the variable and relaunch.
Automatic prompt-time invocation remains a separate opt-in through
`CAIRN_EXPLORE_AUTOINVOKE=1`.

## 5. Containers

With rootless Podman available, inspect the launcher before running it:

```bash
cairn-container --help
cairn-container stdio --volume cairnkeep-course-memory
cairn-container workspace --repo "$PWD" --mode sandbox
```

The stdio volume persists memory across container replacement. Sandbox mode
copies this repository into a named workspace volume; it does not isolate the
host checkout if `--mode shared` is selected. List and remove only volumes with
the explicit course name after the lab.

## 6. Managed overlays

An overlay is a separate distribution that pins core, owns a normal `cairn`
wrapper, applies organization policy, writes a profile lock, and supplies
fleet/rollback gates. It must not be a fork that silently changes upstream
storage defaults. Inspect the public overlay schema and example; do not put a
private endpoint, registry credential, or organization policy in this repo.

## Acceptance criteria

- The learner predicts both global and project database locations correctly.
- Export/import is performed only against the disposable course store.
- Removing RAG or exploration configuration returns to healthy core memory.
- Container volumes, bind mounts, credentials, and cleanup ownership are named.
- An overlay is described as explicit distribution policy, not magic discovery.

