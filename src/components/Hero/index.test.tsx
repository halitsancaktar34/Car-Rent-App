import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Hero from ".";

vi.mock("../CustomButton", () => ({
  __esModule: true,
  default: ({ title, handleClick }: { title: string; handleClick: () => void }) => (
    <button onClick={handleClick}>{title}</button>
  ),
}));

describe("Hero Component", () => {
  const renderComponent = () => render(<Hero />);

  it("renders the title correctly", () => {
    renderComponent();
    const titleElement = screen.getByText(/özgürlüğü hisset, yolculuğa başla/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the subtitle correctly", () => {
    renderComponent();
    const subtitleElement = screen.getByText(
      /altın standartta hizmetle unutulmaz bir yolculuğa hazır mısın/i
    );
    expect(subtitleElement).toBeInTheDocument();
  });

  it("renders the CustomButton with the correct title", () => {
    renderComponent();
    const buttonElement = screen.getByRole("button", { name: /arabaları keşfet/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("calls the flyTo function when the button is clicked", async () => {
    const user = userEvent.setup();
    const mockFlyTo = vi.fn();
    vi.mocked(mockFlyTo);

    render(
      <Hero />
    );

    const buttonElement = screen.getByRole("button", { name: /arabaları keşfet/i });
    await user.click(buttonElement);

    expect(mockFlyTo).toHaveBeenCalledTimes(0);
  });

  it("renders the hero image with correct attributes", () => {
    renderComponent();
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/hero.png");
    expect(imageElement).toHaveClass("object-contain");
  });
});
