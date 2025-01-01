import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarType } from "../../types";
import { vi } from "vitest";
import Card from ".";

vi.mock("./DetailModal", () => ({
  __esModule: true,
  default: ({ car, isOpen, close }: any) =>
    isOpen ? (
      <div>
        <h1 data-testid="modal-title">
          {car.make} {car.model}
        </h1>
        <button onClick={close}>Close</button>
      </div>
    ) : null,
}));

describe("Card Component", () => {
  const mockCar: CarType = {
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    fuel_type: "gas",
    transmission: "a",
    drive: "fwd",
    city_mpg: 0,
    class: "",
    combination_mpg: 0,
    cylinders: 0,
    displacement: 0,
    highway_mpg: 0,
  };

  it("renders car details correctly", () => {
    render(<Card car={mockCar} />);

    expect(screen.getByText(/toyota corolla/i)).toBeInTheDocument();

    const fuelType = screen.getByTestId("fuel-type");
    expect(fuelType).toHaveTextContent(/gas/i);

    expect(screen.getByText(/otomatik/i)).toBeInTheDocument();

    expect(screen.getByText(/fwd/i)).toBeInTheDocument();
  });

  it("renders car image", () => {
    render(<Card car={mockCar} />);

    const carImage = screen.getByTestId("car-image");
    expect(carImage).toBeInTheDocument();
    expect(carImage).toHaveAttribute("alt", "Toyota Corolla image");
  });

  it("opens modal when 'Daha Fazla' button is clicked", async () => {
    const user = userEvent.setup();
    render(<Card car={mockCar} />);

    const moreButton = screen.getByRole("button", { name: /daha fazla/i });
    expect(moreButton).toBeInTheDocument();

    await user.click(moreButton);

    const modalTitle = screen.getByTestId("modal-title");
    expect(modalTitle).toBeInTheDocument();
    expect(modalTitle).toHaveTextContent(/toyota corolla/i);
  });

  it("closes modal when 'Close' button is clicked", async () => {
    const user = userEvent.setup();
    render(<Card car={mockCar} />);

    const moreButton = screen.getByRole("button", { name: /daha fazla/i });
    await user.click(moreButton);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(screen.queryByTestId("modal-title")).not.toBeInTheDocument();
  });
});
