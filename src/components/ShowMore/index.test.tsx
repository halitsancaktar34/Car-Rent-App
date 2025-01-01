import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import ShowMore from ".";

vi.mock("../CustomButton", () => ({
  __esModule: true,
  default: ({
    handleClick,
    title,
  }: {
    handleClick: () => void;
    title: string;
  }) => <button onClick={handleClick}>{title}</button>,
}));

describe("ShowMore Component", () => {
  const renderComponent = (initialLimit: string | null = null) => {
    const url = new URL(window.location.href);
    if (initialLimit !== null) {
      url.searchParams.set("limit", initialLimit);
    } else {
      url.searchParams.delete("limit");
    }
    window.history.pushState({}, "Test page", url);

    return render(
      <BrowserRouter>
        <ShowMore />
      </BrowserRouter>
    );
  };

  it("renders the ShowMore button when limit is less than 30", () => {
    renderComponent("10");

    const button = screen.getByRole("button", { name: /daha fazla/i });
    expect(button).toBeInTheDocument();
  });

  it("does not render the ShowMore button when limit is 30 or more", () => {
    renderComponent("30");

    const button = screen.queryByRole("button", { name: /daha fazla/i });
    expect(button).not.toBeInTheDocument();
  });

  it("increments the limit parameter by 5 when clicked", async () => {
    const user = userEvent.setup();
    renderComponent("10");

    const button = screen.getByRole("button", { name: /daha fazla/i });
    expect(button).toBeInTheDocument();

    await user.click(button);

    const updatedParams = new URLSearchParams(window.location.search);
    expect(updatedParams.get("limit")).toBe("15");
  });

  it("defaults the limit to 5 if not provided in URL params", async () => {
    renderComponent(null);

    const button = screen.getByRole("button", { name: /daha fazla/i });
    expect(button).toBeInTheDocument();

    const updatedParams = new URLSearchParams(window.location.search);
    expect(updatedParams.get("limit")).toBeNull();

    // Tıklama sonrası limiti test et
    const user = userEvent.setup();
    await user.click(button);

    const updatedParamsAfterClick = new URLSearchParams(window.location.search);
    expect(updatedParamsAfterClick.get("limit")).toBe("10"); // İlk tıklama sonrası limit 10 olmalı
  });
});
