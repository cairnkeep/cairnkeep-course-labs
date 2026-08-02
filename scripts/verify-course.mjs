import { access, readFile } from "node:fs/promises";

const required = [
  "AGENTS.md",
  "COURSE.md",
  "SAFETY.md",
  "src/trail-ledger.mjs",
  "fixtures/review-target/README.md",
  "labs/08-local-code-graph.md",
  "scripts/set-course-graph.mjs",
];

for (const path of required) await access(path);

const course = await readFile("COURSE.md", "utf8");
for (const id of ["L03", "L04", "L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18"]) {
  if (!course.includes(id)) throw new Error(`course spine does not map ${id}`);
}

const graphLab = await readFile("labs/08-local-code-graph.md", "utf8");
for (const mode of ["build", "query", "status", "diff", "explain", "path"]) {
  if (!graphLab.includes(`graph ${mode}`)) throw new Error(`graph lab does not cover ${mode}`);
}
if (graphLab.includes("graphify install")) throw new Error("graph lab must not install Graphify harness assets");
if (!graphLab.includes("course-08-graph")) throw new Error("graph lab has no stable checkpoint");
if (!graphLab.includes("graphify-out/")) throw new Error("graph lab omits the incremental work directory");

const gitignore = await readFile(".gitignore", "utf8");
if (!gitignore.split(/\r?\n/).includes("graphify-out/")) {
  throw new Error("course does not ignore Graphify's incremental work directory");
}
for (const flag of ["CAIRN_TRAJECTORY_CAPTURE", "CAIRN_TYPED_MEMORY_NODES", "CAIRN_CAPABILITY_CONTRACT", "CAIRN_EVAL"]) {
  if (!course.includes(flag)) throw new Error(`course spine does not cover ${flag}`);
}

console.log("course structure verified");
