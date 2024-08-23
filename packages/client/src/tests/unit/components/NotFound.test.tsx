import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFound } from "src/components";
import { expect } from "vitest";

describe("NotFound Component", () => {
  it("renders with default message when no props are provided", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const titleElement = screen.getByText("Not Found");
    const messageElement = screen.getByText("Item not found.");

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  it("renders with custom message and item name", () => {
    render(
      <MemoryRouter>
        <NotFound message="Custom error message" itemName="Hotel" />
      </MemoryRouter>
    );

    const titleElement = screen.getByText("Not Found");
    const messageElement = screen.getByText("Custom error message");

    expect(titleElement).toBeInTheDocument();
    expect(messageElement).toBeInTheDocument();
  });

  it("renders with default message when only itemName is provided", () => {
    render(
      <MemoryRouter>
        <NotFound itemName="Hotel" />
      </MemoryRouter>
    );

    const messageElement = screen.getByText("Hotel not found.");
    expect(messageElement).toBeInTheDocument();
  });

  it("navigates back to the homepage when 'Back to Search' button is clicked", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole("button", { name: /back to search/i });
    fireEvent.click(buttonElement);

    expect(window.location.pathname).toBe("/");
  });
});
