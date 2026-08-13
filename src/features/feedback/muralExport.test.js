import { describe, expect, it, vi } from "vitest";
import { downloadMuralEntries } from "./muralExport.js";

describe("mural export", () => {
  it("downloads normalized JSON and releases its object URL", () => {
    const click = vi.fn();
    const remove = vi.fn();
    const anchor = { click, remove };
    const append = vi.fn();
    const createObjectURL = vi.fn(() => "blob:mural");
    const revokeObjectURL = vi.fn();
    const schedule = vi.fn((callback) => callback());
    const BlobRef = vi.fn(function BlobMock(parts, options) {
      this.parts = parts;
      this.options = options;
    });
    const entries = [
      {
        id: "entry-1",
        name: "Ana",
        email: "ana@example.com",
        type: "idea",
        message: "Cultivar manjericão",
        createdAt: "2026-08-13T12:00:00.000Z",
      },
    ];

    downloadMuralEntries(entries, {
      BlobRef,
      documentRef: { createElement: vi.fn(() => anchor), body: { append } },
      urlRef: { createObjectURL, revokeObjectURL },
      schedule,
    });

    expect(BlobRef).toHaveBeenCalledWith([expect.stringContaining("Cultivar manjericão")], {
      type: "application/json;charset=utf-8",
    });
    expect(anchor).toMatchObject({ href: "blob:mural", download: "mural-hortelan.json", hidden: true });
    expect(append).toHaveBeenCalledWith(anchor);
    expect(click).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledOnce();
    expect(schedule).toHaveBeenCalledOnce();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mural");
  });
});
