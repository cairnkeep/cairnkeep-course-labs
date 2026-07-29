#!/usr/bin/env bash
set -euo pipefail

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
TARGET="$ROOT/.course-state"

[[ ${1:-} == --yes ]] || {
  printf 'Preview: remove only %s\nRe-run with --yes after exiting every course harness.\n' "$TARGET"
  exit 0
}
[[ $TARGET == "$ROOT/.course-state" && $ROOT != / ]] || {
  echo "refusing unsafe course cleanup target" >&2
  exit 1
}
rm -rf -- "$TARGET"
printf 'removed course-only state: %s\n' "$TARGET"

