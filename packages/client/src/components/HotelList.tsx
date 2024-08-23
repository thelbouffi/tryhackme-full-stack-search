import { Accomodation } from "@accommodations/shared-types";
import { Link } from "react-router-dom";

interface HotelListProps {
  hotels: Accomodation["hotels"];
  onRedirect: (type: string, id: string) => void;
}

function HotelList({ hotels, onRedirect }: HotelListProps) {
  return (
    <>
      <h2>Hotels</h2>
      {!hotels.length ? (
        <p>No hotels matched</p>
      ) : (
        hotels.map((hotel) => (
          <li key={hotel._id}>
            <Link
              to={`/hotels/${hotel._id}`}
              className="dropdown-item"
              onClick={(e) => {
                e.preventDefault();
                onRedirect("hotels", hotel._id);
              }}
            >
              <i className="fa fa-building mr-2"></i>
              {hotel.hotel_name}
            </Link>
            <hr className="divider" />
          </li>
        ))
      )}
    </>
  );
}

export default HotelList;
