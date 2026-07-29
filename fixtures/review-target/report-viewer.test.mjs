import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
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

test("rejects paths outside the report root", async (t) => {
  const parent = await mkdtemp(join(tmpdir(), "course-report-"));
  t.after(() => rm(parent, { recursive: true, force: true }));
  const root = join(parent, "reports");
  await mkdir(root);
  await writeFile(join(parent, "outside.txt"), "not a report\n");
  await assert.rejects(readReport(root, "../outside.txt"), /escapes/);
});

test("accepts the expected course token", () => {
  assert.equal(mayModify({ "x-course-token": "demo-token" }, "demo-token"), true);
  assert.equal(mayModify({}, "demo-token"), false);
  assert.equal(mayModify({ "x-course-token": "wrong" }, "demo-token"), false);
});

test("renders an ordinary item", () => {
  assert.equal(
    renderItem({ id: "lamp-01", name: "Signal Lamp", status: "available" }),
    '<li data-id="lamp-01">Signal Lamp: available</li>',
  );
});

test("escapes item fields before rendering markup", () => {
  assert.equal(
    renderItem({ id: 'x" onclick="bad', name: "<script>bad()</script>", status: "available" }),
    '<li data-id="x&quot; onclick=&quot;bad">&lt;script&gt;bad()&lt;/script&gt;: available</li>',
  );
});
