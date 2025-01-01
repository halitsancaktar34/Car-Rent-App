import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CustomFilter from ".";

describe("CustomFilter", () => {
  const mockOptions = [
    { label: "Benzin", value: "benzin" },
    { label: "Dizel", value: "dizel" },
    { label: "Elektrik", value: "elektrik" },
  ];

  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it("renders the Select component with placeholder text", () => {
    renderWithRouter(<CustomFilter title="Yakıt Tipi" options={mockOptions} />);
    const placeholderElement = screen.getByText("Yakıt Tipi");
    expect(placeholderElement).toBeInTheDocument();
  });

  it("renders the correct number of options when clicked", async () => {
    renderWithRouter(<CustomFilter title="Yakıt Tipi" options={mockOptions} />);
    const selectElement = screen.getByRole("combobox");
    await userEvent.click(selectElement);

    const options = await screen.findAllByRole("option");
    expect(options).toHaveLength(mockOptions.length);
  });

  it("updates the URL parameters when an option is selected", async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomFilter title="Yakıt Tipi" options={mockOptions} />);

    const selectElement = screen.getByRole("combobox");
    await user.click(selectElement);

    const optionToSelect = screen.getByText("Benzin");
    await user.click(optionToSelect);

    expect(window.location.search).toContain("fuel_type=benzin");
  });
});
