# Module 03: repository review and security

**Maps to:** L06

## Outcome

Use Cairnkeep's review workflows to find reproducible defects in code whose
happy-path tests pass, then preserve only reviewed lessons.

## Prepare

```bash
git switch --detach course-03-quality
node --test fixtures/review-target/report-viewer.test.mjs
```

Read the fixture README, but do not inspect a solution branch first.

## Exercise

1. Launch a supported harness through this project's `.ai` launcher.
2. Run `/repo-review fixtures/review-target` and require file/line evidence,
   behavior impact, and a missing regression test for each finding.
3. Run `/security-audit fixtures/review-target` with the fixture as the explicit
   target. Treat it as an adversarial input boundary, not a deployable service.
4. Triage overlaps: merge duplicate findings instead of counting tool output.
5. Repair the fixture on a new branch and add negative tests before changing
   implementation.
6. Run both review commands again and distinguish fixed, residual, and untested
   risk.
7. Use `/remember` only for a generalizable reviewed pattern, not a copy of the
   report or vulnerable source.

## Acceptance criteria

- At least one filesystem-containment, authorization, and output-encoding risk
  is demonstrated with a concrete input.
- The original green tests are not presented as security evidence.
- Every repair has a failing-before/passing-after regression test.
- The memory candidate contains no source dump, token value, or false claim
  that the complete application was audited.

## Instructor route

After the learner finishes, compare with the `solutions/review-target` branch.
The branch is a reference repair, not the only valid implementation.

