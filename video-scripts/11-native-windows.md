# Video script - Native Windows lifecycle

**Target duration:** 15 minutes
**Lesson:** Cairnkeep L22  
**Lab:** [11 - Native Windows lifecycle](../labs/11-native-windows.md)  
**Checkpoint:** `course-11-windows`

## Before recording

- Use native Windows x64, PowerShell, Node.js 22 or newer, Git, and Cairnkeep
  2.13.1. Do not use WSL or Git Bash.
- Start from a disposable clone at `course-11-windows` and an empty temporary
  path containing spaces.
- Hide notifications, user profile details, package-registry credentials, and
  unrelated ACL entries.
- Rehearse uninstall and revert paths without purging durable memory.

## 00:00 - Outcome

**Say:** “We will prove Cairnkeep is operating natively on Windows, let guided
setup initialize an empty project, inspect the real Windows permission boundary,
and reverse the managed files through a backup.”

## 00:45 - Prove the platform and checkpoint

**Show:** `git switch --detach course-11-windows`, `node --version`,
`cairn version`, and `$PSVersionTable.PSVersion`.

**Say:** “This is a PowerShell-native x64 exercise. Windows ARM64 currently
uses x64 emulation, and WSL would prove the Linux path instead.”

## 02:00 - Guided setup on an empty path

**Show:** Create `$Lab` under `$env:TEMP`, then run:

```powershell
cairn setup $Lab --git init --harness claude,codex --memory local --yes
```

**Say:** “The explicit flags make the demo deterministic. Setup owns target
preflight, Git initialization, selections from one declarative harness registry,
and the private reconciliation record. It does not silently install
machine-level assets.”

## 04:15 - Native launchers and doctor

**Show:** `.git`, `.ai\cairnkeep.json`, `.ai\start-claude.cmd`,
`.ai\start-codex.cmd`, `.ai\start-harness.ps1`, and `.codex\config.toml`.
Review the generated `cairn-memory` table. Apply an isolated Claude live root,
enter `$Lab`, and run `cairn doctor`.

**Say:** “Doctor completes a local MCP stdio handshake. No remote endpoint,
model, capture source, pack, or schedule was enabled by setup.”

**Say:** “Codex needs no Cairnkeep machine sync. Setup does not edit its
user-wide configuration or grant project trust; the operator reviews the local
table and makes that trust decision in Codex.”

## 06:30 - Inspect the Windows ACL

**Show:**

```powershell
Get-Acl (Join-Path $Lab '.ai\cairnkeep.json') | Format-List
```

**Say:** “On native Windows, authorization is an ACL contract. We do not claim
security from a Unix mode bit that Windows does not enforce.”

## 08:20 - Failure and recovery

**Say:** “If setup refuses a non-empty or conflicting target, preserve it and
choose the correct Git mode. Never force initialization into an unexplained
directory.”

**Show:** The lab's failure guidance without using a real work directory.

## 09:45 - Backup-first uninstall

**Show:** `cairn uninstall --dry-run`, followed by the confirmed command from
the lab. Open only the generated `manifest.json` and identify `revert.ps1`.

**Say:** “Uninstall backs up every managed change first. It retains durable
memory unless its separate purge option is explicitly selected.”

## Privacy and trust boundary

**Say:** “Native Windows support changes path, process, scheduling, and
permission mechanics. It does not add a network or grant access to a corpus.
Codex project trust remains explicit. The ACL protects local state; a
context-pack digest proves integrity, not publisher identity.”

## 12:45 - Recap

**Say:** “We proved native PowerShell operation, deterministic multi-harness
setup, project-scoped Codex memory, Windows ACL enforcement, local doctor, and
reversible cleanup—without WSL, Git Bash, or a destructive memory purge.”
