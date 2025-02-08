import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 28.6448, // Example: New Delhi, change as per your needs
  lng: 77.216721, // Example: New Delhi, change as per your needs
};

const TravelMap = () => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    // Directions logic
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            mapTypeControl: true, // Enable map/satellite toggle
            mapTypeControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_TOP, // Move the map and satellite controls to the top-right
            },
            zoomControl: true, // Enable zoom controls
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_TOP, // Move zoom controls to the top-right
            },
            streetViewControl: false, // Disable street view control
            fullscreenControl: false, // Optionally, you can disable fullscreen control too
            // Disable transit and travel modes if you have any code for them (removing the directions modes)
          }}
        >
          {/* Your DirectionsRenderer here if needed */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </Box>
  );
};

export default TravelMap;
