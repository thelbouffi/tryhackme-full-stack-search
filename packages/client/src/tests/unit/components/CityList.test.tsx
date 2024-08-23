import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CityList from "src/components/CityList";
import { vi, expect } from "vitest";

describe("CityList Component", () => {
  const cities = [
    {
      _id: "1",
      name: "City One",
    },
    {
      _id: "2",
      name: "City Two",
    },
  ];

  it("renders city names", () => {
    render(
      <MemoryRouter>
        <CityList cities={cities} onRedirect={() => {}} />
      </MemoryRouter>
    );
    const cityOne = screen.getByText("City One");
    const cityTwo = screen.getByText("City Two");
    expect(cityOne).toBeInTheDocument();
    expect(cityTwo).toBeInTheDocument();
  });

  it("calls `onRedirect` with correct arguments when a city is clicked", () => {
    const onRedirectMock = vi.fn();
    render(
      <MemoryRouter>
        <CityList cities={cities} onRedirect={onRedirectMock} />
      </MemoryRouter>
    );

    const cityOne = screen.getByText("City One");
    fireEvent.click(cityOne);

    expect(onRedirectMock).toHaveBeenCalledWith("cities", "1");
  });
});