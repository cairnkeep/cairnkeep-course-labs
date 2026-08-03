import { execFileSync, spawnSync } from "node:child_process";
import { chmodSync, copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const state = join(root, ".course-state");
const project = join(state, "skill-project");
const source = join(root, "fixtures", "skill");

if (existsSync(project)) {
  throw new Error(`skill lab already exists at ${project}; run scripts/reset-course-state.sh --yes first`);
}

mkdirSync(join(project, "skills", "course-review"), { recursive: true });
copyFileSync(join(source, "SKILL.md"), join(project, "skills", "course-review", "SKILL.md"));
mkdirSync(join(project, "fixtures"), { recursive: true });
for (const name of ["proposal-adapter.mjs", "proposal-adapter.json"]) {
  copyFileSync(join(source, name), join(project, "fixtures", name));
}
mkdirSync(join(project, "eval"), { recursive: true });
for (const name of ["eval-adapter.mjs", "eval-adapter.json", "exploration.json", "confirmation.json"]) {
  copyFileSync(join(source, name), join(project, "eval", name));
}
chmodSync(join(project, "fixtures", "proposal-adapter.mjs"), 0o700);
chmodSync(join(project, "eval", "eval-adapter.mjs"), 0o700);
for (const [path, program] of [
  [join(project, "fixtures", "proposal-adapter.json"), join(project, "fixtures", "proposal-adapter.mjs")],
  [join(project, "eval", "eval-adapter.json"), join(project, "eval", "eval-adapter.mjs")],
]) {
  const config = JSON.parse(readFileSync(path, "utf8"));
  config.command.program = program;
  writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`);
}

function git(...args) {
  const result = spawnSync("git", ["-C", project, ...args], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || `git ${args.join(" ")} failed`);
  return result.stdout.trim();
}

git("init", "-q");
git("config", "user.name", "Cairnkeep Course");
git("config", "user.email", "course@example.invalid");
git("add", "skills", "fixtures", "eval/eval-adapter.mjs", "eval/eval-adapter.json");
git("commit", "-q", "-m", "synthetic skill evaluation source");
const sourceRevision = git("rev-parse", "HEAD");
for (const name of ["exploration.json", "confirmation.json"]) {
  const path = join(project, "eval", name);
  const taskSet = JSON.parse(readFileSync(path, "utf8"));
  taskSet.source.revision = sourceRevision;
  writeFileSync(path, `${JSON.stringify(taskSet, null, 2)}\n`);
}
git("add", "eval/exploration.json", "eval/confirmation.json");
git("commit", "-q", "-m", "bind disjoint skill task sets");

const core = execFileSync(process.execPath, [join(root, "scripts", "locate-cairnkeep-core.mjs")], {
  encoding: "utf8",
}).trim();
const importCore = (relative) => import(pathToFileURL(join(core, "mcp-memory-server", "dist", relative)).href);
const { distillProject } = await importCore("note-distiller.js");
const { getTrajectoryLimits, trajectorySessionSchema } = await importCore("trajectory-schema.js");
const { putTrajectory } = await importCore("trajectory-store.js");
const sessions = JSON.parse(readFileSync(join(source, "lifecycle-sessions.json"), "utf8"));

process.env.CAIRN_AGENTFS_BASE_DIR = join(state, "agentfs");
process.env.CAIRN_NOTE_DISTILLATION = "1";

for (const name of ["failure", "fix", "recurrence"]) {
  const session = trajectorySessionSchema.parse(JSON.parse(
    JSON.stringify(sessions[name]).replaceAll("$PROJECT_ROOT", project),
  ));
  await putTrajectory(project, session, getTrajectoryLimits());
  await distillProject({ projectRoot: project, sessionId: session.session_id });
}

console.log(project);
