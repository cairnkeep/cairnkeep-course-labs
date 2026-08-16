# Video script - Git-linked work evidence

**Target duration:** 18 minutes
**Lesson:** Cairnkeep L13
**Lab:** [05 - Session evidence and typed memory](../labs/05-session-evidence.md)
**Checkpoint:** `course-05-evidence`

## Before recording

- Use Cairnkeep 2.13.0, Node.js 22 or newer, Git, and a disposable clone at
  `course-05-evidence`.
- Use only the fictional Trail Ledger data. Clear prior `.agentfs/` and
  `.course-state/` evidence, hide notifications, and verify `git status`.
- Rehearse with one supported generated launcher. Never display a real prompt,
  credential, path outside the clone, or unrelated worktree change.

## 00:00 - Outcome

**Say:** “We will surround one agent session with bounded Git observations,
link its local evidence, and inspect exactly what Cairnkeep retained. Then we
will prove the feature is optional and cannot restore or apply a change.”

## 00:45 - Prove default-off

**Show:** `git switch --detach course-05-evidence`, `cairn version`, a clean
`git status --short`, and:

```bash
cairn evidence list --json
```

**Say:** “No credential or existing memory setting turns this on. With the
flag absent, generated launchers do not invoke Git for work evidence and create
no work-evidence store.”

## 02:30 - Enable metadata-only capture

**Show:** Copy `.ai/course-evidence.env.example` to `.ai/.env`, point out
`CAIRN_WORK_EVIDENCE=1`, and launch through the generated `.ai/start-*.sh`.
Change `src/trail-ledger.mjs`, create one fictional untracked file, and exit
with the normal harness command.

**Say:** “The launcher owns the interval. Directly starting the harness bypasses
this wrapper. A missing Git executable or unavailable compatible Cairn command
warns and still launches the harness.”

## 05:30 - Inspect the record

**Show:**

```bash
cairn evidence list --status complete --json
cairn evidence show EVIDENCE-ID --json
cairn evidence doctor --json
```

Pause on the harness, commits, branch state, dirty flags, touched path labels,
exit status, timestamps, and digests.

**Say:** “This is interval evidence, not authorship proof. Another process can
edit the same worktree, and a file changed then restored to its starting state
is invisible. Workspace hashes are content-derived; hashing is not redaction.”

## 08:15 - Follow exact local links

**Show:** One trajectory or artifact identifier in the links array, then inspect
it with its own Cairn command.

**Say:** “The evidence record stores exact identifiers, not copied bodies.
Reviewed-memory links mean a reviewed write occurred in the interval; they do
not silently promote a trajectory or patch into trusted memory.”

## 10:15 - Demonstrate the patch boundary

**Show:** With an already-dirty synthetic tracked file, add
`CAIRN_WORK_EVIDENCE_PATCH=1`. Confirm `CAIRN_ARTIFACT_STORE=1` is also present,
run another short launcher session, and inspect the linked diff artifact.

**Say:** “Both flags are required. The patch compares the starting commit with
the ending worktree, so it can include tracked edits that predate this session.
Untracked bodies are omitted. Cairnkeep offers no apply, restore, or replay
command.”

## 13:20 - Failure and maintenance

**Show:** The dry-run commands:

```bash
cairn evidence delete EVIDENCE-ID --dry-run --json
cairn evidence prune --dry-run --json
```

Explain that an interrupted wrapper leaves a visible pending record and that
`doctor --repair` removes safe temporary remnants but never invents an end
state.

## Privacy and trust boundary

**Say:** “No prompt, keystroke, shell history, environment value, or model
reasoning is retained. Repository-relative path labels and content-derived
digests are retained locally. The two MCP evidence tools are read-only and
local-stdio-only; HTTP never exposes them. Ordinary uninstall keeps the
project store, while explicit memory purge is backup-first.”

## 16:30 - Recap

**Say:** “We proved default-off behavior, a bounded start/end Git record, exact
local links, double-consent patch capture, dry-run maintenance, and fail-open
launching. The result improves traceability without replacing Git or claiming
who authored a change.”
