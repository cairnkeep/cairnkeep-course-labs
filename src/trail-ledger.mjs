import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const defaultStore = resolve(process.env.TRAIL_LEDGER_STORE || ".course-data/ledger.json");
const allowedStatuses = new Set(["available", "borrowed", "maintenance"]);

async function readLedger(path) {
  try {
    const parsed = JSON.parse(await readFile(path, "utf8"));
    return Array.isArray(parsed.items) ? parsed : { items: [] };
  } catch (error) {
    if (error.code === "ENOENT") return { items: [] };
    throw error;
  }
}

async function writeLedger(path, ledger) {
  await mkdir(dirname(path), { recursive: true });
  const temporary = `${path}.tmp-${process.pid}`;
  await writeFile(temporary, `${JSON.stringify(ledger, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, path);
}

export async function addItem(path, id, name, custodian) {
  const ledger = await readLedger(path);
  if (ledger.items.some((item) => item.id === id)) throw new Error(`duplicate item: ${id}`);
  const item = { id, name, custodian, status: "available" };
  ledger.items.push(item);
  await writeLedger(path, ledger);
  return item;
}

export async function setStatus(path, id, status) {
  if (!allowedStatuses.has(status)) throw new Error(`invalid status: ${status}`);
  const ledger = await readLedger(path);
  const item = ledger.items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`unknown item: ${id}`);
  item.status = status;
  await writeLedger(path, ledger);
  return item;
}

export async function listItems(path) {
  return (await readLedger(path)).items;
}

async function main(argv) {
  const [command, ...args] = argv;
  if (command === "add" && args.length === 3) {
    console.log(JSON.stringify(await addItem(defaultStore, ...args)));
    return;
  }
  if (command === "status" && args.length === 2) {
    console.log(JSON.stringify(await setStatus(defaultStore, ...args)));
    return;
  }
  if (command === "list" && args.length === 0) {
    console.log(JSON.stringify(await listItems(defaultStore), null, 2));
    return;
  }
  throw new Error("usage: trail-ledger add ID NAME CUSTODIAN | status ID STATUS | list");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

