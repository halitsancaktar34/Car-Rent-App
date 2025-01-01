import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CarType } from "../../types";
import DetailModal from "./DetailModal";
import { vi } from "vitest";

describe("DetailModal", () => {
  const mockCar: CarType = {
      make: "Toyota",
      model: "Corolla",
      year: 2020,
      fuel_type: "gas",
      city_mpg: 0,
      class: "",
      combination_mpg: 0,
      cylinders: 0,
      displacement: 0,
      drive: "fwd",
      highway_mpg: 0,
      transmission: "a"
  };

  const mockClose = vi.fn();

  const renderModal = (isOpen: boolean) => {
    return render(
      <DetailModal car={mockCar} isOpen={isOpen} close={mockClose} />
    );
  };

  it("renders correctly when open", () => {
    renderModal(true);

    const modalElement = screen.getByRole("dialog");
    expect(modalElement).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    renderModal(false);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls the close function when the close button is clicked", async () => {
    const user = userEvent.setup();
    renderModal(true);

    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("shows loading spinner while images are loading", async () => {
    renderModal(true);

    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("renders images correctly after loading", async () => {
    renderModal(true);

    await waitFor(() => {
      const mainImage = screen.getByAltText("Car Detail");
      expect(mainImage).toBeInTheDocument();

      const smallImages = screen.getAllByRole("img");
      expect(smallImages).toHaveLength(5); // Büyük resim ve 3 küçük resim
    });
  });

  it("renders car details except the year", () => {
    renderModal(true);

    expect(screen.queryByText(/year/i)).not.toBeInTheDocument();
    expect(screen.getByText(/make/i)).toBeInTheDocument();
    expect(screen.getByText(/model/i)).toBeInTheDocument();
    expect(screen.getByText(/fuel type/i)).toBeInTheDocument();
  });
});
