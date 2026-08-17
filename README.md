# Cairnkeep course labs

A synthetic project for learning Cairnkeep from the first guided setup through
reviewed memory, derived knowledge, storage operations, optional session
evidence, capability governance, evaluation, least-authority MCP profiles, and
immutable context packs, through native Windows and guided Pi setup.
The v2.15 baseline also covers Cairnkeep's declarative harness registry, Codex's
project-scoped local MCP configuration without granting project trust, and
opt-in Git-linked work evidence across all generated harness launchers. Module
10 adds reviewed OKF 0.1/0.2 exchange, deterministic related-document retrieval,
and an allowlist-only redacted export with exact-digest confirmation. Module 13
adds bounded project playbooks, deterministic enforcement, and private receipts
without turning Cairnkeep into an agent runtime.

The application is deliberately small: Trail Ledger records fictional shared
equipment. The code is only a stable subject for the memory and context labs.
It uses Node.js built-ins and requires no production credentials or service.

## Start

```bash
git clone https://github.com/cairnkeep/cairnkeep-course-labs.git
cd cairnkeep-course-labs
npm test
cp .ai/course.env.example .ai/.env
cairn doctor
```

Follow [the course spine](COURSE.md). Each module names a Git checkpoint so a
written lesson, workshop, blog post, and video can start from the same state.

## Safety

- Use only the fictional data already present here.
- Keep all optional stores under `.course-state/`.
- Never configure a real remote memory endpoint for these labs.
- Never paste real prompts, source code, tokens, email, or conversations.
- The `fixtures/review-target/` module is intentionally vulnerable and must
  never be deployed.

The canonical product documentation and learning path live in the
[Cairnkeep repository](https://github.com/cairnkeep/cairnkeep/tree/main/docs/learning).
