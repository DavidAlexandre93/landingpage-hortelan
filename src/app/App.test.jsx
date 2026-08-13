import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App.jsx";

describe("Hortelan application", () => {
  beforeEach(() => {
    window.localStorage.setItem("hortelan_lang", "pt");
  });

  it("renders the complete primary journey in Portuguese", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: /Sua horta entende o clima/u })).toBeVisible();
    expect(screen.getByRole("heading", { name: /Tecnologia que trabalha/u })).toBeVisible();
    expect(screen.getByRole("heading", { name: /Do sinal à ação/u })).toBeVisible();
    expect(screen.getByRole("heading", { name: /Uma base para cada fase/u })).toBeVisible();
    expect(screen.getByRole("heading", { name: /Conte o que você quer cultivar/u })).toBeVisible();
  });

  it("switches every critical label and document language without reloading", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText("Selecionar idioma"), "en");

    expect(
      screen.getByRole("heading", { level: 1, name: /Your garden understands the climate/u })
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Prepare email" })).toBeVisible();
    expect(document.documentElement.lang).toBe("en");
    expect(window.localStorage.getItem("hortelan_lang")).toBe("en");
    expect(document.title).toBe("Hortelan AgTech | Connected growing, intelligent care");
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      expect.stringContaining("Sensor data")
    );
  });

  it("starts from the browser language when there is no saved preference", () => {
    window.localStorage.removeItem("hortelan_lang");
    vi.spyOn(window.navigator, "language", "get").mockReturnValue("es-MX");
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: /Tu huerto entiende el clima/u })).toBeVisible();
    expect(document.documentElement.lang).toBe("es");
  });

  it("persists a user-controlled dark theme", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Ativar tema escuro" }));

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(window.localStorage.getItem("hortelan_theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Ativar tema claro" })).toBeVisible();
  });

  it("uses a view transition for theme changes when motion is allowed", async () => {
    const user = userEvent.setup();
    const startViewTransition = vi.fn((callback) => callback());
    Object.defineProperty(document, "startViewTransition", {
      configurable: true,
      value: startViewTransition,
    });
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Ativar tema escuro" }));
    expect(startViewTransition).toHaveBeenCalledOnce();
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    delete document.startViewTransition;
  });

  it("uses protected new-tab behavior for external calls to action", () => {
    render(<App />);
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    expect(externalLinks.length).toBeGreaterThan(5);
    externalLinks.forEach((link) => expect(link).toHaveAttribute("rel", "noopener noreferrer"));
  });
});
