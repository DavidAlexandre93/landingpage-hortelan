import { expect, test } from "@playwright/test";

test("serves the portable build from the configured repository subpath", async ({ page }) => {
  const runtimeErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => runtimeErrors.push(`page: ${error.message}`));
  page.on("requestfailed", (request) => {
    if (request.url().startsWith("http://127.0.0.1:4174")) {
      runtimeErrors.push(`request: ${request.url()} (${request.failure()?.errorText ?? "unknown"})`);
    }
  });

  await page.goto("./");
  await expect(page).toHaveURL(/\/landingpage-hortelan\/$/u);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Sua horta entende o clima");

  const dashboard = page.locator(".dashboard-frame img");
  await expect(dashboard).toHaveJSProperty("complete", true);
  await expect(dashboard).toHaveAttribute("src", /^\/landingpage-hortelan\/assets\//u);
  expect(await dashboard.evaluate((image) => image.naturalWidth)).toBe(1851);

  const manifestHref = await page.locator('link[rel="manifest"]').getAttribute("href");
  expect(manifestHref).toBe("/landingpage-hortelan/site.webmanifest");
  const manifestResponse = await page.request.get(new URL(manifestHref, page.url()).href);
  expect(manifestResponse.ok()).toBe(true);

  await page.locator('a[href="#workflow"]').first().click();
  await expect(page.locator("#workflow")).toBeFocused();
  expect(runtimeErrors).toEqual([]);
});
