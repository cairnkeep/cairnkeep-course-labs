# Cairnkeep course spine

This repository is the shared hands-on narrative for the public Cairnkeep
learning path. The canonical explanations remain in Cairnkeep's `docs/learning`;
this repository supplies one reproducible project and stable Git checkpoints.

## How to use checkpoints

```bash
git status --short
git switch --detach course-00-app
```

Use a disposable clone when switching checkpoints. Never force-checkout over
work you want to keep. The final `main` branch contains every lab.

| Checkpoint | Lessons | Learner-visible change |
|---|---|---|
| `course-00-app` | L00-L02 | Working synthetic app before Cairnkeep |
| `course-01-bootstrap` | L03 | Neutral scaffold and isolated course environment |
| `course-02-memory` | L04-L05 | Reviewed memory and derived-knowledge exercises |
| `course-03-quality` | L06 | Deliberately vulnerable review target |
| `course-04-operation` | L07-L12 | Storage, multi-machine, optional integrations, containers, overlays |
| `course-05-evidence` | L13-L14 | Local evidence lifecycle and typed-memory exercise |
| `course-06-governance` | L15 | Capability precedence and restart exercise |
| `course-07-evaluation` | L16-L17 | Offline evaluation and product-boundary exercise |

## Adoption order

1. **Core memory:** bootstrap, diagnose, remember, recall, review, supersede.
2. **Derived project knowledge:** wiki, alignment, graph, review, security.
3. **Operations:** locate, export, import, route, isolate, and uninstall safely.
4. **Optional accelerators:** document RAG and context exploration.
5. **Optional evidence:** trajectories, hindsight notes, compaction, artifacts.
6. **Optional governance:** typed nodes and capability state.
7. **Optional measurement:** deterministic evaluation and one-capability ablation.

Each step is useful without the next. No optional feature is silently enabled.

## Feature atlas

| Surface | Default | Primary interface | Course storage or dependency | Module |
|---|---|---|---|---|
| Local memory | On after MCP registration | `/remember`, `/recall`, memory MCP tools | `.course-state/memory` | 02 |
| Review, supersession, history | On | `/memory-review`, MCP lifecycle tools | memory SQLite databases | 02 |
| Wiki and alignment | On when invoked | `/wiki-ingest`, `/wiki-query`, `/wiki-lint` | tracked `.planning/` files | 02 |
| Repository and security review | On when invoked | `/repo-review`, `/security-audit` | tracked reports only when accepted | 03 |
| Storage backup and restore | On | `cairn memory path|export|import` | course archive in `.course-state/` | 04 |
| Remote memory | Explicit only | authenticated HTTP MCP config | operator-owned server | 04 |
| Document RAG | Optional | `domain_knowledge_*` tools | operator-owned AnythingLLM | 04 |
| Context exploration | Optional | `/context-explore` | operator-owned token-miser binary | 04 |
| Containers | Optional | `cairn-container`, `cairn-sandbox` | named Podman volumes | 04 |
| Managed overlays | Optional | overlay wrapper and profile lock | distribution-defined | 04 |
| Trajectories | Off | `CAIRN_TRAJECTORY_CAPTURE`, `cairn trajectory` | local project evidence DB | 05 |
| Hindsight notes | Off | `CAIRN_NOTE_DISTILLATION`, `cairn notes` | local note hierarchy | 05 |
| Compaction and artifacts | Off | capture/store flags, `cairn artifact` | local artifact DB | 05 |
| Typed nodes/import | Off | `CAIRN_TYPED_MEMORY_NODES`, MCP tools | memory metadata and journal | 05 |
| Capability contract | Off | `CAIRN_CAPABILITY_CONTRACT`, `cairn capabilities` | project config and optional callback DB | 06 |
| Evaluation | Off | `CAIRN_EVAL`, `cairn eval` | contained experiment output | 07 |
| Meta-agent proposal loop | Not shipped | design contract only | none | 07 |

## Modules

- [02 - Memory and project knowledge](labs/02-memory-and-knowledge.md) maps L03-L05.
- [03 - Repository quality](labs/03-review-and-security.md) maps L06.
- [04 - Operations and integrations](labs/04-operations-and-integrations.md) maps L07-L12.
- [05 - Session evidence and typed memory](labs/05-session-evidence.md) maps L13-L14.
- [06 - Capability governance](labs/06-capability-governance.md) maps L15.
- [07 - Evaluation and boundaries](labs/07-evaluation-and-boundaries.md) maps L16-L17.

## Universal verification

Run these at the start of every module:

```bash
node --version
npm test
cairn version
cairn doctor
cairn memory path
```

The memory path must resolve inside this clone's `.course-state/` before a lab
writes course memory. If it does not, stop and repair `.ai/.env`.

## Cleanup

Exit every harness and memory-server child, then run:

```bash
scripts/reset-course-state.sh --yes
```

This command refuses to operate unless the target is this repository's
`.course-state/`. It does not touch the user's normal Cairnkeep store.

