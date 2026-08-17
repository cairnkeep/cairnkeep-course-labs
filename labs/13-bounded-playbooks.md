# 13 - Bounded workflow playbooks

**Checkpoint:** `course-13-playbooks`

**Public lesson:** L25
**Requirements:** Cairnkeep 2.15.0 and Node.js 22 or newer

## Outcome

Evaluate a local project policy at task start and finish, observe a real
enforcement failure, supply truthful evidence, record one bounded private
receipt, and explain why the playbook is neither an agent loop nor approval.

## Isolated exercise

Use a disposable project under course-only state:

```bash
git switch --detach course-13-playbooks
project="$PWD/.course-state/playbooks/project"
mkdir -p "$project"
cairn playbook init strict --project "$project"
cairn playbook check start --project "$project" --session course-13 \
  --complexity complex --familiarity unfamiliar
```

The decision identifies recall, exploration, and planning actions. Perform
applicable actions separately; the check has executed none of them.

Model a synthetic security-sensitive public change and preserve the failing
exit before adding evidence:

```bash
set +e
cairn playbook check finish --project "$project" --session course-13 \
  --changed src/auth.ts docs/security.md --risk security --public-change \
  --enforce --json >"$project/missing.json"
test "$?" -eq 3
set -e

# Only after completing the named checks:
cairn playbook check finish --project "$project" --session course-13 \
  --changed src/auth.ts docs/security.md --risk security --public-change \
  --completed verify.tests review.repository review.security docs.update \
  --skipped learning.capture='no stable reusable learning' \
  --enforce --json >"$project/decision.json"
```

Use the exact digests to record one result, then inspect the receipt:

```bash
policy=$(node -p "require('$project/decision.json').policy_digest")
decision=$(node -p "require('$project/decision.json').decision_digest")
cairn playbook record --project "$project" --policy "$policy" \
  --decision "$decision" --event finish --action verify.tests \
  --outcome completed --reason 'synthetic targeted tests passed' \
  --session course-13
cairn playbook receipts list --project "$project" --json
cairn playbook doctor --project "$project"
```

Verify that receipt JSON contains no changed path, prompt, source body, diff,
credential, or command output. Its actor is an unauthenticated caller assertion.

## Policy and instruction recovery

Compare profiles, change one canonical action, and restore it:

```bash
cairn playbook set balanced --project "$project"
cairn playbook disable learning.capture --project "$project"
cairn playbook reset learning.capture --project "$project"
cairn playbook instructions check --project "$PWD"
```

The last command proves this repository's managed block is current without
rewriting the surrounding course rules. `instructions remove` would remove only
that block; do not run it in the tracked course clone.

## Privacy and trust boundary

- Policy checks are offline, execute nothing, enable nothing, and grant no
  permission.
- Evidence is a caller assertion; an agent saying `completed` is not proof that
  a command ran successfully.
- Receipts are local provenance, not authentication, employee monitoring,
  access control, or non-repudiation.
- Team identity, ACLs, tenant isolation, and shared review queues are not
  shipped in Cairnkeep 2.15.

## Cleanup

```bash
scripts/reset-course-state.sh --yes
git status --short
```

The tracked course files remain unchanged and all receipt state is removed with
the bounded `.course-state/` tree.
