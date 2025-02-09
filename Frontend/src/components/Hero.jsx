import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ hero: { title, subTitle, text, btn1, btn2, img } }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col bg-gradient-to-b from-emerald-200 to-white h-auto w-auto">
        <div className="travigo-container grid items-start justify-items-center">
          <div className="grid items-center justify-items-center mt-36 mb-16 md:mt-28 md:mb-12">
            <h1 className="text-7xl font-bold lg:text-6xl md:text-5xl sm:text-4xl xsm:text-3xl text-black filter drop-shadow-lg">
              {title}
            </h1>
            <h1 className="text-6xl font-bold lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl text-black filter drop-shadow-lg">
              {subTitle}
            </h1>
            <p className="text-base my-5 text-center sm:text-sm">{text}</p>

            <div className="flex items-center justify-center gap-11 sm:gap-3 sm:flex-col sm:w-full">
              <button
                className="button-emrald"
                onClick={() => navigate('/signup')}
              >
                {btn1}
              </button>
              <button
                className="button-light"
                onClick={() => navigate('/explore')} 
              >
                {btn2}
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex items-center justify-items-center">
            <img
              className="h-[85vh] w-[150vh] object-fill lg:h-[75vh] md:h-[57vh] sm:h-[35vh] drop-shadow-lg rounded-xl"
              src={img}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
