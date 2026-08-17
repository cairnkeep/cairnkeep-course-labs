#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT"
trap 'scripts/reset-course-state.sh --yes >/dev/null' EXIT
scripts/reset-course-state.sh --yes >/dev/null
core=$(node scripts/locate-cairnkeep-core.mjs)
project="$ROOT/.course-state/playbooks/project"
mkdir -p "$project"

"$core/bin/cairn" playbook init strict --project "$project" >/dev/null
set +e
"$core/bin/cairn" playbook check finish --project "$project" --session course-13 \
  --changed src/auth.ts docs/security.md --risk security --public-change \
  --enforce --json >"$project/missing.json"
status=$?
set -e
[[ $status -eq 3 ]]
node -e 'const v=require(process.argv[1]);if(!v.blocking_actions.includes("verify.tests")||!v.blocking_actions.includes("review.security"))process.exit(1)' "$project/missing.json"

"$core/bin/cairn" playbook check finish --project "$project" --session course-13 \
  --changed src/auth.ts docs/security.md --risk security --public-change \
  --completed verify.tests review.repository review.security docs.update \
  --skipped learning.capture='no stable reusable learning' \
  --enforce --json >"$project/decision.json"
policy=$(node -p "require(process.argv[1]).policy_digest" "$project/decision.json")
decision=$(node -p "require(process.argv[1]).decision_digest" "$project/decision.json")
"$core/bin/cairn" playbook record --project "$project" --policy "$policy" \
  --decision "$decision" --event finish --action verify.tests \
  --outcome completed --reason 'synthetic targeted tests passed' --session course-13 >/dev/null
"$core/bin/cairn" playbook doctor --project "$project" --json >"$project/doctor.json"
node -e 'if(require(process.argv[1]).ok!==true)process.exit(1)' "$project/doctor.json"
! grep -R -Fq 'src/auth.ts' "$project/.agentfs/playbooks/receipts"

echo 'playbook course lifecycle verified'
