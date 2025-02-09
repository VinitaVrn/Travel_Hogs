import React from 'react';
import { Hero, Memory, Explore } from '../components';
import { hero, memory, placesAPI } from '../data/traveldata';

const Home = () => {
  return (
    <>
      <Hero hero={hero} />
      <Memory memory={memory} />
      <Explore placesApi={placesAPI} />
    </>
  );
};

export default Home;
