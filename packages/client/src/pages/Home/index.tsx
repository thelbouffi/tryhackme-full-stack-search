import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Accomodation } from "@accommodations/shared-types";
import { fetchAccommodationsApi } from "src/utils/apis";
import { SearchInput, AccommodationList, ErrorDisplay } from "src/components";
import { useDebounce, useFetch } from "src/hooks";

function SearchAccommodation() {
  const [inputValue, setInputValue] = useState("");
  const [showClearBtn, setShowClearBtn] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const debouncedQuery = useDebounce(inputValue, 500); // Debounce the input value with a 500ms delay

  const { data, isLoading, error } = useFetch<Accomodation>(
    showResults && debouncedQuery ? fetchAccommodationsApi(debouncedQuery) : ""
  );

  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setShowClearBtn(value !== "");
    setShowResults(value !== "");
  };

  const clearFetchedData = () => {
    setInputValue("");
    setShowClearBtn(false);
    setShowResults(false);
  };

  const handleRedirect = (type: string, id: string) => {
    navigate(`/${type}/${id}`);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-6">
            <div className="dropdown search-spinner-container">
              <SearchInput
                inputValue={inputValue}
                showClearBtn={showClearBtn}
                onInputChange={handleInputChange}
                onClear={clearFetchedData}
              />
              {isLoading && <div data-testid="loading-spinner" className="search-spinner"></div>}
              {error && (
                <ErrorDisplay
                  message={
                    error instanceof Error ? error.message : String(error)
                  }
                  onClose={clearFetchedData}
                />
              )}
              {showResults && data && !isLoading && (
                <AccommodationList data={data} onRedirect={handleRedirect} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchAccommodation;
