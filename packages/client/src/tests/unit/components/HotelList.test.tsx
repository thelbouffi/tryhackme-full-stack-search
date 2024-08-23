import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HotelList from "src/components/HotelList";
import { vi, expect } from "vitest";

describe("HotelList Component", () => {
  const hotels = [
    {
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
    },
    {
      _id: "2",
      hotel_name: "Hotel Two",
      chain_name: "Chain Test",
      addressline1: "Address Test",
      addressline2: "",
      zipcode: "111111",
      city: "City Test",
      state: "State Test",
      country: "Country Test",
      countryisocode: "TS",
      star_rating: 5,
    },
  ];

  it("renders hotel names", () => {
    // MemoryRouter bcz HotelList has Link of react-router-dom
    render(
      <MemoryRouter> 
        <HotelList hotels={hotels} onRedirect={() => {}} />
      </MemoryRouter>
    );
    const hotelOne = screen.getByText("Hotel One");
    const hotelTwo = screen.getByText("Hotel Two");
    expect(hotelOne).toBeInTheDocument();
    expect(hotelTwo).toBeInTheDocument();
  });

  it("calls `onRedirect` with correct arguments when a hotel is clicked", () => {
    const onRedirectMock = vi.fn();
    render(
      <MemoryRouter>
        <HotelList hotels={hotels} onRedirect={onRedirectMock} />
      </MemoryRouter>
    );

    const hotelOne = screen.getByText("Hotel One");
    fireEvent.click(hotelOne);

    expect(onRedirectMock).toHaveBeenCalledWith("hotels", "1");
  });
});
