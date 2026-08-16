#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
TARGET="$ROOT/.course-state"
PROJECT_STORE="$ROOT/.agentfs"

[[ ${1:-} == --yes ]] || {
  printf 'Preview: remove only %s\nRe-run with --yes after exiting every course harness.\n' "$TARGET"
  exit 0
}
[[ $TARGET == "$ROOT/.course-state" && $PROJECT_STORE == "$ROOT/.agentfs" && $ROOT != / ]] || {
  echo "refusing unsafe course cleanup target" >&2
  exit 1
}
rm -rf -- "$TARGET"
if [[ -d $PROJECT_STORE ]]; then
  find "$PROJECT_STORE" -maxdepth 1 -type f ! -name .gitignore -delete
  for nested in eval work-evidence; do
    if [[ -d $PROJECT_STORE/$nested ]]; then
      chmod -R u+w "$PROJECT_STORE/$nested"
      rm -rf -- "$PROJECT_STORE/$nested"
    fi
  done
fi
printf 'removed course-only state: %s\n' "$TARGET"
