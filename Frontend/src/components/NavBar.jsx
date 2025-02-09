import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import menu from '../assets/images/menu.svg';
import PopupNav from './PopupNav';

const NavBar = ({ navlinks }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [navState, setNavState] = useState(false);

  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  const onNavScroll = () => {
    if (window.scrollY > 90) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onNavScroll);
    return () => window.removeEventListener('scroll', onNavScroll);
  }, []);

  return (
    <>
      <header className={`nav-default ${navState && 'nav-sticky'}`}>
        <nav className="flex items-center justify-between travigo-container">
          <NavLink to="/" className="flex items-center">
            <img src={logo} alt="logo" className="w-22 h-9 object-contain" />
          </NavLink>
          <ul className="flex items-center gap-7 lg:hidden">
          {navlinks?.map((val, i) => (
  <li key={i} className="text-lg text-slate-900">
    <NavLink 
      to={val.path} 
      className={({ isActive }) => 
        `hover:text-blue-500 ${isActive ? 'text-black-600 font-semibold' : ''}`
      }
    >
      {val.label}
    </NavLink>
  </li>
))}
          </ul>
          <ul className="flex items-center lg:hidden">
            <li>
              <NavLink to="/signup">
                <button type="button" className="button-emrald text-base px-0">
                  Sign Up
                </button>
              </NavLink>
            </li>
          </ul>
          <ul className="hidden lg:flex items-center">
            <li>
              <button
                type="button"
                onClick={toggleMenu}
                className="flex items-center justify-center transition-all duration-200 active:scale-50"
              >
                <img src={menu} alt="" className="object-cover shadow-sm filter" />
              </button>
            </li>
          </ul>
          {menuIsOpen ? <PopupNav navlinks={navlinks} /> : ''}
        </nav>
      </header>
    </>
  );
};

export default NavBar;
