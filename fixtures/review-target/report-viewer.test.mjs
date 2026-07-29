import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { mayModify, readReport, renderItem } from "./report-viewer.mjs";

test("reads a named report", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "course-report-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(join(root, "daily.txt"), "all items accounted for\n");
  assert.equal(await readReport(root, "daily.txt"), "all items accounted for\n");
});

test("accepts the expected course token", () => {
  assert.equal(mayModify({ "x-course-token": "demo-token" }, "demo-token"), true);
});

test("renders an ordinary item", () => {
  assert.equal(
    renderItem({ id: "lamp-01", name: "Signal Lamp", status: "available" }),
    '<li data-id="lamp-01">Signal Lamp: available</li>',
  );
});

