import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, 
      retryDelay: 500, 
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<SearchAccommodation />} />
          <Route path="/hotels/:hotelId" element={<HotelDetails />} />
          <Route path="/countries/:countryId" element={<CountryDetails />} />
          <Route path="/cities/:cityId" element={<CityDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
