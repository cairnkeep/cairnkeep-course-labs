# Module 02: memory and project knowledge

**Maps to:** L03, L04, L05

## Outcome

Prove persistence across sessions, distinguish reviewed memory from tracked
derived knowledge, and practise correction instead of silent overwrite.

## Prepare

```bash
cp .ai/course.env.example .ai/.env
cairn sync --apply
cairn doctor
```

Register `cairn-memory` once for the chosen harness as described by the public
installation lesson, then launch through `.ai/start-claude.sh` or
`.ai/start-opencode.sh`.

## Exercise

1. Ask the harness to inspect `docs/requirements.md` and
   `docs/decisions/0001-bounded-status-set.md`.
2. Run `/remember Course convention: Trail Ledger uses UTC timestamps in examples.`
3. Run `/recall Trail Ledger timestamps` and record the returned key.
4. Exit, relaunch, and repeat the recall. This proves durable persistence.
5. Run `/memory-review`; accept only the synthetic convention.
6. Propose that `lost` should become a status. Record that as a superseding
   course decision, then inspect history rather than overwriting the old value.
7. Run `/wiki-ingest docs`, `/wiki-query bounded status`, and `/wiki-lint`.
8. Compare the reviewed memory record with `.planning/wiki/`: memory is scoped
   durable context; the wiki is a reviewable derived repository artifact.

## Verify

- Recall succeeds after a new session.
- The correction preserves history.
- Wiki output cites the synthetic source documents.
- No optional evidence database exists yet:

  ```bash
  cairn trajectory list --json
  cairn artifact list --json
  ```

## Recovery

If `cairn memory path` is outside `.course-state/`, exit the harness, copy
`.ai/course.env.example` to `.ai/.env`, and relaunch. Do not continue by
deleting or modifying the unexpected store.

