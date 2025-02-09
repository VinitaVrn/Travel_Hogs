import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar, Footer } from "./components";
import { navlinks, footerAPI } from "./data/traveldata";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExplorePage from "./pages/ExplorePage";
import TravelPlanner from "./map-page/src/TravelPlanner"; // Fixed import
import NearbyPlacesPage from "./map-page/src/NearbyPlacesPage";

const App = () => {
  const location = useLocation();
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  console.log("API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide Navbar and Footer on Login & Signup pages
  const shouldHideNavAndFooter = ["/login", "/signup"].includes(
    location.pathname
  );

  return (
    <>
      {!shouldHideNavAndFooter && <NavBar navlinks={navlinks} />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/travel-planner"
          element={<TravelPlanner googleMapsApiKey={googleMapsApiKey} />}
        />
        <Route path="/nearby-places" element={<NearbyPlacesPage />} />
      </Routes>

      {!shouldHideNavAndFooter && <Footer footerAPI={footerAPI} />}
    </>
  );
};

export default App;
