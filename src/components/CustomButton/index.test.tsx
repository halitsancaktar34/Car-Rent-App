import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ButtonPropsType } from "../../types";
import { vi } from "vitest";
import CustomButton from ".";

describe("CustomButton", () => {
  const defaultProps: ButtonPropsType = {
    disabled: false,
    designs: "px-4 py-2",
    btnType: "button",
    title: "Click Me",
    rIcon: "test-icon.png",
    handleClick: vi.fn(),
  };

  it("renders correctly with required props", () => {
    render(<CustomButton {...defaultProps} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      "custom-btn bg-primary-blue rounded-full hover:bg-blue-800 text-white"
    );
  });

  it("calls the handleClick function when clicked", async () => {
    const user = userEvent.setup(); 
    render(<CustomButton {...defaultProps} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    await user.click(buttonElement);
    expect(defaultProps.handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as disabled when the disabled prop is true", async () => {
    render(<CustomButton {...defaultProps} disabled={true} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeDisabled();
  });

  it("renders the right icon when rIcon prop is provided", async () => {
    const rIcon = "test-icon.png";
    render(<CustomButton {...defaultProps} rIcon={rIcon} />);
    const iconElement = screen.getByRole("img");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("src", rIcon);
  });

  it("applies additional styles passed via designs prop", async () => {
    const customDesign = "text-lg font-bold";
    render(<CustomButton {...defaultProps} designs={customDesign} />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass(customDesign);
  });
});
