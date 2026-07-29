# Module 06: capability governance

**Maps to:** L15

## Outcome

Inspect effective capability state, distinguish inheritance from an override,
and verify the restart boundary for MCP tool omission.

## Prepare

```bash
cp .ai/course-governance.env.example .ai/.env
set -a
source .ai/.env
set +a
cairn capabilities list
cairn capabilities status --json
```

Save the initial configuration digest as course evidence. It identifies state;
it is not an approval, signature, or quality score.

## Operating capability cycle

```bash
cairn capabilities disable context.explore --json
cairn capabilities status --json
cairn capabilities reset context.explore --json
```

`context.explore` is an operating workflow, so the change applies on its next
invocation. `reset` removes the project override and restores inherited state;
it does not mean `enable`.

## MCP capability cycle

```bash
cairn capabilities disable memory.search --json
```

Exit and restart the harness/memory-server. Confirm `memory_search` is absent
while ordinary memory read remains healthy. Then reset and restart again:

```bash
cairn capabilities reset memory.search --json
```

Confirm the tool returns only after restart and record the new digest.

## Callback boundary

```bash
cairn capabilities logging enable --json
cairn capabilities status --json
cairn capabilities logging reset --json
```

Logging state alone does not grant local capture consent. A callback record is
permitted only when the separate trajectory capture flag is also enabled. Such
records contain capability, owner, timing, outcome, and state identity, but no
prompt, arguments, result, or memory value.

## Acceptance criteria

- The learner can explain compatibility default, project override, and strict
  process override precedence.
- MCP omission is checked after restart; operating state on next invocation.
- Reset is not described as enable.
- Standalone memory survives disabling an unrelated optional capability.
- A configuration digest is not presented as performance or security proof.

