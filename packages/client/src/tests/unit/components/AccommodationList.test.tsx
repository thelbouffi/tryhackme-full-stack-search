import { render, screen } from "@testing-library/react";
import AccommodationList from "src/components/AccommodationList";
import { Accomodation, City, Country, Hotel } from "@accommodations/shared-types";
import { vi, expect } from "vitest";

vi.mock("src/components/HotelList", () => ({
  default: ({ hotels }: { hotels: Hotel[] }) => (
    <div data-testid="hotel-list">
      {hotels.map(hotel => (
        <div key={hotel._id}>{hotel.hotel_name}</div>
      ))}
    </div>
  ),
}));

vi.mock("src/components/CountryList", () => ({
  default: ({ countries }: { countries: Country[] }) => (
    <div data-testid="country-list">
      {countries.map(country => (
        <div key={country._id}>{country.country}</div>
      ))}
    </div>
  ),
}));

vi.mock("src/components/CityList", () => ({
  default: ({ cities }: { cities: City[] }) => (
    <div data-testid="city-list">
      {cities.map(city => (
        <div key={city._id}>{city.name}</div>
      ))}
    </div>
  ),
}));

describe("AccommodationList Component", () => {
  const mockData: Accomodation = {
    hotels: [
      {
        _id: "1",
        chain_name: "Chain One",
        hotel_name: "Hotel One",
        addressline1: "Address 1",
        addressline2: "",
        zipcode: "12345",
        city: "City One",
        state: "State One",
        country: "Country One",
        countryisocode: "CO",
        star_rating: 4,
      },
      {
        _id: "2",
        chain_name: "Chain Two",
        hotel_name: "Hotel Two",
        addressline1: "Address 2",
        addressline2: "",
        zipcode: "67890",
        city: "City Two",
        state: "State Two",
        country: "Country Two",
        countryisocode: "CT",
        star_rating: 5,
      },
    ],
    countries: [
      {
        _id: "1",
        country: "Country One",
        countryisocode: "CO",
      },
      {
        _id: "2",
        country: "Country Two",
        countryisocode: "CT",
      },
    ],
    cities: [
      {
        _id: "1",
        name: "City One",
      },
      {
        _id: "2",
        name: "City Two",
      },
    ],
  };

  it("renders HotelList, CountryList, and CityList components with data", () => {
    render(<AccommodationList data={mockData} onRedirect={() => {}} />);

    // Check if HotelList is rendered with hotel names
    const hotelList = screen.getByTestId("hotel-list");
    expect(hotelList).toBeInTheDocument();
    expect(screen.getByText("Hotel One")).toBeInTheDocument();
    expect(screen.getByText("Hotel Two")).toBeInTheDocument();

    // Check if CountryList is rendered with country names
    const countryList = screen.getByTestId("country-list");
    expect(countryList).toBeInTheDocument();
    expect(screen.getByText("Country One")).toBeInTheDocument();
    expect(screen.getByText("Country Two")).toBeInTheDocument();

    // Check if CityList is rendered with city names
    const cityList = screen.getByTestId("city-list");
    expect(cityList).toBeInTheDocument();
    expect(screen.getByText("City One")).toBeInTheDocument();
    expect(screen.getByText("City Two")).toBeInTheDocument();
  });

  it("does not render anything when data is null", () => {
    const { container } = render(<AccommodationList data={null} onRedirect={() => {}} />);

    expect(container.firstChild).toBeNull();
  });
});
