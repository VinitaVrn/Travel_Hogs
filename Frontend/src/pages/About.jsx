import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gradient-to-b from-emerald-200 to-white h-auto w-auto p-5">
      <h1 className="text-3xl font-bold mb-4 mt-24">About Us</h1>
      <p className="text-lg text-gray-700 text-center max-w-2xl mb-6">
        Welcome to our travel website! We aim to provide the best destinations for your next adventure. Whether you're looking for exotic beaches, historical landmarks, or breathtaking landscapes, we have the perfect travel guide for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <img src="https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/003/186/343/datas/original.jpg" alt="Nature Escape" className="rounded-lg shadow-md" />
      </div>
      <p className="text-lg text-gray-700 text-center max-w-2xl mt-6">
        Our team of travel enthusiasts curates the best experiences, ensuring that your journeys are memorable and hassle-free. Let us be your guide to exploring the world!
      </p>
    </div>
  );
};

export default About;
