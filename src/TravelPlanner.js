import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  Alert,
  AlertIcon,
  StackDivider,
} from "@chakra-ui/react";
import { FaTimes, FaWalking, FaCar, FaBus } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import NearbyPlaces from "./NearbyPlaces";

const TravelPlanner = ({ googleMapsApiKey }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const originRef = useRef();
  const destinationRef = useRef();
  const [travelMode, setTravelMode] = useState("DRIVING");
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [destinationHistory, setDestinationHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch destination history from the backend when the component mounts
    fetch("your-backend-api")
      .then((response) => response.json())
      .then((data) => {
        setDestinationHistory(data);
      })
      .catch((error) => {
        console.error("Error fetching destination history:", error);
      });
  }, []);

  if (!isLoaded) return <Text>Loading...</Text>;

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) {
      setError("Please enter both origin and destination.");
      return;
    }
    try {
      setLoading(true);
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: window.google.maps.TravelMode[travelMode],
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
      setError(null);

      // Extract destination coordinates
      const destinationLocation = results.routes[0].legs[0].end_location;
      setDestinationCoords({
        latitude: destinationLocation.lat(),
        longitude: destinationLocation.lng(),
      });

      // Store the destination to the backend
      const newDestination = {
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        distance: results.routes[0].legs[0].distance.text,
        duration: results.routes[0].legs[0].duration.text,
      };
      fetch("your-backend-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDestination),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the local history after a successful save
          setDestinationHistory((prev) => [...prev, data]);
        })
        .catch((error) => {
          console.error("Error saving destination:", error);
        });

      // Center the map on the route
      const bounds = new window.google.maps.LatLngBounds();
      results.routes[0].overview_path.forEach((p) => {
        bounds.extend(p);
      });
      map.fitBounds(bounds);
    } catch (error) {
      setError("Error calculating route: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
    setError(null);
    setDestinationCoords(null);
  }

  const goToNearbyPlaces = () => {
    if (destinationCoords) {
      navigate("/nearby-places", {
        state: {
          latitude: destinationCoords.latitude,
          longitude: destinationCoords.longitude,
        },
      });
    } else {
      setError(
        "No destination coordinates available. Calculate a route first."
      );
    }
  };

  return (
    <HStack spacing={4} align="start" h="100vh" w="100vw">
      <VStack
        p={4}
        borderRadius="lg"
        bg="white"
        shadow="md"
        spacing={4}
        w={{ base: "full", md: "400px" }}
        align="stretch"
        overflowY="auto"
        divider={<StackDivider borderColor="gray.200" />}
      >
        <HStack spacing={3}>
          <Autocomplete>
            <Input placeholder="Origin" ref={originRef} />
          </Autocomplete>
          <Autocomplete>
            <Input placeholder="Destination" ref={destinationRef} />
          </Autocomplete>
        </HStack>
        <HStack spacing={3}>
          <Button
            leftIcon={<FaWalking />}
            onClick={() => setTravelMode("WALKING")}
            colorScheme={travelMode === "WALKING" ? "blue" : "gray"}
          >
            Walking
          </Button>
          <Button
            leftIcon={<FaCar />}
            onClick={() => setTravelMode("DRIVING")}
            colorScheme={travelMode === "DRIVING" ? "blue" : "gray"}
          >
            Car
          </Button>
          <Button
            leftIcon={<FaBus />}
            onClick={() => setTravelMode("TRANSIT")}
            colorScheme={travelMode === "TRANSIT" ? "blue" : "gray"}
          >
            Public Transport
          </Button>
        </HStack>
        <HStack spacing={3}>
          <Button
            colorScheme="blue"
            onClick={calculateRoute}
            isLoading={loading}
            w="full"
          >
            Start Journey
          </Button>
          <IconButton
            icon={<FaTimes />}
            onClick={clearRoute}
            colorScheme="red"
            aria-label="Clear route"
          />
        </HStack>
        <Text fontSize="lg" fontWeight="bold">
          Distance: {distance}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          Duration: {duration}
        </Text>

        <Button colorScheme="blue" onClick={goToNearbyPlaces}>
          Show Nearby Places
        </Button>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Display destination history */}
        <VStack spacing={3} align="stretch" mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Destination History:
          </Text>
          {destinationHistory.map((item, index) => (
            <Box
              key={index}
              p={3}
              shadow="xs"
              borderWidth="1px"
              borderRadius="md"
            >
              <Text>
                <strong>Origin:</strong> {item.origin}
              </Text>
              <Text>
                <strong>Destination:</strong> {item.destination}
              </Text>
              <Text>
                <strong>Distance:</strong> {item.distance}
              </Text>
              <Text>
                <strong>Duration:</strong> {item.duration}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>

      <Box flex="1" h="100%" position="relative">
        <GoogleMap
          center={{ lat: 20.5937, lng: 78.9629 }} // Center map to India
          zoom={5}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
              position: window.google.maps.ControlPosition.TOP_RIGHT,
            },
            zoomControl: true,
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.TOP_RIGHT,
            },
          }}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
    </HStack>
  );
};

export default TravelPlanner;
