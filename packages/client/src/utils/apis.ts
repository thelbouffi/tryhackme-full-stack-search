import { API_URL } from "./config";

export const fetchAccommodationsApi = (query: string | undefined) => {
  if (!query) {
    throw new Error('Accommodation query is required');
  }
  return `${API_URL}/hotels/search?q=${query}`;
};

export const fetchHotelByIdApi = (id: string | undefined) => {
  if (!id) {
    throw new Error('Hotel ID is required');
  }
  return `${API_URL}/hotels/${id}`;
};

export const fetchCountryByIdApi = (id: string | undefined) => {
  if (!id) {
    throw new Error('Country ID is required');
  }
  return `${API_URL}/countries/${id}`;
};

export const fetchCityByIdApi = (id: string | undefined) => {
  if (!id) {
    throw new Error('City ID is required');
  }
  return `${API_URL}/cities/${id}`;
};
