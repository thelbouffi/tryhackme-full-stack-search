import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CountryDetails } from "src/pages"; 
import { fetchCountryByIdApi } from "src/utils/apis"; 
import { useFetch } from "src/hooks";
import { vi, expect } from "vitest";

vi.mock("src/utils/apis");
vi.mock("src/hooks");

describe("CountryDetails Page", () => {
  const mockCountryData = {
    _id: "1",
    country: "Test Country",
    countryisocode: "TC",
  }; 

  beforeEach(() => {
    (fetchCountryByIdApi as jest.Mock).mockReturnValue(
      Promise.resolve(mockCountryData)
    );
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCountryData,
      isLoading: false,
      error: null,
    });
  });

  it("renders country details correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/countries/1"]}>
        <Routes>
          <Route path="/countries/:countryId" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const headerElement = screen.getByRole("heading", { name: "Test Country" });
    expect(headerElement).toBeInTheDocument();
  });

  it("displays loading spinner while fetching country details", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/countries/1"]}>
        <Routes>
          <Route path="/countries/:countryId" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("displays error message when fetching country details fails", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Fetch error",
    });

    render(
      <MemoryRouter initialEntries={["/countries/1"]}>
        <Routes>
          <Route path="/countries/:countryId" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const errorElement = screen.getByText("Fetch error");
    expect(errorElement).toBeInTheDocument();
  });

  it("displays NotFound component when no country data is returned", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/countries/1"]}>
        <Routes>
          <Route path="/countries/:countryId" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundElement = screen.getByText("Country not found.");
    expect(notFoundElement).toBeInTheDocument();
  });

  it("navigates back to the search page when 'Back to Search' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/countries/1"]}>
        <Routes>
          <Route path="/countries/:countryId" element={<CountryDetails />} />
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
