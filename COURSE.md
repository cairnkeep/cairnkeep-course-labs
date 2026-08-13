# Cairnkeep course spine

This repository is the shared hands-on narrative for the public Cairnkeep
learning path. The canonical explanations remain in Cairnkeep's `docs/learning`;
this repository supplies one reproducible project and stable Git checkpoints.

**Baseline:** Cairnkeep 2.12.0

**Lesson coverage:** L00, L01, L02, L03, L04, L05, L06, L07, L08, L09,
L10, L11, L12, L13, L14, L15, L16, L17, L18, L19, L20, L21, L22, L23.

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
| `course-01-bootstrap` | L03 | Guided setup, Codex project configuration, and isolated course environment |
| `course-02-memory` | L04-L05 | Reviewed memory and derived-knowledge exercises |
| `course-03-quality` | L06 | Deliberately vulnerable review target |
| `course-04-operation` | L07-L12 | Storage, multi-machine, optional integrations, containers, overlays |
| `course-05-evidence` | L13-L14 | Local evidence lifecycle and typed-memory exercise |
| `course-06-governance` | L15 | Capability precedence and restart exercise |
| `course-07-evaluation` | L16-L17 | Offline evaluation and product-boundary exercise |
| `course-08-graph` | L18 | Optional local structural graph and harness delegates |
| `course-09-skill` | L19 | Reviewed, evaluated, reversible skill improvement |
| `course-10-trust-context` | L20-L21 | Least-authority MCP profiles and immutable context packs |
| `course-11-windows` | L22 | Native PowerShell setup, ACL inspection, and reversible uninstall |
| `course-12-guided-setup` | L23 | Registry-driven Codex and Pi selection, explicit Pi sync, and bridge recovery |

## Adoption order

1. **Core memory:** guided setup, diagnose, remember, recall, review, supersede.
2. **Derived project knowledge:** wiki, alignment, graph, review, security.
3. **Operations:** locate, export, import, route, isolate, and uninstall safely.
4. **Optional accelerators:** document RAG and context exploration.
5. **Optional evidence:** trajectories, hindsight notes, compaction, artifacts.
6. **Optional governance:** typed nodes and capability state.
7. **Optional measurement:** deterministic evaluation and one-capability ablation.
8. **Optional trust boundaries:** least-authority MCP profiles and immutable,
   explicitly approved external context.
9. **Platform and harness operation:** native Windows lifecycle, Codex's
   project-scoped MCP entry, and Pi's maintained local stdio memory bridge.

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
| Local code graph | Off | `cairn graph`, `/graphify` delegates | ignored `.planning/graphs/` artifacts and isolated `graphify` CLI | 08 |
| MCP tool profiles | Full | `cairn mcp-tools` | mode-`0600` project configuration | 10 |
| Immutable context packs | Off | `cairn pack`, read-only pack MCP tools | `.course-state/context-packs` | 10 |
| Native Windows | Supported on x64 | PowerShell-native `cairn setup`, sync, doctor, audit timer, and uninstall | Windows ACLs and user-local stores | 11 |
| Declarative harness selection | Explicit | `cairn setup --harness LIST` | private `.ai/cairnkeep.json` reconciliation record | 12 |
| Codex local memory | Explicit project selection and trust | generated `.codex/config.toml` and launcher | local stdio child; no user-wide configuration or machine sync | 12 |
| Pi local stdio memory | Explicit machine sync | `cairn sync-pi`, generated Pi launcher | isolated Pi agent root plus project-local child process | 12 |

## Modules

- [02 - Memory and project knowledge](labs/02-memory-and-knowledge.md) maps L03-L05.
- [03 - Repository quality](labs/03-review-and-security.md) maps L06.
- [04 - Operations and integrations](labs/04-operations-and-integrations.md) maps L07-L12.
- [05 - Session evidence and typed memory](labs/05-session-evidence.md) maps L13-L14.
- [06 - Capability governance](labs/06-capability-governance.md) maps L15.
- [07 - Evaluation and boundaries](labs/07-evaluation-and-boundaries.md) maps L16-L17.
- [08 - Local code graph](labs/08-local-code-graph.md) maps L18.
- [09 - Validated skill improvement](labs/09-validated-skill-improvement.md) maps L19.
- [10 - Trust profiles and immutable context](labs/10-trust-profiles-and-context-packs.md) maps L20-L21.
- [11 - Native Windows lifecycle](labs/11-native-windows.md) maps L22.
- [12 - Guided setup with Codex and Pi](labs/12-guided-setup-and-pi.md) maps L23.

## Universal verification

Run these at the start of every module:

```bash
node --version
npm test
cairn version
cairn doctor
cairn memory path
```

The named/global memory path must resolve inside this clone's `.course-state/`
before a lab writes course memory. Project scope remains in
`.agentfs/project.db`; the cleanup command handles both fixed course locations.
If the global path differs, stop and repair `.ai/.env`.

## Cleanup

Exit every harness and memory-server child, then run:

```bash
scripts/reset-course-state.sh --yes
```

This command refuses to operate unless its targets are this repository's
`.course-state/` and generated database files immediately under `.agentfs/`.
It does not touch the user's normal Cairnkeep store.
