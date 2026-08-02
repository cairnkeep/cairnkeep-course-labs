#!/usr/bin/env node
import { readFile, rename, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, ".planning", "config.json");
const action = process.argv[2];

if (!["enable", "disable"].includes(action)) {
  console.error("usage: node scripts/set-course-graph.mjs enable|disable");
  process.exit(2);
}

const source = await readFile(configPath, "utf8");
const parsed = JSON.parse(source);
if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
  throw new Error("course planning config must be a JSON object");
}

const graphify = parsed.graphify;
if (!graphify || typeof graphify !== "object" || Array.isArray(graphify)) {
  throw new Error("course planning config has no graphify object");
}

parsed.graphify = { ...graphify, enabled: action === "enable" };
const temporary = `${configPath}.tmp-${process.pid}`;
const configMode = (await stat(configPath)).mode & 0o777;
const trailingNewline = source.endsWith("\n") ? "\n" : "";
await writeFile(temporary, `${JSON.stringify(parsed, null, 2)}${trailingNewline}`, { mode: configMode });
await rename(temporary, configPath);
console.log(`course graph compatibility setting: ${parsed.graphify.enabled ? "enabled" : "disabled"}`);
