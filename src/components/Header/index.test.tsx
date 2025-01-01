import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import Header from ".";

vi.mock("../CustomButton", () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <button>{title}</button>
  ),
}));

describe("Header Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

  it("renders the navigation bar", () => {
    renderComponent();
    const navElement = screen.getByRole("navigation");
    expect(navElement).toBeInTheDocument();
  });

  it("renders the logo with correct src and alt", () => {
    renderComponent();
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/bmw.png");
    expect(logo).toHaveAttribute("width", "50");
  });

  it("renders the CustomButton component with the correct title", () => {
    renderComponent();
    const button = screen.getByRole("button", { name: /kaydol/i });
    expect(button).toBeInTheDocument();
  });

  it("renders the link to the homepage", () => {
    renderComponent();
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
