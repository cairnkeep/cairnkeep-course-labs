# Article and video production map

The course uses one source hierarchy:

1. Canonical explanation and acceptance criteria in Cairnkeep `docs/learning`.
2. Executable state and synthetic fixtures in this repository.
3. Blog articles derived from the canonical lesson.
4. Video scripts derived from the verified article and the same Git checkpoint.

Never maintain a separate demo script with different commands.

## Series

| Episode | Checkpoint | Written focus | Demo beat | Target |
|---|---|---|---|---:|
| 00 | `course-00-app` | Why durable context exists | Ask the app question before memory | 8 min |
| 01 | `course-01-bootstrap` | Install, storage, and first project | Guided setup and doctor | 12 min |
| 02 | `course-02-memory` | Reviewed memory and project knowledge | New-session recall and wiki query | 14 min |
| 03 | `course-03-quality` | Review and security | Find one reproducible serious bug | 14 min |
| 04 | `course-04-operation` | Storage and optional topology | Export, restore, and draw data flow | 15 min |
| 05 | `course-05-evidence` | Evidence and typed nodes | Inspect redaction and dry-run import | 15 min |
| 06 | `course-06-governance` | Capability state | Disable, restart, reset | 11 min |
| 07 | `course-07-evaluation` | Measurement and boundaries | Validate, run, read claim scope | 16 min |
| 08 | `course-08-graph` | Local structural context | Build, query, explain, and inspect provenance | 14 min |
| 09 | `course-09-skill` | Validated skill improvement | Review, evaluate, apply, roll back | 18 min |
| 10 | `course-10-trust-context` | Least authority and immutable context | Restrict tools, pin a pack, approve and revoke one skill | 18 min |
| 11 | `course-11-windows` | Native Windows operation | Guided PowerShell setup, ACL check, reversible uninstall | 14 min |
| 12 | `course-12-guided-setup` | Guided setup and Pi memory | Select Pi, sync explicitly, cancel safely, exit without an orphan | 16 min |

Presenter-ready scripts for the v2.11 additions live in
[`video-scripts/11-native-windows.md`](video-scripts/11-native-windows.md) and
[`video-scripts/12-guided-setup-and-pi.md`](video-scripts/12-guided-setup-and-pi.md).
They use the same checkpoints and commands as the executable labs; do not
maintain a separate demo path.

## Presenter script frame

Use these beats for every episode:

1. **Hook:** one concrete failure or repetitive task, 20-40 seconds.
2. **Outcome:** one observable result the viewer will reproduce.
3. **Checkpoint:** show the tag and a clean `git status`.
4. **Mental model:** one diagram, no architecture tour.
5. **Demo:** say intent before each command and pause on verification output.
6. **Boundary:** state storage, network, consent, and trust implications.
7. **Recovery:** demonstrate one safe failure path.
8. **Recap:** result, cleanup, and next checkpoint.

## Incremental production loop

For each episode: expand the canonical lesson, execute it from the checkpoint,
record expected output, write the presenter script, rehearse without recording,
pilot with one learner, fix repeated confusion, then publish article and video
together. Re-run the complete command verification after each Cairnkeep minor
release; re-record only episodes whose observable behavior changed.
