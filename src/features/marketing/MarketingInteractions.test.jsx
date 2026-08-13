import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { catalog } from "../localization/catalog.js";
import { Header } from "./Header.jsx";
import { StorySection } from "./MarketingSections.jsx";

describe("marketing interactions", () => {
  it("closes the mobile navigation with Escape and restores trigger focus", async () => {
    const user = userEvent.setup();
    render(
      <Header
        copy={catalog.pt}
        language="pt"
        onLanguageChange={vi.fn()}
        theme="light"
        onThemeToggle={vi.fn()}
      />
    );

    const trigger = screen.getByRole("button", { name: catalog.pt.controls.menuOpen });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("changes language, toggles theme and focuses an internal destination", async () => {
    const user = userEvent.setup();
    const onLanguageChange = vi.fn();
    const onThemeToggle = vi.fn();
    const destination = document.createElement("section");
    destination.id = "solution";
    destination.tabIndex = -1;
    document.body.append(destination);

    render(
      <Header
        copy={catalog.pt}
        language="pt"
        onLanguageChange={onLanguageChange}
        theme="dark"
        onThemeToggle={onThemeToggle}
      />
    );

    await user.selectOptions(screen.getByLabelText(catalog.pt.controls.language), "fr");
    await user.click(screen.getByRole("button", { name: catalog.pt.controls.themeToLight }));
    await user.click(screen.getByRole("link", { name: catalog.pt.nav.features }));

    expect(onLanguageChange).toHaveBeenCalledWith("fr");
    expect(onThemeToggle).toHaveBeenCalledOnce();
    expect(destination).toHaveFocus();
    destination.remove();
  });

  it("loads the privacy-enhanced video only after explicit activation", async () => {
    const user = userEvent.setup();
    render(<StorySection copy={catalog.pt} />);

    expect(screen.queryByTitle(catalog.pt.story.videoTitle)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: catalog.pt.story.videoTitle }));

    const frame = screen.getByTitle(catalog.pt.story.videoTitle);
    expect(frame).toHaveAttribute("src", expect.stringContaining("youtube-nocookie.com"));
    expect(frame).toHaveAttribute("src", expect.stringContaining("autoplay=1"));
  });
});
