import { useParams, useNavigate } from "react-router-dom";
import { ErrorDisplay, NotFound } from "src/components";
import { useFetch } from "src/hooks";
import { fetchCityByIdApi } from "src/utils/apis";
import { City } from "@accommodations/shared-types";

function CityDetails() {
  const { cityId } = useParams();

  const { data, isLoading, error } = useFetch<City>(
    cityId ? fetchCityByIdApi(cityId) : ""
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
    return <NotFound itemName="City" />;
  }

  
  return (
    <div data-testid="city-details" className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>{data.name}</h2>
        </div>
        <div className="card-body">
          <p>
            <strong>City Name:</strong> {data.name}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-end">
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default CityDetails;
