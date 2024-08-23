import { Accomodation } from "@accommodations/shared-types";
import HotelList from "./HotelList";
import CountryList from "./CountryList";
import CityList from "./CityList";

interface AccommodationListProps {
  data: Accomodation | null;
  onRedirect: (type: string, id: string) => void;
}

function AccommodationList({ data, onRedirect }: AccommodationListProps) {
  if (!data) return null;

  return (
    <div className="search-dropdown-menu dropdown-menu w-100 show p-2">
      <HotelList hotels={data.hotels} onRedirect={onRedirect} />
      <CountryList countries={data.countries} onRedirect={onRedirect} />
      <CityList cities={data.cities} onRedirect={onRedirect} />
    </div>
  );
}

export default AccommodationList;
