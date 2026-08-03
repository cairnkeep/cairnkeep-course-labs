#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT"
trap 'scripts/reset-course-state.sh --yes >/dev/null' EXIT

scripts/reset-course-state.sh --yes >/dev/null
node scripts/setup-skill-lab.mjs >/dev/null
core=$(node scripts/locate-cairnkeep-core.mjs)
lab="$ROOT/.course-state/skill-project"
state="$ROOT/.course-state"
export CAIRN_AGENTFS_BASE_DIR="$state/agentfs"

field() {
  node -e '
const value = require(process.argv[1]);
const result = process.argv[2].split(".").reduce((current, key) => current[key], value);
if (typeof result !== "string" || result.length === 0) process.exit(1);
console.log(result);
' "$1" "$2"
}

"$core/bin/cairn" skill harvest --project "$lab" --json >"$state/harvest.json"
candidate=$(field "$state/harvest.json" candidates.0.id)
"$core/bin/cairn" skill review --project "$lab" --candidate "$candidate" --approve --json >/dev/null

cp "$lab/skills/course-review/SKILL.md" "$state/baseline-skill.md"
"$core/bin/cairn" skill propose --project "$lab" --candidate "$candidate" \
  --target skills/course-review/SKILL.md \
  --adapter "$lab/fixtures/proposal-adapter.json" --json >"$state/proposal.json"
cmp -s "$state/baseline-skill.md" "$lab/skills/course-review/SKILL.md"

proposal=$(field "$state/proposal.json" id)
digest=$(field "$state/proposal.json" proposal_digest)
export CAIRN_EVAL=1
"$core/bin/cairn" skill evaluate --project "$lab" --proposal "$proposal" \
  --exploration-task-set "$lab/eval/exploration.json" \
  --confirmation-task-set "$lab/eval/confirmation.json" \
  --adapter "$lab/eval/eval-adapter.json" \
  --repetitions 1 --minimum-improvement 1 --yes --json >"$state/evaluation.json"
evaluation=$(field "$state/evaluation.json" id)
[[ $(field "$state/evaluation.json" status) == eligible ]]

if "$core/bin/cairn" skill apply --project "$lab" --proposal "$proposal" \
  --evaluation "$evaluation" --confirm deadbeef --json >/dev/null 2>&1; then
  echo "wrong proposal digest was accepted" >&2
  exit 1
fi

"$core/bin/cairn" skill apply --project "$lab" --proposal "$proposal" \
  --evaluation "$evaluation" --confirm "$digest" --json >"$state/application.json"
application=$(field "$state/application.json" id)
grep -Fq "Verify the generated method exists" "$lab/skills/course-review/SKILL.md"

"$core/bin/cairn" skill rollback --project "$lab" --application "$application" \
  --confirm --json >/dev/null
cmp -s "$state/baseline-skill.md" "$lab/skills/course-review/SKILL.md"

echo "skill lab lifecycle verified"
