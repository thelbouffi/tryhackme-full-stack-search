import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ErrorDisplay } from "src/components";
import { expect } from "vitest";

describe("ErrorDisplay Component", () => {
  it("renders error message and details, and closes on button click", () => {
    render(
      <MemoryRouter>
        <ErrorDisplay message="Test Error" details="Error Details" />
      </MemoryRouter>
    );

    const errorMessage = screen.getByText("Test Error");
    expect(errorMessage).toBeInTheDocument();

    const errorDetailsPre = screen.getByText("Error Details", { selector: "pre" });
    expect(errorDetailsPre).toBeInTheDocument();

    const summaryElement = screen.getByText("Error Details", { selector: "summary" });
    expect(summaryElement).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /×/i });
    fireEvent.click(closeButton);

    expect(errorMessage).not.toBeInTheDocument();
    expect(errorDetailsPre).not.toBeInTheDocument();
  });
});
