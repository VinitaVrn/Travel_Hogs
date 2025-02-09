import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ footerAPI: { titles, links, sociallinks } }) => {
  return (
    <>
      <footer className="bg-gradient-to-b from-emerald-400 to-emerald-200 pt-24 pb-7">
        <div className="grid items-center grid-cols-3 justify-items-center gap-6">
          {/* Titles */}
          {titles?.map((val, i) => (
            <div className="grid items-center justify-items-center" key={i}>
              <h1 className="text-xl lg:text-base font-semibold uppercase">{val.title}</h1>
            </div>
          ))}

          {/* Links */}
          {links?.map((linkGroup, i) => (
            <ul key={i} className="grid items-center justify-items-center gap-2">
              {linkGroup?.map((val, j) => (
                <li key={j} className="font-medium text-sm sm:text-xs hover:text-blue-600 transition">
                  <Link to={val.url}>{val.link}</Link>  {/* ✅ Uses `url` directly from `footerAPI` */}
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Divider */}
        <div className="w-7/12 lg:w-[95vw] m-auto mt-9">
          <div className="h-[0.1vh] bg-black/30 my-7 md:my-5"></div>

          {/* Footer Bottom */}
          <div className="flex items-center justify-between px-7 md:px-0 md:gap-5 md:flex-col-reverse">
            <p className="text-sm md:text-center">
              Copyright <sup className="text-base font-bold">&copy;</sup> All Reserved Rights 2025{' '}
              <span className="font-semibold">Travel Hogs</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {sociallinks?.map((val, i) => (
                <a key={i} href={val.link} target="_blank" rel="noopener noreferrer">
                  <img src={val.icon} alt="social/icons" className="w-5 h-5 hover:scale-110 transition" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
