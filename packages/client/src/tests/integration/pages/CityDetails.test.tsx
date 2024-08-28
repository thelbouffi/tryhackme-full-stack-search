import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CityDetails } from "src/pages";
import { fetchCityByIdApi } from "src/utils/apis";
import { useFetch } from "src/hooks";
import { vi, expect, beforeEach, describe, it } from "vitest";

// Mocking modules with Vitest
vi.mock("src/utils/apis");
vi.mock("src/hooks");

describe("CityDetails Page", () => {
  const mockCityData = { _id: "1", name: "Test City" };

  beforeEach(() => {
    (fetchCityByIdApi as ReturnType<typeof vi.fn>).mockReturnValue(
      Promise.resolve(mockCityData)
    );
    (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockCityData,
      isLoading: false,
      error: null,
    });
  });

  it("renders city details correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/cities/1"]}>
        <Routes>
          <Route path="/cities/:cityId" element={<CityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const cityNameElements = screen.getAllByText("Test City");
    expect(cityNameElements).toHaveLength(2); // Expecting 2 occurrences

    const headerElement = screen.getByRole("heading", { name: "Test City" });
    expect(headerElement).toBeInTheDocument();
  });

  it("displays loading spinner while fetching city details", () => {
    (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/cities/1"]}>
        <Routes>
          <Route path="/cities/:cityId" element={<CityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const spinner = screen.getByTestId("loading-spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("displays error message when fetching city details fails", () => {
    (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Fetch error",
    });

    render(
      <MemoryRouter initialEntries={["/cities/1"]}>
        <Routes>
          <Route path="/cities/:cityId" element={<CityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const errorElement = screen.getByText("Fetch error");
    expect(errorElement).toBeInTheDocument();
  });

  it("displays NotFound component when no city data is returned", () => {
    (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter initialEntries={["/cities/1"]}>
        <Routes>
          <Route path="/cities/:cityId" element={<CityDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const notFoundElement = screen.getByText("City not found.");
    expect(notFoundElement).toBeInTheDocument();
  });

  it("navigates back to the search page when 'Back to Search' button is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/cities/1"]}>
        <Routes>
          <Route path="/cities/:cityId" element={<CityDetails />} />
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
