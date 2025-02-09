import React from 'react';

const destinations = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?cs=srgb&dl=pexels-asadphoto-457882.jpg&fm=jpg',
    title: 'Tropical Beach',
    description: 'Relax on the sandy beaches with crystal clear waters, golden sands, and gentle ocean waves. Enjoy sunbathing, snorkeling, or simply strolling along the shore. Whether you want a peaceful escape or exciting water sports, tropical beaches offer the perfect blend of serenity and adventure for every traveler.',
  },
  {
    id: 2,
    image: 'https://www.adventuremountaintreks.com/uploads/20240919101748-bannernew%20(1).webp',
    title: 'Mountain Adventure',
    description: 'Explore breathtaking mountain landscapes with towering peaks, fresh air, and scenic trails. Perfect for hiking, camping, and wildlife spotting, these majestic destinations offer thrilling adventures and peaceful retreats. Experience nature at its finest while conquering rugged terrains and enjoying spectacular sunrise and sunset views from the top.',
  },
  {
    id: 3,
    image: 'https://plus.unsplash.com/premium_photo-1681552900042-5b5881fed356?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2l0eSUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D',
    title: 'City Lights',
    description: 'Discover the charm of bustling city life and vibrant nightlife. Walk through neon-lit streets, explore cultural landmarks, and indulge in world-class shopping and dining. Whether it’s a historic capital or a modern metropolis, every city has its own unique energy that captivates travelers from around the world.',
  },
  {
    id: 4,
    image: 'https://media.istockphoto.com/id/474267374/photo/reflections-on-a-lake.jpg?s=612x612&w=0&k=20&c=cqzsN4ldAbOywiM3Bf2lDf0wAsSUgzUHs_1Q-0ncIl8=',
    title: 'Serene Forest',
    description: 'Escape into lush greenery with peaceful forest getaways. Immerse yourself in nature’s tranquility, breathe in fresh air, and listen to the calming sounds of birds and rustling leaves. Whether you prefer hiking, camping, or simply unwinding in a cozy cabin, forests offer a perfect retreat from city life.',
  },
  {
    id: 5,
    image: 'https://www.shutterstock.com/image-photo/amazing-desert-sunset-beautiful-arabian-600nw-1412503796.jpg',
    title: 'Golden Desert',
    description: 'Experience the vast and mesmerizing beauty of endless sand dunes. Take a thrilling camel ride, witness breathtaking sunsets, or enjoy a night under the starry sky. Desert adventures include sandboarding, traditional Bedouin culture, and the incredible silence of nature’s most serene yet extreme landscapes.',
  },
];

const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-200 to-white py-12 px-5">
      <h1 className="text-4xl font-bold mt-24 text-center text-gray-800 mb-8">Explore Destinations</h1>

      {/* Cards Container */}
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        {destinations.map((place, index) => (
          <div
            key={place.id}
            className={`flex flex-col md:flex-row items-center bg-gradient-to-b from-emerald-200 to-white py-12 px-5 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl
              ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`} 
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img src={place.image} alt={place.title} className="w-full h-64 object-cover" />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 p-6 text-center md:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">{place.title}</h2>
              <p className="text-gray-600 mt-2">{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
