import React from 'react'

const Memory = ({memory: {title, subtitle, text, img, experience}}) => {
  return (
    <>
      <div className='relative my-16 md:mb-7 xl:px-30'>
        <div className='travigo-container flex items-center justify-between gap-16 xl:gap-9 lg:flex-col-reverse'>
          <div className='flex items-center justify-start lg:justify-center w-full max-w-lg'>
            <img src={img} alt="" className='w-auto h-[55vh] object-fill filter drop-shadow-md' />
          </div>
          <div className='grid items-center w-full max-w-2xl lg:text-center'>
            <h1 className='travigo-text'>{title}</h1>
            <h1 className='travigo-text'>{subtitle}</h1>
            <p className='text-base my-5 sm:text-sm'>{text}</p>
            <div className='grid grid-cols-3 gap-7 md:gap-3'>
              {experience?.map((val, i) => (
                <div className='bg-gradient-to-b from-emerald-500 to-green-200 rounded-lg h-auto w-auto flex items-center justify-center flex-col text-slate-900 text-center py-7 px-5 xl:p-5 cursor-pointer hover:scale-105 transition-all duration-300 filter drop-shadow-sm' key={i}>
                  <h1 className='text-3xl xl:text-2xl sm:text-xl font-bold'>{val.number}</h1>
                  <p className='font-medium text-lg xl:text-base sm:text-sm xsm:text-xs'>{val.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Memory