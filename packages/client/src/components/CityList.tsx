import { Accomodation } from "@accommodations/shared-types";
import { Link } from "react-router-dom";

interface CityListProps {
  cities: Accomodation["cities"];
  onRedirect: (type: string, id: string) => void;
}

function CityList({ cities, onRedirect }: CityListProps) {

  return (
    <>
      <h2>Cities</h2>
      {!cities.length ? (
        <p>No cities matched</p>
      ) : (
        cities.map((city) => (
          <li key={city._id}>
            <Link
              to={`/cities/${city._id}`}
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                onRedirect("cities", city._id);
              }}
            >
              <i className="fa fa-building mr-2"></i>
              {city.name}
            </Link>
            <hr className="divider" />
          </li>
        ))
      )}
    </>
  );
}

export default CityList;
