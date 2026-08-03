# Module 09: validated skill improvement

**Maps to:** L19

## Outcome

Turn recurring resolved hindsight into one reviewed skill proposal, evaluate it
against disjoint exploration and confirmation tasks, apply the exact eligible
digest, and prove rollback in a disposable project.

## Prepare the disposable project

Start from checkpoint `course-09-skill` and keep all generated state under
`.course-state/`:

```bash
git switch --detach course-09-skill
scripts/reset-course-state.sh --yes
node scripts/setup-skill-lab.mjs
core=$(node scripts/locate-cairnkeep-core.mjs)
lab="$PWD/.course-state/skill-project"
export CAIRN_AGENTFS_BASE_DIR="$PWD/.course-state/agentfs"
```

The setup creates three synthetic sessions: two contain the same failure family
and one records a later successful test run. It also creates one existing
`SKILL.md`, deterministic proposal and evaluation adapters, and four committed
tasks split across two non-overlapping sets.

## Harvest and review

```bash
"$core/bin/cairn" skill harvest --project "$lab" --json
"$core/bin/cairn" skill list --project "$lab" --json
"$core/bin/cairn" skill show --project "$lab" --kind candidate \
  --id CANDIDATE_ID
"$core/bin/cairn" skill review --project "$lab" \
  --candidate CANDIDATE_ID --approve --json
```

Do not approve until the two failure sessions, resolution evidence, bounded
excerpts, and proposed failure family are understandable. Approval is the
consent boundary before a proposal adapter may receive that evidence.

## Propose without changing the target

```bash
before=$(sha256sum "$lab/skills/course-review/SKILL.md")
"$core/bin/cairn" skill propose --project "$lab" \
  --candidate CANDIDATE_ID \
  --target skills/course-review/SKILL.md \
  --adapter "$lab/fixtures/proposal-adapter.json" --json
after=$(sha256sum "$lab/skills/course-review/SKILL.md")
test "$before" = "$after"
```

Inspect the proposal with `skill show --kind proposal`. The adapter proposes a
bounded edit; it receives neither the normal home directory nor unapproved
environment variables. This process isolation is not an operating-system
sandbox, so only run a reviewed executable.

## Evaluate on fresh worktrees

```bash
export CAIRN_EVAL=1
"$core/bin/cairn" skill evaluate --project "$lab" \
  --proposal PROPOSAL_ID \
  --exploration-task-set "$lab/eval/exploration.json" \
  --confirmation-task-set "$lab/eval/confirmation.json" \
  --adapter "$lab/eval/eval-adapter.json" \
  --repetitions 1 --minimum-improvement 1 --yes --json
```

Baseline worktrees fail both exploration tasks. Candidate worktrees pass them,
which unlocks a separate confirmation set where the same pattern repeats. The
independent verifier assigns pass or fail. Any regression, unknown result,
adapter change, task-set overlap, or source change rejects or invalidates the
candidate.

## Apply and roll back

```bash
"$core/bin/cairn" skill apply --project "$lab" \
  --proposal PROPOSAL_ID --evaluation EVALUATION_ID \
  --confirm FULL_PROPOSAL_DIGEST --json
grep -F "Verify the generated method exists" \
  "$lab/skills/course-review/SKILL.md"
"$core/bin/cairn" skill rollback --project "$lab" \
  --application APPLICATION_ID --confirm --json
test "$(cat "$lab/skills/course-review/SKILL.md")" = \
  "$(cat fixtures/skill/SKILL.md)"
```

Application requires the full proposal digest and an eligible evaluation. It
backs up the original before atomic replacement. Rollback restores those exact
bytes and refuses to overwrite a target changed after application.

## Acceptance criteria

- Harvest produces no candidate before two failure sessions and one resolution.
- Proposal leaves the live target byte-identical.
- Exploration and confirmation use different committed task IDs and fresh Git
  worktrees at one immutable source revision.
- The evaluation is eligible only with improvements and no regressions or
  unknown verifier results.
- A wrong proposal digest fails before application.
- Apply changes only the intended `SKILL.md`; rollback restores its exact bytes.
- The learner labels the result a local decision over a synthetic fixture, not
  universal evidence of skill quality.
