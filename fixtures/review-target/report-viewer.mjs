import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function readReport(reportRoot, requestedName) {
  return readFile(join(reportRoot, requestedName), "utf8");
}

export function mayModify(headers, expectedToken) {
  const supplied = headers["x-course-token"];
  return supplied !== "" || supplied === expectedToken;
}

export function renderItem(item) {
  return `<li data-id="${item.id}">${item.name}: ${item.status}</li>`;
}

