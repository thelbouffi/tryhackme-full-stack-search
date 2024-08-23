import { render, screen, fireEvent } from "@testing-library/react";
import SearchInput from "src/components/SearchInput";
import { vi, expect } from "vitest";

describe("SearchInput Component", () => {
  it("renders input field with placeholder", () => {
    render(<SearchInput inputValue="" showClearBtn={false} onInputChange={() => {}} onClear={() => {}} />);
    const inputElement = screen.getByPlaceholderText("Search accommodation...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls `onInputChange` when input value changes", () => {
    const onInputChangeMock = vi.fn(); 
    render(<SearchInput inputValue="" showClearBtn={false} onInputChange={onInputChangeMock} onClear={() => {}} />);
    
    const inputElement = screen.getByPlaceholderText("Search accommodation...");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    
    expect(onInputChangeMock).toHaveBeenCalledTimes(1);
  });

  it("shows clear button when `showClearBtn` is true", () => {
    render(<SearchInput inputValue="test" showClearBtn={true} onInputChange={() => {}} onClear={() => {}} />);
    const clearButton = screen.getByRole("button");
    expect(clearButton).toBeInTheDocument();
  });

  it("calls `onClear` when clear button is clicked", () => {
    const onClearMock = vi.fn(); 
    render(<SearchInput inputValue="test" showClearBtn={true} onInputChange={() => {}} onClear={onClearMock} />);
    
    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);
    
    expect(onClearMock).toHaveBeenCalledTimes(1);
  });
});
