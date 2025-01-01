import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import SearchBar from ".";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(() => {
      const params = new URLSearchParams();
      return [
        params,
        (newParams: Record<string, string>) => {
          Object.keys(newParams).forEach((key) => {
            params.set(key, newParams[key]);
          });
          window.history.pushState({}, "", `?${params.toString()}`);
        },
      ];
    }),
  };
});

describe("SearchBar", () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("renders the Select and input fields correctly", () => {
    renderWithRouter(<SearchBar />);
    const makeSelect = screen.getByRole("combobox");
    const modelInput = screen.getByPlaceholderText("örn:Civic");

    expect(makeSelect).toBeInTheDocument();
    expect(modelInput).toBeInTheDocument();
  });

  it("updates the URL parameters on form submission", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SearchBar />);

    const makeSelect = screen.getByRole("combobox");
    await user.click(makeSelect);

    const option = screen.getByText("Toyota");
    await user.click(option);

    const modelInput = screen.getByPlaceholderText("örn:Civic");
    await user.type(modelInput, "Civic");

    const form = screen.getByTestId("search-form");
    fireEvent.submit(form);

    expect(window.location.search).toContain("make=Toyota");
    expect(window.location.search).toContain("model=Civic");
  });
});
