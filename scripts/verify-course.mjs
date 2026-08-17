import { access, readFile } from "node:fs/promises";

const baseline = "2.14.0";

const required = [
  "AGENTS.md",
  "COURSE.md",
  "SAFETY.md",
  "src/trail-ledger.mjs",
  "fixtures/review-target/README.md",
  "fixtures/okf/index.md",
  "fixtures/okf/concepts/equipment-policy.md",
  "fixtures/okf/concepts/response-playbook.md",
  "labs/08-local-code-graph.md",
  "labs/09-validated-skill-improvement.md",
  "labs/10-trust-profiles-and-context-packs.md",
  "labs/11-native-windows.md",
  "labs/12-guided-setup-and-pi.md",
  "video-scripts/05-git-work-evidence.md",
  "video-scripts/10-okf-exchange.md",
  "video-scripts/11-native-windows.md",
  "video-scripts/12-guided-setup-and-pi.md",
  "scripts/set-course-graph.mjs",
  "scripts/setup-skill-lab.mjs",
  "scripts/test-skill-lab.sh",
  "scripts/test-okf-lab.sh",
];

for (const path of required) await access(path);

const course = await readFile("COURSE.md", "utf8");
if (!course.includes(`**Baseline:** Cairnkeep ${baseline}`)) throw new Error("course baseline is stale");
const workflow = await readFile(".github/workflows/ci.yml", "utf8");
if (!workflow.includes(`@cairnkeep/cli@${baseline}`)) throw new Error("course CI core version is stale");
const reset = await readFile("scripts/reset-course-state.sh", "utf8");
if (!reset.includes("work-evidence")) throw new Error("course cleanup omits work evidence");
for (const id of ["L03", "L04", "L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18", "L19", "L20", "L21", "L22", "L23", "L24"]) {
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
for (const operation of ["pack validate-okf", "pack import-okf", "pack export-okf", "context_pack_related"]) {
  if (!trustLab.includes(operation)) throw new Error(`trust/context lab does not cover ${operation}`);
}
for (const boundary of ["never fetches", "never executes", "allowlist-only", "exact preview digest", "publisher authenticity"]) {
  if (!trustLab.includes(boundary)) throw new Error(`OKF lab omits ${boundary}`);
}
const windowsLab = await readFile("labs/11-native-windows.md", "utf8");
for (const boundary of ["PowerShell", "--git init", "--harness claude,codex", ".codex\\config.toml", "Get-Acl", "uninstall --dry-run", "revert.ps1"]) {
  if (!windowsLab.includes(boundary)) throw new Error(`Windows lab omits ${boundary}`);
}
if (!windowsLab.includes("course-11-windows")) throw new Error("Windows lab has no stable checkpoint");
const guidedLab = await readFile("labs/12-guided-setup-and-pi.md", "utf8");
for (const operation of ["setup", "--harness codex,pi", ".codex/config.toml", "sync-pi --apply", "sync-pi --check", "cairn doctor"]) {
  if (!guidedLab.includes(operation)) throw new Error(`guided setup lab omits ${operation}`);
}
if (!guidedLab.includes("course-12-guided-setup")) throw new Error("guided setup lab has no stable checkpoint");
if (!guidedLab.includes("0.84.1")) throw new Error("guided setup lab omits the supported Pi minimum");
const evidenceLab = await readFile("labs/05-session-evidence.md", "utf8");
for (const boundary of ["CAIRN_WORK_EVIDENCE_PATCH=1", "cairn evidence list", "cairn evidence show", "cairn evidence doctor", "cairn evidence prune --dry-run", "authorship", "untracked body", "no apply, restore"]) {
  if (!evidenceLab.includes(boundary)) throw new Error(`work-evidence lab omits ${boundary}`);
}
const evidenceVideo = await readFile("video-scripts/05-git-work-evidence.md", "utf8");
const okfVideo = await readFile("video-scripts/10-okf-exchange.md", "utf8");
const windowsVideo = await readFile("video-scripts/11-native-windows.md", "utf8");
const guidedVideo = await readFile("video-scripts/12-guided-setup-and-pi.md", "utf8");
for (const [name, script] of [["Windows", windowsVideo], ["guided setup", guidedVideo]]) {
  if (!script.includes("Codex")) throw new Error(`${name} video omits the Codex v2.13 path`);
  if (!script.includes("project trust")) throw new Error(`${name} video omits explicit Codex project trust`);
}
for (const [name, script, checkpoint] of [
  ["Git work evidence", evidenceVideo, "course-05-evidence"],
  ["OKF exchange", okfVideo, "course-10-trust-context"],
  ["Windows", windowsVideo, "course-11-windows"],
  ["guided Pi", guidedVideo, "course-12-guided-setup"],
]) {
  if (!script.includes("**Target duration:**")) throw new Error(`${name} video has no target duration`);
  if (!script.includes(checkpoint)) throw new Error(`${name} video has no stable checkpoint`);
  if (!script.includes("## Before recording")) throw new Error(`${name} video has no recording preflight`);
  if (!script.includes("## Privacy and trust boundary")) throw new Error(`${name} video omits its trust boundary`);
}
for (const boundary of ["context_pack_related", "no-write preview", "exact digest", "publisher authenticity", "never executes"]) {
  if (!okfVideo.includes(boundary)) throw new Error(`OKF video omits ${boundary}`);
}
for (const flag of ["CAIRN_TRAJECTORY_CAPTURE", "CAIRN_WORK_EVIDENCE", "CAIRN_TYPED_MEMORY_NODES", "CAIRN_CAPABILITY_CONTRACT", "CAIRN_EVAL"]) {
  if (!course.includes(flag)) throw new Error(`course spine does not cover ${flag}`);
}

console.log("course structure verified");
