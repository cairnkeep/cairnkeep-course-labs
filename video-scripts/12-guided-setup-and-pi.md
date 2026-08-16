# Video script - Guided setup with Codex and Pi

**Target duration:** 17 minutes
**Lesson:** Cairnkeep L23  
**Lab:** [12 - Guided setup with Codex and Pi](../labs/12-guided-setup-and-pi.md)
**Checkpoint:** `course-12-guided-setup`

## Before recording

- Use Cairnkeep 2.13.0, Node.js 22 or newer, Git, and Pi 0.84.1 or newer.
- Work from a disposable clone and isolated `PI_CODING_AGENT_DIR`; never alter
  the presenter's normal Pi agent root.
- Prepare one synthetic fact and one cancellable read. Do not show normal
  memory, prompts, tokens, or unrelated Pi sessions.
- Record the child-process check only after confirming which PID belongs to the
  disposable lab.

## 00:00 - Outcome

**Say:** “We will select Codex and Pi from Cairnkeep's harness registry, inspect
Codex's project-local MCP entry, install Cairnkeep's Pi assets explicitly,
exercise its maintained local stdio bridge, and exit without leaving an orphan.”

## 00:50 - Stable checkpoint and empty target

**Show:** `git switch --detach course-12-guided-setup`, the version checks, and
creation of the disposable `project` and `pi-agent` paths.

**Say:** “The project starts empty so `--git init` is an honest, reviewable
choice. The isolated Pi root keeps this exercise away from normal configuration.”

## 02:15 - Deterministic project setup

**Show:**

```bash
cairn setup "$project" --git init --harness codex,pi --memory local --yes
```

**Say:** “Setup records selections from one declarative harness registry and
reconciles project files. It does not modify the Pi installation. That machine
boundary remains explicit.”

## 03:15 - Inspect the Codex boundary

**Show:** `.ai/start-codex.sh` and the `cairn-memory` table in
`.codex/config.toml`.

**Say:** “Codex is project-scoped and needs no Cairnkeep machine sync. Setup
does not edit user-wide Codex configuration or grant project trust. The
operator reviews this table and accepts trust in Codex before launching.”

## 04:30 - Explicit Pi sync

**Show:** `cairn sync-pi --apply --live-root "$pi_root"`, then the corresponding
`--check` command and the three owned asset locations.

**Say:** “Sync owns only Cairnkeep's memory extension, trajectory extension,
and graph prompt. It does not install skills, start Pi, or enable remote access.”

## 06:30 - Doctor separates the surfaces

**Show:** Run `cairn doctor` from the project.

**Say:** “Project-state drift and Pi machine-asset drift have different
recovery commands. That distinction prevents setup from silently expanding its
authority.”

## 08:00 - Exercise the local bridge

**Show:** Launch the generated Pi launcher with the isolated root. List the
Cairnkeep tools, store/read the synthetic fact, cancel one in-flight call, and
perform a later read.

**Say:** “Cancellation belongs to one request, not the whole session. The tool
catalog is the server's effective catalog after feature gates, capabilities,
and MCP profile restrictions.”

## 11:00 - Annotation boundary

**Say:** “Pi 0.84.1 has no native annotations field in its public tool API.
Cairnkeep retains annotations in trusted bridge metadata and result details. We
must not describe that as native propagation.”

## 12:00 - Recovery and shutdown

**Show:** Repair one disposable project drift with doctor's exact setup command,
repair one Pi asset with `sync-pi --apply`, exit Pi normally, and verify that no
lab-owned `cairn memory-server` child remains.

## Privacy and trust boundary

**Say:** “The extension spawns a local stdio child and does not inherit a remote
HTTP memory endpoint. Selecting Pi does not enable trajectory capture,
embeddings, context packs, or skill activation. Codex project trust remains an
explicit operator decision.”

## 14:30 - Backup-first cleanup

**Show:** The uninstall dry run and confirmed command with the isolated Pi root
and project. Identify the backup and revert instructions.

**Say:** “Memory and context packs remain unless their independent purge flags
are explicitly chosen.”

## 16:10 - Recap

**Say:** “One registry selected the project assets, Codex stayed project-scoped,
Pi sync stayed explicit, the bridge remained local, per-call cancellation
preserved the session, and normal shutdown left no orphan.”
