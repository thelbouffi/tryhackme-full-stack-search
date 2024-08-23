import { Accomodation } from "@accommodations/shared-types";
import { Link } from "react-router-dom";

interface CountryListProps {
  countries: Accomodation["countries"];
  onRedirect: (type: string, id: string) => void;
}

function CountryList({ countries, onRedirect }: CountryListProps) {

  return (
    <>
      <h2>Countries</h2>
      {!countries.length ? (
        <p>No countries matched</p>
      ) : (
        countries.map((country) => (
          <li key={country._id}>
            <Link
              to={`/countries/${country._id}`}
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                onRedirect("countries", country._id);
              }}
            >
              <i className="fa fa-building mr-2"></i>
              {country.country}
            </Link>
            <hr className="divider" />
          </li>
        ))
      )}
    </>
  );
}

export default CountryList;
