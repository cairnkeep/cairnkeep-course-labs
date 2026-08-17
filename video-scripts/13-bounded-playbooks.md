# Video script - Bounded workflow playbooks

**Target duration:** 10 minutes

**Lesson:** Cairnkeep L25

**Lab:** [13 - Bounded workflow playbooks](../labs/13-bounded-playbooks.md)
**Checkpoint:** `course-13-playbooks`

## Before recording

- Use Cairnkeep 2.15.0 and a disposable clone at the stable checkpoint.
- Keep every actor, changed path, reason, and result synthetic.
- Disable all optional network integrations and clear `.course-state/`.
- Prepare one intentional exit-3 enforcement result and one satisfied result.

## 00:00 - Boundary first

**Say:** “A Cairnkeep playbook selects proportional existing workflow actions.
It does not become the agent runtime, execute those actions, enable a capability,
grant approval, or promote memory.”

## 01:00 - Inspect policy and instructions

**Show:** The balanced `.ai/playbooks.json`, its private mode, and the delimited
Cairnkeep block inside `AGENTS.md` with course rules above it.

**Say:** “The schema accepts only three profiles and eight canonical action
overrides. There is no command, prompt, URL, or executable extension field.”

## 02:15 - Start decision

**Show:** Initialize a strict disposable project and run `check start` with
complex/unfamiliar signals.

**Say:** “Paths and lifecycle rules are deterministic. Complexity and
familiarity are bounded caller assertions, so we inspect them rather than
treating model confidence as fact.”

## 03:45 - Real enforcement failure

**Show:** Run the security-sensitive finish check without evidence, display
exit 3 and `blocking_actions`, then perform the synthetic checks outside the
playbook CLI.

## 05:30 - Evidence and receipt

**Show:** Re-run with truthful completed and reasoned skipped evidence. Record
one result with exact digests, inspect it, and search for the changed paths.

**Say:** “The receipt contains bounded provenance, not the path list, prompt,
source, diff, credentials, or output. It does not prove that a caller's
completed assertion is true.”

## 07:15 - Harness routing

**Show:** `/cairn-work` for Claude/OpenCode or the managed `AGENTS.md` behavior
for Codex. State that Pi/Kimi install their thin adapters only through explicit
sync.

## Privacy and trust boundary

**Say:** “Actor identity in 2.15 is unauthenticated local metadata. It is not an
ACL, monitoring record, or non-repudiation. Team identity and isolation remain
design-only.”

## 09:00 - Recovery and recap

**Show:** Reset the override, check the managed instruction block, and run the
bounded course cleanup.

**Say:** “Policy selected the work, enforcement made missing must-evidence
visible, approvals stayed intact, and all retained state remained explicit.”
