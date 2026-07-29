#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const chunks = [];
let bytes = 0;
for await (const chunk of process.stdin) {
  bytes += chunk.byteLength;
  if (bytes > 1024 * 1024) throw new Error("course request exceeds 1 MiB");
  chunks.push(chunk);
}

const request = JSON.parse(Buffer.concat(chunks).toString("utf8"));
const workspace = resolve(process.cwd(), request.workspace_path);
await writeFile(resolve(workspace, "adapter-result.txt"), `${request.task_id}:${request.pass}\n`, { mode: 0o600 });

process.stdout.write(JSON.stringify({
  schema_version: 1,
  status: "completed",
  turns: {
    value: request.pass === "run1" ? 2 : 1,
    semantics: "course-fixture-step"
  },
  usage: {
    total_tokens: request.pass === "run1" ? 20 : 10
  },
  harness: {
    id: "course-fixture"
  },
  adapter: {
    id: "trail-ledger-offline-adapter"
  },
  model: {
    id: "deterministic-fixture"
  },
  observed_capability_digest: request.expected_capability_digest
}));

