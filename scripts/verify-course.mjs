import { access, readFile } from "node:fs/promises";

const baseline = "2.11.0";

const required = [
  "AGENTS.md",
  "COURSE.md",
  "SAFETY.md",
  "src/trail-ledger.mjs",
  "fixtures/review-target/README.md",
  "labs/08-local-code-graph.md",
  "labs/09-validated-skill-improvement.md",
  "labs/10-trust-profiles-and-context-packs.md",
  "labs/11-native-windows.md",
  "labs/12-guided-setup-and-pi.md",
  "scripts/set-course-graph.mjs",
  "scripts/setup-skill-lab.mjs",
  "scripts/test-skill-lab.sh",
];

for (const path of required) await access(path);

const course = await readFile("COURSE.md", "utf8");
if (!course.includes(`**Baseline:** Cairnkeep ${baseline}`)) throw new Error("course baseline is stale");
const workflow = await readFile(".github/workflows/ci.yml", "utf8");
if (!workflow.includes(`@cairnkeep/cli@${baseline}`)) throw new Error("course CI core version is stale");
for (const id of ["L03", "L04", "L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21", "L22", "L23"]) {
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

const skillLab = await readFile("labs/09-validated-skill-improvement.md", "utf8");
for (const operation of ["harvest", "review", "propose", "evaluate", "apply", "rollback"]) {
  if (!skillLab.includes(`skill ${operation}`)) throw new Error(`skill lab does not cover ${operation}`);
}
if (!skillLab.includes("course-09-skill")) throw new Error("skill lab has no stable checkpoint");
if (!skillLab.includes("CAIRN_EVAL=1")) throw new Error("skill lab omits the evaluation opt-in gate");
if (!skillLab.includes("FULL_PROPOSAL_DIGEST")) throw new Error("skill lab omits exact-digest application");
const trustLab = await readFile("labs/10-trust-profiles-and-context-packs.md", "utf8");
for (const operation of ["mcp-tools set read-only", "mcp-tools set custom", "pack validate", "pack install", "pack enable", "pack approve-skill", "pack revoke-skill"]) {
  if (!trustLab.includes(operation)) throw new Error(`trust/context lab does not cover ${operation}`);
}
if (!trustLab.includes("course-10-trust-context")) throw new Error("trust/context lab has no stable checkpoint");
if (!trustLab.includes("CAIRN_CONTEXT_PACKS=1")) throw new Error("trust/context lab omits the context-pack gate");
const windowsLab = await readFile("labs/11-native-windows.md", "utf8");
for (const boundary of ["PowerShell", "--git init", "Get-Acl", "uninstall --dry-run", "revert.ps1"]) {
  if (!windowsLab.includes(boundary)) throw new Error(`Windows lab omits ${boundary}`);
}
if (!windowsLab.includes("course-11-windows")) throw new Error("Windows lab has no stable checkpoint");
const guidedLab = await readFile("labs/12-guided-setup-and-pi.md", "utf8");
for (const operation of ["setup", "--harness pi", "sync-pi --apply", "sync-pi --check", "cairn doctor"]) {
  if (!guidedLab.includes(operation)) throw new Error(`guided setup lab omits ${operation}`);
}
if (!guidedLab.includes("course-12-guided-setup")) throw new Error("guided setup lab has no stable checkpoint");
if (!guidedLab.includes("0.84.1")) throw new Error("guided setup lab omits the supported Pi minimum");
for (const flag of ["CAIRN_TRAJECTORY_CAPTURE", "CAIRN_TYPED_MEMORY_NODES", "CAIRN_CAPABILITY_CONTRACT", "CAIRN_EVAL"]) {
  if (!course.includes(flag)) throw new Error(`course spine does not cover ${flag}`);
}

console.log("course structure verified");
