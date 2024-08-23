import { useParams, useNavigate } from "react-router-dom";
import { ErrorDisplay, NotFound } from "src/components";
import { useFetch } from "src/hooks";
import { fetchHotelByIdApi } from "src/utils/apis";
import { Hotel } from "@accommodations/shared-types";

function HotelDetails() {
  const { hotelId } = useParams();

  const { data, isLoading, error } = useFetch<Hotel>(
    hotelId ? fetchHotelByIdApi(hotelId) : ""
  );

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div data-testid="loading-spinner" className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error instanceof Error ? error.message : String(error)}
      />
    );
  }

  if (!data) {
    return <NotFound itemName="Hotel" />;
  }

  return (
    <div id="hotel-details" data-testid="hot-det" className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>{data.hotel_name}</h2>
        </div>
        <div className="card-body">
          <p>
            <strong>Chain Name:</strong> {data.chain_name}
          </p>
          <p>
            <strong>Star Rating:</strong> {data.star_rating} stars
          </p>
          <p>
            <strong>Address:</strong> {data.addressline1}, {data.city},{" "}
            {data.state}, {data.country}
          </p>
          <p>
            <strong>Zip Code:</strong> {data.zipcode}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button id="back-btn" onClick={() => navigate('/')} className="btn btn-primary">
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
