import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { NavBar, Footer } from './components';
import { navlinks, footerAPI } from './data/traveldata';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ExplorePage from './pages/ExplorePage.jsx';  

const App = () => {
  const location = useLocation();

  // Force re-render on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!hideNavAndFooter && <NavBar navlinks={navlinks} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<ExplorePage />} />  
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      {!hideNavAndFooter && <Footer footerAPI={footerAPI} />}
    </>
  );
};

export default App;
