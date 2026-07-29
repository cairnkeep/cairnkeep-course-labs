import { access, readFile, realpath } from "node:fs/promises";
import { constants } from "node:fs";
import { delimiter, dirname, join, resolve } from "node:path";

async function packageName(root) {
  try {
    return JSON.parse(await readFile(join(root, "package.json"), "utf8")).name;
  } catch {
    return null;
  }
}

async function coreAt(root) {
  if (await packageName(root) === "@cairnkeep/cli") return root;
  const nested = join(root, "node_modules", "@cairnkeep", "cli");
  return await packageName(nested) === "@cairnkeep/cli" ? nested : null;
}

const explicit = process.env.CAIRN_COURSE_CORE_ROOT;
if (explicit) {
  const root = await coreAt(resolve(explicit));
  if (!root) throw new Error("CAIRN_COURSE_CORE_ROOT is not a Cairnkeep core package");
  console.log(root);
  process.exit(0);
}

for (const directory of (process.env.PATH || "").split(delimiter)) {
  if (!directory) continue;
  const command = join(directory, "cairn");
  try {
    await access(command, constants.X_OK);
    const resolved = await realpath(command);
    const root = await coreAt(dirname(dirname(resolved)));
    if (root) {
      console.log(root);
      process.exit(0);
    }
  } catch {
    // Continue through PATH candidates.
  }
}

throw new Error("could not locate @cairnkeep/cli; set CAIRN_COURSE_CORE_ROOT");

