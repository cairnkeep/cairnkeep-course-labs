import { access, readFile } from "node:fs/promises";

const required = [
  "AGENTS.md",
  "COURSE.md",
  "SAFETY.md",
  "src/trail-ledger.mjs",
  "fixtures/review-target/README.md",
];

for (const path of required) await access(path);

const course = await readFile("COURSE.md", "utf8");
for (const id of ["L03", "L04", "L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17"]) {
  if (!course.includes(id)) throw new Error(`course spine does not map ${id}`);
}
for (const flag of ["CAIRN_TRAJECTORY_CAPTURE", "CAIRN_TYPED_MEMORY_NODES", "CAIRN_CAPABILITY_CONTRACT", "CAIRN_EVAL"]) {
  if (!course.includes(flag)) throw new Error(`course spine does not cover ${flag}`);
}

console.log("course structure verified");

