import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { validatePromotionWorkflow, validateWorkflowSource } from "./check-workflows.mjs";

describe("workflow verification", () => {
  it("accepts approved action majors", () => {
    const source = `
name: CI
on: push
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
`;
    expect(validateWorkflowSource(source)).toEqual([]);
  });

  it("rejects malformed workflows and unapproved actions", () => {
    expect(validateWorkflowSource("jobs: [", "broken.yml")[0]).toContain("invalid YAML");
    expect(
      validateWorkflowSource(
        `name: Bad\non: push\njobs:\n  test:\n    steps:\n      - uses: actions/checkout@v4`
      )
    ).toEqual(expect.arrayContaining([expect.stringContaining("unapproved action major")]));
  });

  it("requires ordered promotion of one immutable artifact", () => {
    const valid = parse(`
jobs:
  deploy-development:
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}" }
  deploy-staging:
    needs: deploy-development
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}" }
  deploy-production:
    needs: deploy-staging
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}" }
`);
    expect(validatePromotionWorkflow(valid)).toEqual([]);
    expect(validatePromotionWorkflow({ jobs: {} })).toHaveLength(2);
  });
});
