# Video script - Guided setup and Pi memory

**Target duration:** 16 minutes  
**Lesson:** Cairnkeep L23  
**Lab:** [12 - Guided setup and Pi memory](../labs/12-guided-setup-and-pi.md)  
**Checkpoint:** `course-12-guided-setup`

## Before recording

- Use Cairnkeep 2.11.0, Node.js 22 or newer, Git, and Pi 0.84.1 or newer.
- Work from a disposable clone and isolated `PI_CODING_AGENT_DIR`; never alter
  the presenter's normal Pi agent root.
- Prepare one synthetic fact and one cancellable read. Do not show normal
  memory, prompts, tokens, or unrelated Pi sessions.
- Record the child-process check only after confirming which PID belongs to the
  disposable lab.

## 00:00 - Outcome

**Say:** “We will configure an empty project for Pi, install Cairnkeep's Pi
assets explicitly, exercise its maintained local stdio bridge, cancel one call
without ending the session, and exit without leaving an orphan.”

## 00:50 - Stable checkpoint and empty target

**Show:** `git switch --detach course-12-guided-setup`, the version checks, and
creation of the disposable `project` and `pi-agent` paths.

**Say:** “The project starts empty so `--git init` is an honest, reviewable
choice. The isolated Pi root keeps this exercise away from normal configuration.”

## 02:15 - Deterministic project setup

**Show:**

```bash
cairn setup "$project" --git init --harness pi --memory local --yes
```

**Say:** “Setup records the selected harness and reconciles project files. It
does not modify the Pi installation. That machine boundary remains explicit.”

## 04:00 - Explicit Pi sync

**Show:** `cairn sync-pi --apply --live-root "$pi_root"`, then the corresponding
`--check` command and the three owned asset locations.

**Say:** “Sync owns only Cairnkeep's memory extension, trajectory extension,
and graph prompt. It does not install skills, start Pi, or enable remote access.”

## 06:00 - Doctor separates the two surfaces

**Show:** Run `cairn doctor` from the project.

**Say:** “Project-state drift and Pi machine-asset drift have different
recovery commands. That distinction prevents setup from silently expanding its
authority.”

## 07:30 - Exercise the local bridge

**Show:** Launch the generated Pi launcher with the isolated root. List the
Cairnkeep tools, store/read the synthetic fact, cancel one in-flight call, and
perform a later read.

**Say:** “Cancellation belongs to one request, not the whole session. The tool
catalog is the server's effective catalog after feature gates, capabilities,
and MCP profile restrictions.”

## 10:30 - Annotation boundary

**Say:** “Pi 0.84.1 has no native annotations field in its public tool API.
Cairnkeep retains annotations in trusted bridge metadata and result details. We
must not describe that as native propagation.”

## 11:30 - Recovery and shutdown

**Show:** Repair one disposable project drift with doctor's exact setup command,
repair one Pi asset with `sync-pi --apply`, exit Pi normally, and verify that no
lab-owned `cairn memory-server` child remains.

## Privacy and trust boundary

**Say:** “The extension spawns a local stdio child and does not inherit a remote
HTTP memory endpoint. Selecting Pi does not enable trajectory capture,
embeddings, context packs, or skill activation.”

## 14:00 - Backup-first cleanup

**Show:** The uninstall dry run and confirmed command with the isolated Pi root
and project. Identify the backup and revert instructions.

**Say:** “Memory and context packs remain unless their independent purge flags
are explicitly chosen.”

## 15:10 - Recap

**Say:** “Guided setup stayed project-scoped, Pi sync stayed explicit, the
bridge remained local, per-call cancellation preserved the session, and normal
shutdown left no orphan.”
