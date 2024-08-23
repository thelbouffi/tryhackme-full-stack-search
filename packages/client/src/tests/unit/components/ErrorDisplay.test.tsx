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

    // Check that the error message is displayed
    const errorMessage = screen.getByText("Test Error");
    expect(errorMessage).toBeInTheDocument();

    // Check that the error details are displayed inside the <pre> tag
    const errorDetailsPre = screen.getByText("Error Details", { selector: "pre" });
    expect(errorDetailsPre).toBeInTheDocument();

    // Check that the summary element contains the text "Error Details"
    const summaryElement = screen.getByText("Error Details", { selector: "summary" });
    expect(summaryElement).toBeInTheDocument();

    // Click the close button and verify the modal disappears
    const closeButton = screen.getByRole("button", { name: /×/i });
    fireEvent.click(closeButton);

    expect(errorMessage).not.toBeInTheDocument();
    expect(errorDetailsPre).not.toBeInTheDocument();
  });
});
