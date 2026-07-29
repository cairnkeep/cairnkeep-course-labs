# Module 07: evaluation and product boundaries

**Maps to:** L16, L17

## Outcome

Validate and run a deterministic two-pass experiment, inspect missingness and
scope, perform one-capability ablation, and state what the result cannot prove.

## Validate before execution

```bash
export CAIRN_EVAL=1
output="$PWD/.agentfs/eval/experiments"
core=$(node scripts/locate-cairnkeep-core.mjs)
"$core/bin/cairn" eval validate \
  --task-set "$core/examples/eval/task-set.json" \
  --adapter "$core/examples/eval/adapter.json" \
  --output "$output" --json
```

Validation must invoke no adapter and create no experiment. The task set is the
installed package-owned fixture with exact package version and digest binding.

## Run two passes

```bash
"$core/bin/cairn" eval run \
  --task-set "$core/examples/eval/task-set.json" \
  --adapter "$core/examples/eval/adapter.json" \
  --output "$output" --seed course-1 --yes --json
"$core/bin/cairn" eval report --experiment EXPERIMENT-ID --json
```

Inspect full, executed, eligible, paired, and missing populations. Run 1 and
fresh Run 2 report deterministic fixture steps and designed token fields. They
are framework evidence only, not evidence that Cairnkeep improved an agent.

## One-capability ablation

```bash
"$core/bin/cairn" eval ablate --disable memory.search \
  --task-set "$core/examples/eval/task-set.json" \
  --adapter "$core/examples/eval/adapter.json" \
  --output "$output" --seed course-1 --json
```

Read the invocation estimate and both configuration digests. Repeat with
`--yes` only after confirming the treatment disables exactly one capability.
The fake adapter does not use memory, so a null/designed difference is expected
and makes no quality, efficiency, cost, latency, causal, or significance claim.

## Retention

```bash
"$core/bin/cairn" eval prune --older-than-days 0 --dry-run --json
"$core/bin/cairn" eval delete --experiment EXPERIMENT-ID --dry-run --json
```

Use `scripts/reset-course-state.sh --yes` only after inspection.

## L17 boundary

Cairnkeep owns memory/context infrastructure and the evaluation coordinator.
It does not own the learner's harness, model, inference loop, approvals, or
task policy. The bounded meta-agent configuration loop is a design contract,
not a released command or autonomous agent. Do not demo or advertise it as a
feature.

## Acceptance criteria

- Validation causes no adapter invocation or experiment write.
- The independent verifier, not the adapter, assigns task pass/fail.
- Missing fields remain missing; token totals are not invented.
- Ablation changes exactly one capability and reports both state digests.
- The learner labels all fixture output `offline-framework`.
- L17 is explained as a boundary and future design, not shipped software.
