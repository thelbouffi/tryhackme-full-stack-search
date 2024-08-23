import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  CityDetails,
  CountryDetails,
  HotelDetails,
  SearchAccommodation,
} from "src/pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchAccommodation />} />
        <Route path="/hotels/:hotelId" element={<HotelDetails />} />
        <Route path="/countries/:countryId" element={<CountryDetails />} />
        <Route path="/cities/:cityId" element={<CityDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
