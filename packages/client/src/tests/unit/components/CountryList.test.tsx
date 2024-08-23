import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CountryList from "src/components/CountryList";
import { vi, expect } from "vitest";

describe("CountryList Component", () => {
  const countries = [
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
  ];

  it("renders country names", () => {
    render(
      <MemoryRouter>
        <CountryList countries={countries} onRedirect={() => {}} />
      </MemoryRouter>
    );
    const countryOne = screen.getByText("Country One");
    const countryTwo = screen.getByText("Country Two");
    expect(countryOne).toBeInTheDocument();
    expect(countryTwo).toBeInTheDocument();
  });

  it("calls `onRedirect` with correct arguments when a country is clicked", () => {
    const onRedirectMock = vi.fn();
    render(
      <MemoryRouter>
        <CountryList countries={countries} onRedirect={onRedirectMock} />
      </MemoryRouter>
    );

    const countryOne = screen.getByText("Country One");
    fireEvent.click(countryOne);

    expect(onRedirectMock).toHaveBeenCalledWith("countries", "1"); // Arguments adjusted
  });
});