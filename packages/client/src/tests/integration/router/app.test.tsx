import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  CityDetails,
  CountryDetails,
  HotelDetails,
  SearchAccommodation,
} from "src/pages";

import {
  fetchCityByIdApi,
  fetchCountryByIdApi,
  fetchHotelByIdApi,
} from "src/utils/apis";
import { useFetch } from "src/hooks";
import { vi, expect, beforeAll, describe, it } from "vitest";

vi.mock("src/utils/apis");
vi.mock("src/hooks");

describe("App Routing", () => {
  describe("App Routing - Route to Home Page", () => {
    beforeAll(() => {
      (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      });
    });

    it("renders SearchAccommodation component at `/` route", () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <SearchAccommodation />
        </MemoryRouter>
      );

      const inputElement = screen.getByPlaceholderText(
        "Search accommodation..."
      );
      expect(inputElement).toBeInTheDocument();
    });
  });

  describe("App Routing - Route to Hotel Page", () => {
    const mockHotelData = {
      _id: "1",
      hotel_name: "Hotel One",
      chain_name: "Chain Test",
      addressline1: "Address Test",
      addressline2: "",
      zipcode: "111111",
      city: "City Test",
      state: "State Test",
      country: "Country Test",
      countryisocode: "TS",
      star_rating: 5,
    };

    beforeAll(() => {
      (fetchHotelByIdApi as ReturnType<typeof vi.fn>).mockReturnValue(
        Promise.resolve(mockHotelData)
      );
      (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
        data: mockHotelData,
        isLoading: false,
        error: null,
      });
    });

    it("renders HotelDetails component at `/hotels/:hotelId` route", () => {
      render(
        <MemoryRouter initialEntries={["/hotels/1"]}>
          <HotelDetails />
        </MemoryRouter>
      );

      const hotelDetails = screen.getByTestId("hot-det");
      expect(hotelDetails).toBeInTheDocument();
    });
  });

  describe("App Routing - Route to Country Page", () => {
    const mockCountryData = {
      _id: "2",
      country: "Country One",
      code: "CO",
    };

    beforeAll(() => {
      (fetchCountryByIdApi as ReturnType<typeof vi.fn>).mockReturnValue(
        Promise.resolve(mockCountryData)
      );
      (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
        data: mockCountryData,
        isLoading: false,
        error: null,
      });
    });

    it("renders CountryDetails component at `/countries/:countryId` route", () => {
      render(
        <MemoryRouter initialEntries={["/countries/2"]}>
          <CountryDetails />
        </MemoryRouter>
      );

      const countryDetails = screen.getByTestId("country-details");
      expect(countryDetails).toBeInTheDocument();
    });
  });

  describe("App Routing - Route to City Page", () => {
    const mockCityData = {
      _id: "3",
      name: "City One",
    };

    beforeAll(() => {
      (fetchCityByIdApi as ReturnType<typeof vi.fn>).mockReturnValue(
        Promise.resolve(mockCityData)
      );
      (useFetch as ReturnType<typeof vi.fn>).mockReturnValue({
        data: mockCityData,
        isLoading: false,
        error: null,
      });
    });

    it("renders CityDetails component at `/cities/:cityId` route", () => {
      render(
        <MemoryRouter initialEntries={["/cities/3"]}>
          <CityDetails />
        </MemoryRouter>
      );

      const cityDetails = screen.getByTestId("city-details");
      expect(cityDetails).toBeInTheDocument();
    });
  });

  describe("App Routing - Route to * paths", () => {
    it("redirects to `/` on unknown route", () => {
      render(
        <MemoryRouter initialEntries={["/unknown"]}>
          <SearchAccommodation />
        </MemoryRouter>
      );

      const inputElement = screen.getByPlaceholderText(
        "Search accommodation..."
      );
      expect(inputElement).toBeInTheDocument();
    });
  });
});
