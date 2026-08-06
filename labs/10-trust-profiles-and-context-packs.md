# Module 10: trust profiles and immutable context

**Maps to:** L20-L21

## Outcome

Reduce one disposable project's MCP authority, build and validate a synthetic
offline context pack, pin its digest to that project, and keep a bundled skill
invisible until exact-digest approval.

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

## Acceptance and cleanup

- Every catalog tool has a title and four Boolean annotations.
- Read-only is catalog-derived; custom is an exact allowlist.
- Local install, list, read, and substring search make no network request.
- `update --check` cannot switch the project; apply needs the inspected digest.
- Pack integrity is not publisher authenticity.

```bash
"$core/bin/cairn" pack disable trail-guide --project "$lab/project"
"$core/bin/cairn" pack remove "$digest"
"$core/bin/cairn" mcp-tools reset --project "$lab/project"
scripts/reset-course-state.sh --yes
unset CAIRN_PACK_BASE_DIR
```
