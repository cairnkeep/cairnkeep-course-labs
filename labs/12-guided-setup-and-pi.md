# 12 - Guided setup with Codex and Pi

**Checkpoint:** `course-12-guided-setup`  
**Public lesson:** L23  
**Requirements:** Cairnkeep 2.13.1, Pi 0.84.1 or newer, Node.js 22 or newer

## Outcome

Configure an empty project from Cairnkeep's declarative harness registry,
inspect Codex's project-scoped MCP entry, keep machine-level Pi changes
explicit, verify Cairnkeep's maintained local stdio memory bridge, and
distinguish project recovery from machine-asset recovery.

## Configure an isolated project

Use a disposable clone or detached checkpoint, then create an empty lab and an
isolated Pi agent root:

```bash
git switch --detach course-12-guided-setup
lab=$(mktemp -d)
pi_root="$lab/pi-agent"
project="$lab/project"
mkdir -p "$project"

cairn setup "$project" --git init --harness codex,pi --memory local --yes
cairn sync-pi --apply --live-root "$pi_root"
cairn sync-pi --check --live-root "$pi_root"
(cd "$project" && cairn doctor)
```

Setup owns the project reconciliation record, selected launchers, and generated
`.codex/config.toml`. Review its `cairn-memory` table before accepting Codex
project trust. Setup never edits user-wide Codex configuration, grants trust,
or installs Pi machine assets implicitly. Codex needs no machine-level sync;
`sync-pi` owns only Cairnkeep's memory extension, trajectory extension, and
`/graphify` prompt under the selected Pi agent root.

## Exercise the bridge

Launch Pi with the isolated root and generated project launcher:

```bash
cd "$project"
PI_CODING_AGENT_DIR="$pi_root" ./.ai/start-pi.sh
```

In Pi, list the Cairnkeep tools and perform one synthetic memory write/read.
Cancel one in-flight call, then make a later read to prove cancellation is
per-call rather than session-wide. Exit normally and verify that no
`cairn memory-server` child belonging to the lab remains.

Pi 0.84.1 does not expose a native annotations field in its public tool API.
Inspect Cairnkeep's trusted bridge metadata and result `details`; do not describe
that as native annotation propagation.

## Recovery and cleanup

Change one setup-owned project file and run `cairn doctor` from the project.
Replay its exact setup recovery command. Separately change one isolated Pi
asset, then repair only that machine surface:

```bash
cairn sync-pi --apply --live-root "$pi_root"
cairn sync-pi --check --live-root "$pi_root"
cairn uninstall --dry-run --pi-live-root "$pi_root" "$project"
cairn uninstall --yes --pi-live-root "$pi_root" "$project"
```

Inspect the backup and revert instructions before removing the disposable lab
directory. Memory and context packs are retained unless their independent purge
flags are explicitly supplied.

## Boundaries

- The bridge spawns a local stdio child; it does not discover or inherit a
  remote HTTP memory endpoint.
- Setup with `--git none` is deliberately limited and cannot offer normal Git
  recovery or contributor-mode exclusion.
- Codex's generated configuration starts a local stdio child. It does not
  authorize the project, modify user-wide configuration, or enable networking.
- No trajectory capture, pack access, embedding, or skill activation is enabled
  merely by selecting Codex or Pi.
