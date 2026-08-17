#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT"
trap 'scripts/reset-course-state.sh --yes >/dev/null' EXIT

scripts/reset-course-state.sh --yes >/dev/null
core=$(node scripts/locate-cairnkeep-core.mjs)
state="$ROOT/.course-state/okf"
project="$state/project"
store="$state/store"
export CAIRN_PACK_BASE_DIR="$store"
mkdir -p "$project/docs"

"$core/bin/cairn" pack validate-okf "$ROOT/fixtures/okf" --json >"$state-validation.json"
node -e '
const result = require(process.argv[1]);
if (result.version !== "0.2") throw new Error("unexpected OKF version");
for (const code of ["broken-link", "stale"]) {
  if (!result.diagnostics.some((diagnostic) => diagnostic.code === code)) {
    throw new Error(`missing ${code} diagnostic`);
  }
}
' "$state-validation.json"

"$core/bin/cairn" pack import-okf "$ROOT/fixtures/okf" \
  --id trail-ledger-knowledge --version 1.0.0 --license CC0-1.0 \
  --title "Trail Ledger knowledge" --description "Synthetic OKF course fixture" \
  --json >"$state-import.json"
digest=$(node -e 'process.stdout.write(require(process.argv[1]).digest)' "$state-import.json")
[[ $digest =~ ^[0-9a-f]{64}$ ]]

"$core/bin/cairn" pack enable "$digest" --project "$project" >/dev/null
"$core/bin/cairn" pack show "$digest" --json >"$state-show.json"
node -e '
const pack = require(process.argv[1]);
if (pack.id !== "trail-ledger-knowledge") throw new Error("wrong imported pack");
if (pack.source_format?.name !== "okf" || pack.source_format?.version !== "0.2") {
  throw new Error("OKF provenance missing from imported pack");
}
if (!pack.files.some((file) => file.path === "concepts/equipment-policy.md")) {
  throw new Error("reviewed concept missing from imported pack");
}
' "$state-show.json"

course_secret=course-fixture-secret-value
export CAIRN_COURSE_EXPORT_SECRET="$course_secret"
printf '# Reviewed decision\n\nUse %s only as synthetic redaction input.\n' \
  "$course_secret" >"$project/docs/reviewed-decision.md"
printf '# Unselected draft\n\nThis file must stay out of the export.\n' \
  >"$project/docs/unselected.md"
output="$state/exported"
"$core/bin/cairn" pack export-okf --project "$project" --output "$output" \
  --file docs/reviewed-decision.md --check --json >"$state-preview.json"
[[ ! -e $output ]]
confirmation=$(node -e '
const plan = require(process.argv[1]);
if (plan.output_files.length !== 2) throw new Error("unexpected export file set");
if (plan.redaction_replacements < 1) throw new Error("synthetic secret was not redacted");
process.stdout.write(plan.confirmation_digest);
' "$state-preview.json")

if "$core/bin/cairn" pack export-okf --project "$project" --output "$output" \
  --file docs/reviewed-decision.md --apply --confirm deadbeef >/dev/null 2>&1; then
  echo "wrong export digest was accepted" >&2
  exit 1
fi
[[ ! -e $output ]]
"$core/bin/cairn" pack export-okf --project "$project" --output "$output" \
  --file docs/reviewed-decision.md --apply --confirm "$confirmation" >/dev/null
"$core/bin/cairn" pack validate-okf "$output" >/dev/null
! grep -R -Fq "$course_secret" "$output"
[[ ! -e $output/docs/unselected.md ]]

"$core/bin/cairn" pack disable trail-ledger-knowledge --project "$project" >/dev/null
"$core/bin/cairn" pack remove "$digest" >/dev/null
git diff --exit-code -- fixtures/okf >/dev/null

echo "OKF course import and export lifecycle verified"
