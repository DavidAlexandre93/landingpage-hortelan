import { describe, expect, it, vi } from "vitest";
import {
  MURAL_STORAGE_KEY,
  buildMailtoUrl,
  createMuralEntry,
  normalizeMuralEntry,
  readMuralEntries,
  serializeMuralEntries,
  writeMuralEntries,
} from "./muralStore.js";

const validEntry = {
  id: "entry-1",
  name: "Ana",
  email: "ana@example.com",
  type: "idea",
  message: "Monitorar manjericão",
  createdAt: "2026-08-10T12:00:00.000Z",
};

describe("mural storage", () => {
  it("normalizes current and legacy entries", () => {
    expect(normalizeMuralEntry(validEntry)).toEqual(validEntry);
    expect(
      normalizeMuralEntry({
        nome: "  Davi ",
        email: "DAVI@EXAMPLE.COM",
        tipo: "duvida",
        msg: " Como conectar? ",
        data: validEntry.createdAt,
      })
    ).toMatchObject({ name: "Davi", email: "davi@example.com", type: "question", message: "Como conectar?" });
  });

  it("rejects malformed entries", () => {
    expect(normalizeMuralEntry(null)).toBeNull();
    expect(normalizeMuralEntry({ ...validEntry, name: "" })).toBeNull();
    expect(normalizeMuralEntry({ ...validEntry, email: "invalid" })).toBeNull();
    expect(normalizeMuralEntry({ ...validEntry, type: "other" })).toBeNull();
    expect(normalizeMuralEntry({ ...validEntry, createdAt: "bad-date" })).toBeNull();
    expect(normalizeMuralEntry({ ...validEntry, createdAt: undefined })).toBeNull();
  });

  it("keeps markup-like input as plain string data for React text rendering", () => {
    const entry = normalizeMuralEntry({ ...validEntry, message: '<img src=x onerror="alert(1)">' });
    expect(entry.message).toBe('<img src=x onerror="alert(1)">');
  });

  it("reads only valid records and tolerates corrupt or blocked storage", () => {
    const storage = { getItem: () => JSON.stringify([validEntry, { bad: true }]) };
    expect(readMuralEntries(storage)).toEqual([validEntry]);
    expect(readMuralEntries({ getItem: () => "{" })).toEqual([]);
    expect(
      readMuralEntries({
        getItem: () => {
          throw new Error("blocked");
        },
      })
    ).toEqual([]);
    expect(readMuralEntries({ getItem: () => JSON.stringify({}) })).toEqual([]);
  });

  it("writes normalized entries and reports storage failure", () => {
    const storage = { setItem: vi.fn() };
    expect(writeMuralEntries([validEntry, { bad: true }], storage)).toBe(true);
    expect(storage.setItem).toHaveBeenCalledWith(MURAL_STORAGE_KEY, JSON.stringify([validEntry]));
    expect(writeMuralEntries(null, storage)).toBe(true);
    expect(
      writeMuralEntries([validEntry], {
        setItem: () => {
          throw new Error("blocked");
        },
      })
    ).toBe(false);
  });

  it("creates deterministic entries and serializes only valid values", () => {
    const entry = createMuralEntry(
      { name: "Bia", email: "", type: "praise", message: "Ótimo painel" },
      new Date(validEntry.createdAt),
      () => "fixed-id"
    );
    expect(entry).toMatchObject({ id: "fixed-id", name: "Bia", type: "praise" });
    const fallbackEntry = createMuralEntry(
      { name: "Caio", email: "", type: "question", message: "Como cuidar?" },
      new Date(validEntry.createdAt),
      null
    );
    expect(fallbackEntry.id).toMatch(/^1786363200000-/u);
    expect(serializeMuralEntries([entry, { bad: true }])).toBe(`${JSON.stringify([entry], null, 2)}\n`);
  });

  it("builds an encoded mailto handoff", () => {
    const url = buildMailtoUrl({
      recipient: "team@example.com",
      name: "Ana & Bia",
      email: "ana@example.com",
      subject: "Parceria escolar",
      message: "Olá, Hortelan!",
    });
    expect(url).toMatch(/^mailto:team@example\.com\?/u);
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("subject")).toBe("Parceria escolar");
    expect(params.get("body")).toContain("Ana & Bia");
    expect(params.get("body")).toContain("Olá, Hortelan!");
  });
});
