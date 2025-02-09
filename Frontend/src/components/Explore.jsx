import React from 'react'

const Explore = ({placesApi}) => {
  return (
    <>
      <div className='relative my-7 md:mt-3'>
        <div className='travigo-container'>
          <div className='flex justify-center text-center mb-11 md:mb-7'>
            <h1 className='travigo-text'>Explore the Beauty of the India</h1>
          </div>
          <div className='grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5'>
            {placesApi?.map((val, i) => (
              <div className='flex items-center gap-5 sm:gap-3 rounded-lg hover:bg-emerald-300 transition-all duration-300 cursor-pointer hover:scale-105' key={i}>
                <div className='flex items-center'>
                  <img className='w-20 h-20 sm:w-16 sm:h-16 rounded-lg filter drop-shadow-lg' src={val.placeImg} alt="" />
                </div>
                <div className='flex items-start flex-col text-slate-900'>
                  <h1 className='text-lg sm:text-sm font-bold'>{val.location}</h1>
                  <p className='font-normal lg:text-sm text-base'>{val.distance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore