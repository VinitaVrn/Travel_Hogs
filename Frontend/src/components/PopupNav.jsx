import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const PopupNav = ({ navlinks, closeMenu }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-14 right-5 bg-white bg-opacity-90 z-50 backdrop-filter backdrop-blur-md rounded-lg py-5 px-6 flex items-center justify-center transition-transform duration-300 shadow-lg">
      <ul className="flex flex-col items-start gap-4">
        {navlinks?.map((val, i) => (
          <li key={i} className="w-full">
            <NavLink
              to={val.path}
              className="block px-4 py-2 text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
              onClick={closeMenu} 
            >
              {val.link}
            </NavLink>
          </li>
        ))}


        <li className="w-full">
          <button
            type="button"
            className="w-full px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              navigate('/signup');
              closeMenu(); 
            }}
          >
            Join Us
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PopupNav;
