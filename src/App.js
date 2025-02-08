import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TravelPlanner from "./TravelPlanner";
import NearbyPlacesPage from "./NearbyPlacesPage"; // Component for the Nearby Places page

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TravelPlanner
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            />
          }
        />
        <Route path="/nearby-places" element={<NearbyPlacesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
