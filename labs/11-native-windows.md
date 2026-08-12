# 11 - Native Windows lifecycle

**Checkpoint:** `course-11-windows`  
**Public lesson:** L22  
**Platform:** native Windows x64, PowerShell, Node.js 22 or newer

## Outcome

Prove that Cairnkeep uses native Windows process, path, and permission
mechanics; configure a path containing spaces; inspect one managed ACL; and
exercise backup-first uninstall without WSL or Git Bash.

## Setup

Run from PowerShell after installing `@cairnkeep/cli@2.11.0`:

```powershell
git switch --detach course-11-windows
npm test
cairn version

$Lab = Join-Path $env:TEMP 'Cairnkeep Course Windows Lab'
New-Item -ItemType Directory -Force -Path $Lab | Out-Null
cairn setup $Lab --git init --harness claude --memory local --yes
cairn sync --apply --live-root (Join-Path $Lab '.claude-test')
Push-Location $Lab
cairn doctor
Pop-Location
```

The setup must create `.git`, the private `.ai\cairnkeep.json` reconciliation
record, `.ai\start-claude.cmd`, and `.ai\start-harness.ps1`. Doctor must report
native Windows x64 and complete its local MCP stdio check.

## Inspect the permission boundary

```powershell
Get-Acl (Join-Path $Lab '.ai\cairnkeep.json') | Format-List
```

The private managed file must not inherit broad access. Its authorization
contract is the Windows ACL for the current identity, Local System, and
Administrators—not a simulated Unix mode.

## Reversible cleanup

```powershell
cairn uninstall --dry-run --live-root (Join-Path $Lab '.claude-test') $Lab
cairn uninstall --yes --live-root (Join-Path $Lab '.claude-test') $Lab
```

Inspect the reported backup directory, `manifest.json`, and `revert.ps1`.
Execute the revert script only when intentionally restoring the managed assets.
Durable memory remains unless its separate purge option is explicitly chosen.

## Boundaries

- This lab proves native Windows x64. Windows ARM64 currently uses x64
  emulation; WSL is the Linux topology.
- Git is required because the lab selects `--git init`.
- `sqlite3.exe` is optional for runtime but required for WAL-safe export.
- No context pack, capture, network endpoint, model, or audit schedule is
  enabled by this exercise.
