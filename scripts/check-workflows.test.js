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
  validate-package:
    steps:
      - uses: actions/upload-artifact@v7
        with: { name: "frontend-dist-\${{ github.sha }}", path: dist-subpath }
  deploy-development:
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}", path: dist-subpath }
      - uses: peaceiris/actions-gh-pages@v4
        with: { publish_dir: dist-subpath }
  deploy-staging:
    needs: deploy-development
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}", path: dist-subpath }
      - uses: peaceiris/actions-gh-pages@v4
        with: { publish_dir: dist-subpath }
  deploy-production:
    needs: deploy-staging
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}", path: dist-subpath }
      - uses: peaceiris/actions-gh-pages@v4
        with: { publish_dir: dist-subpath }
`);
    expect(validatePromotionWorkflow(valid)).toEqual([]);
    expect(validatePromotionWorkflow({ jobs: {} })).toHaveLength(3);
  });

  it("rejects promotion of a root build to GitHub Pages", () => {
    const invalid = parse(`
jobs:
  validate-package:
    steps:
      - uses: actions/upload-artifact@v7
        with: { name: artifact, path: dist }
  deploy-development:
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}", path: dist }
      - uses: peaceiris/actions-gh-pages@v4
        with: { publish_dir: dist }
  deploy-staging:
    needs: deploy-development
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}", path: dist }
      - uses: peaceiris/actions-gh-pages@v4
        with: { publish_dir: dist }
  deploy-production:
    needs: deploy-staging
    if: startsWith(github.ref, 'refs/tags/v')
    steps:
      - uses: actions/download-artifact@v8
        with: { name: "frontend-dist-\${{ github.sha }}", path: dist }
      - uses: peaceiris/actions-gh-pages@v4
        with: { publish_dir: dist }
`);

    expect(validatePromotionWorkflow(invalid)).toEqual(
      expect.arrayContaining([
        expect.stringContaining("subpath build"),
        expect.stringContaining("subpath artifact"),
      ])
    );
  });
});
