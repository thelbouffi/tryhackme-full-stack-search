import { useParams, useNavigate } from "react-router-dom";
import { ErrorDisplay, NotFound } from "src/components";
import { useFetch } from "src/hooks";
import { fetchCountryByIdApi } from "src/utils/apis";
import { Country } from "@accommodations/shared-types";

function CountryDetails() {
  const { countryId } = useParams();

  const { data, isLoading, error } = useFetch<Country>(
    countryId ? fetchCountryByIdApi(countryId) : ""
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
    return <NotFound itemName="Country" />;
  }

  return (
    <div data-testid="country-details" className="card-container">
      <div className="card">
        <div className="card-header">
          <h2>{data.country}</h2>
        </div>
        <div className="card-body">
          <p>
            <strong>Country ISO Code:</strong> {data.countryisocode}
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

export default CountryDetails;
