import { readFile, realpath } from "node:fs/promises";
import { timingSafeEqual } from "node:crypto";
import { isAbsolute, relative, resolve } from "node:path";

export async function readReport(reportRoot, requestedName) {
  const root = await realpath(reportRoot);
  const candidate = await realpath(resolve(root, requestedName));
  const contained = relative(root, candidate);
  if (!contained || contained.startsWith("..") || isAbsolute(contained)) {
    throw new Error("report path escapes the configured root");
  }
  return readFile(candidate, "utf8");
}

export function mayModify(headers, expectedToken) {
  const supplied = headers["x-course-token"];
  if (typeof supplied !== "string" || typeof expectedToken !== "string" || supplied.length === 0) return false;
  const actual = Buffer.from(supplied);
  const expected = Buffer.from(expectedToken);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function renderItem(item) {
  const escape = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
  return `<li data-id="${escape(item.id)}">${escape(item.name)}: ${escape(item.status)}</li>`;
}
