# Module 10: trust profiles and immutable context

**Maps to:** L20-L21 and L24

## Outcome

Reduce one disposable project's MCP authority, build and validate a synthetic
offline context pack, pin its digest to that project, and keep a bundled skill
invisible until exact-digest approval. Then import reviewed Open Knowledge
Format context, traverse its local links, and export only explicitly selected,
redacted Markdown through a second exact-digest gate.

## Prepare isolated state

Start from checkpoint `course-10-trust-context` in a disposable clone:

```bash
git switch --detach course-10-trust-context
core=$(node scripts/locate-cairnkeep-core.mjs)
lab="$PWD/.course-state/trust-context"
mkdir -p "$lab/project" "$lab/pack"
export CAIRN_PACK_BASE_DIR="$lab/store"
printf '# Trail guide\n\nUse only fictional equipment records.\n' >"$lab/pack/guide.md"
printf '# Audit skill\n\nCheck fictional asset identifiers.\n' >"$lab/pack/SKILL.md"
```

## Restrict MCP authority

```bash
"$core/bin/cairn" mcp-tools list --json
"$core/bin/cairn" mcp-tools set read-only --project "$lab/project"
"$core/bin/cairn" mcp-tools status --project "$lab/project" --json
"$core/bin/cairn" mcp-tools set custom \
  --tool memory_read --tool memory_search --project "$lab/project"
```

The status digest identifies the profile, not capability state. The effective
surface remains the intersection of feature gates, capabilities, and this
allowlist. Restart an MCP server after changing the profile.

## Build and pin an offline pack

```bash
"$core/bin/cairn" pack init "$lab/pack" --id trail-guide --version 1.0.0 \
  --title "Trail guide" --description "Synthetic course context" \
  --license Apache-2.0
```

Edit `context-pack.json` so `SKILL.md` has `"kind": "skill"`, then:

```bash
"$core/bin/cairn" pack lock "$lab/pack"
"$core/bin/cairn" pack validate "$lab/pack"
"$core/bin/cairn" pack install "$lab/pack" --json >"$lab/install.json"
digest=$(node -e 'process.stdout.write(require(process.argv[1]).digest)' "$lab/install.json")
"$core/bin/cairn" pack enable "$digest" --project "$lab/project"
"$core/bin/cairn" pack skills --project "$lab/project" --json
```

The guide is available when `CAIRN_CONTEXT_PACKS=1`; the skill is not. Approve
only after reviewing its bytes:

```bash
file_digest=$(node -e 'const v=require(process.argv[1]);process.stdout.write(v.files.find(f=>f.path==="SKILL.md").sha256)' "$lab/pack/context-pack.json")
"$core/bin/cairn" pack approve-skill "$digest" SKILL.md \
  --confirm "$file_digest" --project "$lab/project"
"$core/bin/cairn" pack revoke-skill "$digest" SKILL.md --project "$lab/project"
```

Approval makes the skill readable through pack MCP tools; it never installs or
executes it. Changing the pack and enabling its new digest invalidates approval.

## Import reviewed OKF context

Create a deliberately small OKF 0.2 source. The stale date and missing link are
diagnostics to inspect, not validation bypasses:

```bash
okf="$lab/okf"
mkdir -p "$okf/concepts"
printf '%s\n' '---' 'okf_version: "0.2"' '---' '# Trail catalog' \
  '' '* [Equipment policy](concepts/equipment-policy.md)' >"$okf/index.md"
printf '%s\n' '---' 'type: Policy' 'title: Equipment policy' \
  'description: Synthetic reviewed policy.' \
  'verified: [{ by: human:course-reviewer }]' 'status: stable' \
  'stale_after: 2000-01-01' 'sources:' \
  '  - { id: handbook, resource: urn:course:trail-ledger:handbook }' \
  '---' '# Equipment policy' '' \
  'Use only fictional identifiers.' \
  'See the [missing retired checklist](./retired-checklist.md).' \
  >"$okf/concepts/equipment-policy.md"

"$core/bin/cairn" pack validate-okf "$okf" --json
"$core/bin/cairn" pack import-okf "$okf" --id trail-ledger-knowledge \
  --version 1.0.0 --license CC0-1.0 --json >"$lab/okf-import.json"
okf_digest=$(node -e \
  'process.stdout.write(require(process.argv[1]).digest)' "$lab/okf-import.json")
"$core/bin/cairn" pack enable "$okf_digest" --project "$lab/project"
"$core/bin/cairn" pack show "$okf_digest" --json
```

With `CAIRN_CONTEXT_PACKS=1`, use the project MCP server to call
`context_pack_list`, `context_pack_search`, `context_pack_read`, and
`context_pack_related`. The policy result retains its OKF version, type,
declared source, human-reviewed trust tier, stale state, and broken-link
diagnostic. Related traversal stays inside the enabled immutable pack. It never fetches
a URL and never executes declared computation metadata.

## Preview and confirm a reviewed export

Only named Markdown and promoted shared notes are eligible. Preview writes
nothing and produces a digest over the exact source bytes, selection, output,
and redaction result:

```bash
mkdir -p "$lab/project/docs"
printf '# Reviewed decision\n\nSynthetic approved text.\n' \
  >"$lab/project/docs/reviewed-decision.md"
"$core/bin/cairn" pack export-okf --project "$lab/project" \
  --output "$lab/exported-okf" --file docs/reviewed-decision.md \
  --check --json >"$lab/export-preview.json"
test ! -e "$lab/exported-okf"
preview_digest=$(node -e \
  'process.stdout.write(require(process.argv[1]).confirmation_digest)' \
  "$lab/export-preview.json")
"$core/bin/cairn" pack export-okf --project "$lab/project" \
  --output "$lab/exported-okf" --file docs/reviewed-decision.md \
  --apply --confirm "$preview_digest"
"$core/bin/cairn" pack validate-okf "$lab/exported-okf"
```

Changing a selected byte after preview invalidates confirmation. Existing
output is never replaced, unselected files remain absent, and private/runtime
paths are rejected. Redaction is a safety layer, not permission to publish
without reviewing the final bundle.

## Acceptance and cleanup

- Every catalog tool has a title and four Boolean annotations.
- Read-only is catalog-derived; custom is an exact allowlist.
- Local install, list, read, and substring search make no network request.
- `update --check` cannot switch the project; apply needs the inspected digest.
- Pack integrity is not publisher authenticity.
- OKF metadata is preserved as source claims and never becomes execution authority.
- Export is allowlist-only; check is no-write and apply requires the exact preview digest.

```bash
"$core/bin/cairn" pack disable trail-guide --project "$lab/project"
"$core/bin/cairn" pack remove "$digest"
"$core/bin/cairn" pack disable trail-ledger-knowledge --project "$lab/project"
"$core/bin/cairn" pack remove "$okf_digest"
"$core/bin/cairn" mcp-tools reset --project "$lab/project"
scripts/reset-course-state.sh --yes
unset CAIRN_PACK_BASE_DIR
```
