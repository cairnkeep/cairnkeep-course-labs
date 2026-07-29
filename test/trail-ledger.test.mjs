import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { addItem, listItems, setStatus } from "../src/trail-ledger.mjs";

test("records and updates a fictional item", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "trail-ledger-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const store = join(root, "ledger.json");

  await addItem(store, "lamp-01", "Signal Lamp", "Mira");
  await setStatus(store, "lamp-01", "borrowed");

  assert.deepEqual(await listItems(store), [{
    id: "lamp-01",
    name: "Signal Lamp",
    custodian: "Mira",
    status: "borrowed",
  }]);
});

test("rejects duplicate identifiers and unknown states", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "trail-ledger-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const store = join(root, "ledger.json");

  await addItem(store, "rope-01", "Climbing Rope", "Ivo");
  await assert.rejects(addItem(store, "rope-01", "Other Rope", "Nia"), /duplicate item/);
  await assert.rejects(setStatus(store, "rope-01", "lost"), /invalid status/);
});

