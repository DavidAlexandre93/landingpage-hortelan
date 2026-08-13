import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { width: 320, height: 760 },
  { width: 375, height: 812 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

function monitorPage(page) {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  page.on("requestfailed", (request) => {
    const url = request.url();
    if (url.startsWith("http://127.0.0.1:4173")) {
      errors.push(`request: ${url} (${request.failure()?.errorText ?? "unknown"})`);
    }
  });
  return errors;
}

async function expectNoSeriousAxeViolations(page) {
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  const violations = results.violations.filter(({ impact }) => impact === "serious" || impact === "critical");
  expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
}

test.describe("Hortelan production experience", () => {
  let runtimeErrors;

  test.beforeEach(async ({ page }) => {
    runtimeErrors = monitorPage(page);
  });

  test.afterEach(async () => {
    expect(runtimeErrors).toEqual([]);
  });

  test("navigates, localizes and switches theme without reloading", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Sua horta entende o clima");

    await page.locator('a[href="#workflow"]').first().click();
    await expect(page.locator("#workflow")).toBeFocused();
    await page.getByLabel("Selecionar idioma").selectOption("en");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Your garden understands the climate"
    );
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.getByRole("button", { name: "Use dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    for (const [language, heading] of [
      ["pt", "Sua horta entende o clima"],
      ["es", "Tu huerto entiende el clima"],
      ["fr", "Votre potager comprend le climat"],
    ]) {
      await page
        .getByLabel(/Select language|Selecionar idioma|Seleccionar idioma|Choisir la langue/u)
        .selectOption(language);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    }
  });

  test("validates contact and keeps mural content local and inert", async ({ page }) => {
    await page.goto("/");
    const contact = page.locator("#contact");
    await contact.getByRole("button", { name: "Preparar e-mail" }).click();
    const contactStatus = contact.getByText("Revise os campos destacados");
    await expect(contactStatus).toBeVisible();
    await expect(contactStatus).toHaveAttribute("aria-live", "polite");
    await expect(contact.getByLabel("Nome")).toBeFocused();

    await contact.getByLabel("Nome").fill("Ana");
    await contact.getByLabel("E-mail").fill("ana@example.com");
    await contact.getByLabel("Mensagem").fill("Quero conhecer a plataforma em uma escola.");
    await contact.getByRole("button", { name: "Preparar e-mail" }).click();
    await expect(contact.getByText("Rascunho preparado no seu aplicativo de e-mail.")).toBeVisible();

    const community = page.locator("#community");
    await community.getByLabel("Seu nome").fill("Bia");
    await community.getByLabel("Mensagem").fill('<img src="x" onerror="alert(1)">');
    await community.getByRole("button", { name: "Salvar no mural" }).click();
    await expect(community.getByText('<img src="x" onerror="alert(1)">')).toBeVisible();
    await expect(community.locator(".form-status")).toHaveAttribute("aria-live", "polite");
    await expect(page.locator('img[src="x"]')).toHaveCount(0);

    const downloadPromise = page.waitForEvent("download");
    await community.getByRole("button", { name: "Exportar JSON" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("mural-hortelan.json");

    page.once("dialog", (dialog) => dialog.accept());
    await community.getByRole("button", { name: /Remover entrada: Bia/u }).click();
    await expect(community.getByText('<img src="x" onerror="alert(1)">')).toHaveCount(0);
    await page.reload();
    await expect(community.getByText('<img src="x" onerror="alert(1)">')).toHaveCount(0);
  });

  test("supports keyboard navigation and announces invalid state", async ({ page, browserName }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    const skipLink = page.getByRole("link", { name: "Pular para o conteúdo" });
    if (browserName === "webkit") {
      // Playwright WebKit mirrors Safari's opt-in full keyboard access preference.
      await skipLink.focus();
    } else {
      await page.locator("body").press("Tab");
    }
    await expect(skipLink).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();

    const menu = page.locator(".menu-button");
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();

    const firstFaq = page.locator("#faq details").first();
    await firstFaq.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(firstFaq).not.toHaveAttribute("open", "");
  });

  test("has no serious accessibility violations in dynamic states", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await expectNoSeriousAxeViolations(page);

    await page.getByRole("button", { name: "Abrir menu" }).click();
    await expectNoSeriousAxeViolations(page);
    await page.getByRole("button", { name: "Fechar menu" }).click();

    await page.locator("#contact").getByRole("button", { name: "Preparar e-mail" }).click();
    await page.locator("#community").getByLabel("Seu nome").fill("Ana");
    await page.locator("#community").getByLabel("Mensagem").fill("Uma ideia acessível");
    await page.locator("#community").getByRole("button", { name: "Salvar no mural" }).click();
    await expectNoSeriousAxeViolations(page);

    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.getByRole("button", { name: "Ativar tema escuro" }).click();
    await page.waitForTimeout(350);
    await expectNoSeriousAxeViolations(page);
  });

  test("defers third-party video and survives denied storage", async ({ page }) => {
    await page.addInitScript(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function setItem(key, value) {
        if (key === "hortelan_faq") throw new DOMException("Denied", "SecurityError");
        return original.call(this, key, value);
      };
    });
    const initialHosts = new Set();
    page.on("request", (request) => initialHosts.add(new URL(request.url()).host));
    await page.goto("/");
    expect([...initialHosts]).toEqual(["127.0.0.1:4173"]);
    await expect(page.locator('iframe[src*="youtube"]')).toHaveCount(0);

    const community = page.locator("#community");
    await community.getByLabel("Seu nome").fill("Ana");
    await community.getByLabel("Mensagem").fill("Teste sem armazenamento");
    await community.getByRole("button", { name: "Salvar no mural" }).click();
    await expect(community.getByText("o navegador bloqueou o armazenamento local")).toBeVisible();

    await page.getByRole("button", { name: "Apresentação da Hortelan AgTech" }).click();
    await expect(page.locator('iframe[src*="youtube-nocookie.com"]')).toHaveCount(1);
  });

  test("keeps the mural usable when storage quota is exhausted", async ({ page }) => {
    await page.addInitScript(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function setItem(key, value) {
        if (key === "hortelan_faq") throw new DOMException("Quota exhausted", "QuotaExceededError");
        return original.call(this, key, value);
      };
    });
    await page.goto("/");
    const community = page.locator("#community");
    await community.getByLabel("Seu nome").fill("Bia");
    await community.getByLabel("Mensagem").fill("Continuar nesta sessão");
    await community.getByRole("button", { name: "Salvar no mural" }).click();
    await expect(community.getByText("Continuar nesta sessão")).toBeVisible();
    await expect(community.getByText("o navegador bloqueou o armazenamento local")).toBeVisible();
  });

  for (const viewport of VIEWPORTS) {
    test(`has no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/");
      const geometry = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
        heroWidth: document.querySelector(".hero-product")?.getBoundingClientRect().width ?? 0,
      }));
      expect(geometry.page).toBeLessThanOrEqual(geometry.viewport + 1);
      expect(geometry.heroWidth).toBeGreaterThan(0);
      const primaryAction = page.getByRole("link", { name: /Explorar a plataforma/u }).first();
      await expect(primaryAction).toBeVisible();
      const actionBox = await primaryAction.boundingBox();
      expect(actionBox.height).toBeGreaterThanOrEqual(44);
      expect(actionBox.width).toBeGreaterThanOrEqual(44);
      await expect(page.locator(".dashboard-frame img")).toHaveJSProperty("complete", true);
      expect(await page.locator(".dashboard-frame img").evaluate((image) => image.naturalWidth)).toBe(1851);
    });
  }

  test("honors reduced motion and forced colors", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Forced-colors emulation is Chromium-specific.");
    await page.emulateMedia({ reducedMotion: "reduce", forcedColors: "active" });
    await page.goto("/");
    const motion = await page
      .locator(".proof-chip")
      .first()
      .evaluate((element) => ({
        duration: getComputedStyle(element).animationDuration,
        iterations: getComputedStyle(element).animationIterationCount,
      }));
    expect(parseFloat(motion.duration)).toBeLessThanOrEqual(0.001);
    expect(motion.iterations).toBe("1");
    await expect(page.locator(".scroll-progress")).toBeHidden();
  });
});
