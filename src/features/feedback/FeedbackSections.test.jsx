import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { catalog } from "../localization/catalog.js";
import { CommunitySection } from "./CommunitySection.jsx";
import { ContactSection } from "./ContactSection.jsx";

describe("feedback sections", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("prepares a validated contact email without sending automatically", async () => {
    const user = userEvent.setup();
    const onMailto = vi.fn();
    render(<ContactSection copy={catalog.pt} onMailto={onMailto} />);

    await user.type(screen.getByLabelText("Nome"), "Ana");
    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.type(screen.getByLabelText("Mensagem"), "Quero implantar uma horta na escola.");
    await user.click(screen.getByRole("button", { name: /Preparar e-mail/u }));

    expect(onMailto).toHaveBeenCalledOnce();
    expect(onMailto.mock.calls[0][0]).toMatch(/^mailto:davidalexandrefernandes@outlook\.com\?/u);
    expect(screen.getByText(catalog.pt.contact.status)).toBeVisible();
  });

  it("opens the prepared email in a separate browser context", async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<ContactSection copy={catalog.pt} />);

    await user.type(screen.getByLabelText("Nome"), "Ana");
    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.type(screen.getByLabelText("Mensagem"), "Quero conhecer a plataforma Hortelan.");
    await user.click(screen.getByRole("button", { name: /Preparar e-mail/u }));

    expect(openSpy).toHaveBeenCalledWith(
      expect.stringMatching(/^mailto:davidalexandrefernandes@outlook\.com\?/u),
      "_blank",
      "noopener,noreferrer"
    );
  });

  it("explains an invalid contact submission and focuses the first field", async () => {
    const user = userEvent.setup();
    const onMailto = vi.fn();
    render(<ContactSection copy={catalog.pt} onMailto={onMailto} />);

    await user.click(screen.getByRole("button", { name: /Preparar e-mail/u }));

    expect(screen.getByText(catalog.pt.contact.invalid)).toBeVisible();
    expect(screen.getByLabelText(catalog.pt.contact.name)).toHaveFocus();
    expect(onMailto).not.toHaveBeenCalled();
  });

  it("renders mural markup-like content as inert text and persists it", async () => {
    const user = userEvent.setup();
    render(<CommunitySection copy={catalog.pt} language="pt" />);

    await user.type(screen.getByLabelText("Seu nome"), "Bia");
    await user.type(screen.getByLabelText("Mensagem"), '<img src="x" onerror="alert(1)">');
    await user.click(screen.getByRole("button", { name: /Salvar no mural/u }));

    expect(screen.getByText('<img src="x" onerror="alert(1)">')).toBeVisible();
    expect(document.querySelector('img[src="x"]')).toBeNull();
    expect(window.localStorage.getItem("hortelan_faq")).toContain("onerror");
  });

  it("removes an entry only after confirmation", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      "hortelan_faq",
      JSON.stringify([
        {
          id: "one",
          name: "Caio",
          email: "",
          type: "question",
          message: "Como começar?",
          createdAt: "2026-08-10T12:00:00.000Z",
        },
      ])
    );
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<CommunitySection copy={catalog.pt} language="pt" />);

    await user.click(screen.getByRole("button", { name: /Remover entrada: Caio/u }));
    expect(confirmSpy).toHaveBeenCalledOnce();
    expect(screen.queryByText("Como começar?")).not.toBeInTheDocument();
  });

  it("keeps an entry when removal is cancelled", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(
      "hortelan_faq",
      JSON.stringify([
        {
          id: "one",
          name: "Caio",
          email: "",
          type: "question",
          message: "Como começar?",
          createdAt: "2026-08-10T12:00:00.000Z",
        },
      ])
    );
    vi.spyOn(window, "confirm").mockReturnValue(false);
    render(<CommunitySection copy={catalog.pt} language="pt" />);

    await user.click(screen.getByRole("button", { name: /Remover entrada: Caio/u }));
    expect(screen.getByText("Como começar?")).toBeVisible();
  });

  it("reports invalid and storage-blocked mural submissions", async () => {
    const user = userEvent.setup();
    const storage = {
      getItem: vi.fn(() => "[]"),
      setItem: vi.fn(() => {
        throw new Error("blocked");
      }),
    };
    render(<CommunitySection copy={catalog.pt} language="pt" storage={storage} />);

    await user.click(screen.getByRole("button", { name: /Salvar no mural/u }));
    expect(screen.getByText(catalog.pt.community.invalid)).toBeVisible();
    expect(screen.getByLabelText(catalog.pt.community.name)).toHaveFocus();

    await user.type(screen.getByLabelText(catalog.pt.community.name), "Bia");
    await user.type(screen.getByLabelText(catalog.pt.community.message), "Uma nova ideia");
    await user.click(screen.getByRole("button", { name: /Salvar no mural/u }));
    expect(screen.getByText(catalog.pt.community.notPersisted)).toBeVisible();
  });

  it("guards empty exports and delegates populated downloads", async () => {
    const user = userEvent.setup();
    const onDownload = vi.fn();
    const { unmount } = render(<CommunitySection copy={catalog.pt} language="pt" onDownload={onDownload} />);

    await user.click(screen.getByRole("button", { name: /Exportar JSON/u }));
    expect(screen.getByText(catalog.pt.community.exportEmpty)).toBeVisible();
    expect(onDownload).not.toHaveBeenCalled();
    unmount();

    window.localStorage.setItem(
      "hortelan_faq",
      JSON.stringify([
        {
          id: "one",
          name: "Davi",
          email: "",
          type: "idea",
          message: "Sensor solar",
          createdAt: "2026-08-10T12:00:00.000Z",
        },
      ])
    );
    render(<CommunitySection copy={catalog.pt} language="pt" onDownload={onDownload} />);
    await user.click(screen.getByRole("button", { name: /Exportar JSON/u }));
    expect(onDownload).toHaveBeenCalledWith([expect.objectContaining({ name: "Davi" })]);
  });

  it("recovers from malformed local mural data", () => {
    window.localStorage.setItem("hortelan_faq", "{");
    render(<CommunitySection copy={catalog.pt} language="pt" />);
    expect(screen.getByText(catalog.pt.community.empty)).toBeVisible();
  });
});
