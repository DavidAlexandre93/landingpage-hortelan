import { serializeMuralEntries } from "./muralStore.js";

export function downloadMuralEntries(
  entries,
  {
    BlobRef = globalThis.Blob,
    documentRef = globalThis.document,
    urlRef = globalThis.URL,
    schedule = globalThis.queueMicrotask,
  } = {}
) {
  const blob = new BlobRef([serializeMuralEntries(entries)], {
    type: "application/json;charset=utf-8",
  });
  const objectUrl = urlRef.createObjectURL(blob);
  const anchor = documentRef.createElement("a");

  anchor.href = objectUrl;
  anchor.download = "mural-hortelan.json";
  anchor.hidden = true;
  documentRef.body.append(anchor);
  anchor.click();
  anchor.remove();
  schedule(() => urlRef.revokeObjectURL(objectUrl));
}
