import { ApiResponse } from "./ApiResponse";
import { City } from "./City";
import { Country } from "./Country";
import { Hotel } from "./Hotel";

export type Accomodation = {
  hotels: Hotel[];
  countries: Country[];
  cities: City[];
};

export type SearchResponse = ApiResponse<Accomodation>;
