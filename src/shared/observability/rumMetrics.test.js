import { describe, expect, it, vi } from "vitest";
import { trackMetric } from "./rumMetrics.js";

describe("privacy-safe metrics", () => {
  it("sanitizes details, dispatches an event and writes to an opt-in buffer", () => {
    const listener = vi.fn();
    window.addEventListener("hortelan:metric", listener);
    window.__HORTELAN_METRICS__ = [];

    const payload = trackMetric("interaction", {
      duration: 12.3456,
      infinite: Number.POSITIVE_INFINITY,
      label: "x".repeat(140),
      enabled: true,
      nested: { secret: "not accepted" },
    });

    expect(payload.details).toEqual({
      duration: 12.35,
      infinite: -1,
      label: "x".repeat(120),
      enabled: true,
      nested: "[unsupported]",
    });
    expect(payload.path).toBe("/");
    expect(listener).toHaveBeenCalledOnce();
    expect(window.__HORTELAN_METRICS__).toEqual([payload]);
    window.removeEventListener("hortelan:metric", listener);
    delete window.__HORTELAN_METRICS__;
  });
});
