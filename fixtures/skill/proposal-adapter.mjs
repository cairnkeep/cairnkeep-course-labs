#!/usr/bin/env node

let input = "";
for await (const chunk of process.stdin) input += chunk;
const request = JSON.parse(input);

process.stdout.write(JSON.stringify({
  schema_version: 1,
  status: "completed",
  edits: [{
    operation: "add",
    anchor: null,
    content: "## Generated methods\n\nVerify the generated method exists before relying on it.",
    rationale: request.candidate.failure_family,
  }],
}));
