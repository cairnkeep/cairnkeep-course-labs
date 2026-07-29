# Course safety boundary

This repository is intentionally public and synthetic. Treat it as disposable.

## Data boundary

All exercises use fictional equipment, people, policies, errors, and decisions.
Do not paste or import material from a real repository. Named/global memory,
notes, and evaluation output use ignored `.course-state/`. Project memory,
trajectory, and artifact databases use the ignored `.agentfs/` directory
because project scope is intentionally tied to the server working directory.

## Feature boundary

Cairnkeep's normal memory workflow is local-first. Trajectory capture,
hindsight notes, compaction artifacts, typed nodes, capability governance, and
evaluation are independent opt-ins. A lab enables only the feature it teaches
and its cleanup removes only `.course-state/` plus generated database files
immediately under this clone's `.agentfs/`.

## Vulnerable fixture

`fixtures/review-target/` contains bugs on purpose. It is input for repository
review and security-audit exercises, not a reference implementation. Do not
deploy, package, or copy it into another project.
