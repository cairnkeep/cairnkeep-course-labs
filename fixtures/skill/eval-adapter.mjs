#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const request = JSON.parse(input);
const workspace = join(process.cwd(), request.workspace_path);
const skill = join(workspace, "skills", "course-review", "SKILL.md");

if (existsSync(skill) && readFileSync(skill, "utf8").includes("Verify the generated method exists")) {
  writeFileSync(join(workspace, "skill-pass"), "ok\n");
}

process.stdout.write(JSON.stringify({
  schema_version: 1,
  status: "completed",
  observed_capability_digest: request.expected_capability_digest,
}));
