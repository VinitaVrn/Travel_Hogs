import React from "react";
import { useLocation } from "react-router-dom";
import NearbyPlaces from "./NearbyPlaces";
import { Box, Text } from "@chakra-ui/react";

const NearbyPlacesPage = () => {
  const location = useLocation();
  const { latitude, longitude } = location.state || {};

  if (!latitude || !longitude) {
    return (
      <Text>
        Error: Coordinates are missing. Please select a destination first.
      </Text>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Nearby Places
      </Text>
      <NearbyPlaces latitude={latitude} longitude={longitude} />
    </Box>
  );
};

export default NearbyPlacesPage;
