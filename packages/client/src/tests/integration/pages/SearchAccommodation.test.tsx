import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchAccommodation from "src/pages/Home";
import { fetchAccommodationsApi } from "src/utils/apis";
import { useFetch } from "src/hooks";
import { vi, expect, beforeEach, describe, it } from "vitest";

vi.mock("src/utils/apis");
vi.mock("src/hooks");

describe("SearchAccommodation Page", () => {
  const mockData = {
    hotels: [{ _id: "1", hotel_name: "Hotel One" }],
    countries: [],
    cities: [],
  };

  beforeEach(() => {
    (fetchAccommodationsApi as ReturnType<typeof vi.fn>).mockReturnValue(Promise.resolve(mockData));
    (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({ data: mockData, isLoading: false, error: null });
  });

  it("renders search input and results", () => {
    render(
      <MemoryRouter>
        <SearchAccommodation />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText("Search accommodation...");
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: "Hotel" } });

    const hotelOne = screen.getByText("Hotel One");
    expect(hotelOne).toBeInTheDocument();
  });

  it("displays loading spinner while fetching data", () => {
    (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({ data: null, isLoading: true, error: null });
    
    render(
      <MemoryRouter>
        <SearchAccommodation />
      </MemoryRouter>
    );

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("displays error message when fetch fails", () => {
    (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({ data: null, isLoading: false, error: "Fetch error" });

    render(
      <MemoryRouter>
        <SearchAccommodation />
      </MemoryRouter>
    );

    const errorElement = screen.getByText("Fetch error");
    expect(errorElement).toBeInTheDocument();
  });
});
