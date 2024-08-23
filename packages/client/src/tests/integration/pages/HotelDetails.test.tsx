import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { HotelDetails } from "src/pages"; 
import { fetchHotelByIdApi } from "src/utils/apis";
import { useFetch } from "src/hooks";
import { vi, expect } from "vitest";

vi.mock("src/utils/apis");
vi.mock("src/hooks");

describe("HotelDetails Page", () => {
  const mockHotelData = {
    _id: "1",
    chain_name: "Test Chain",
    hotel_name: "Test Hotel",
    addressline1: "Test Address",
    addressline2: "",
    zipcode: "12345",
    city: "Test City",
    state: "Test State",
    country: "Test Country",
    countryisocode: "TC",
    star_rating: 5,
  };

  beforeEach(() => {
    (fetchHotelByIdApi as jest.Mock).mockReturnValue(
      Promise.resolve(mockHotelData)
    );
    (useFetch as jest.Mock).mockReturnValue({
      data: mockHotelData,
      isLoading: false,
      error: null,
    });
  });

  it("renders hotel details correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/hotels/1"]}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const headerElement = screen.getByRole("heading", { name: "Test Hotel" });
    expect(headerElement).toBeInTheDocument();
  });

  it("displays loading spinner while fetching hotel details", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/hotels/1"]}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("displays error message when fetching hotel details fails", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Fetch error",
    });

    render(
      <MemoryRouter initialEntries={["/hotels/1"]}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const errorElement = screen.getByText("Fetch error");
    expect(errorElement).toBeInTheDocument();
  });

  it("displays NotFound component when no hotel data is returned", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/hotels/1"]}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundElement = screen.getByText("Hotel not found.");
    expect(notFoundElement).toBeInTheDocument();
  });

  it("navigates back to the search page when 'Back to Search' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/hotels/1"]}>
        <Routes>
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/" element={<div>Search Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByText("Back to Search");
    fireEvent.click(backButton);

    const searchPage = screen.getByText("Search Page");
    expect(searchPage).toBeInTheDocument();
  });
});