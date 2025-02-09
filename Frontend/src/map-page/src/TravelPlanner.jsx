import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  StackDivider,
  Flex,
  Image,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import {
  FaTimes,
  FaWalking,
  FaCar,
  FaBus,
  FaHistory,
  FaSearchLocation,
} from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const libraries = ["places"];

const TravelPlanner = ({ googleMapsApiKey }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [travelMode, setTravelMode] = useState("DRIVING");

  const originRef = useRef();
  const destinationRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loadError) return <Text>Error loading Google Maps</Text>;
  if (!isLoaded) return <Text>Loading Google Maps...</Text>;

  async function startJourneyAndSave() {
    const origin = originRef.current?.value;
    const destination = destinationRef.current?.value;

    if (!origin || !destination) {
      setError("Please enter both origin and destination.");
      return;
    }

    try {
      setLoading(true);
      const { google } = window;
      if (!google) throw new Error("Google Maps API not loaded.");

      const userToken = localStorage.getItem("token");
      if (!userToken) {
        setError("User authentication token is missing. Please log in again.");
        return;
      }

      // ✅ Calculate Route
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode[travelMode],
      });

      setDirectionsResponse(results);
      setDistance(results.routes[0]?.legs[0]?.distance?.text || "N/A");
      setDuration(results.routes[0]?.legs[0]?.duration?.text || "N/A");
      setError(null);

      if (map) {
        const bounds = new google.maps.LatLngBounds();
        results.routes[0].legs[0].steps.forEach((step) => {
          bounds.extend(step.start_location);
          bounds.extend(step.end_location);
        });
        map.fitBounds(bounds);
      }

      // ✅ Save to Travel History
      const response = await axios.post(
        "https://travel-hogs.onrender.com/users/postdetails",
        { destination_name: destination },
        {
          headers: {
            Authorization: userToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        fetchHistory();
      }
    } catch (error) {
      setError("Error processing journey: " + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    if (originRef.current) originRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
    setError(null);
  }

  async function fetchHistory() {
    try {
      const userToken = localStorage.getItem("token");
      if (!userToken) {
        setError("User authentication token is missing.");
        return;
      }

      const response = await axios.get(
        "https://travel-hogs.onrender.com/users/getdetails",
        {
          headers: { Authorization: userToken },
        }
      );

      setHistory(response.data);
    } catch (error) {
      setError("Failed to load travel history.");
    }
  }

  function goToNearbyPlaces() {
    const destination = destinationRef.current?.value;
    if (destination) {
      navigate(`/nearby-places?destination=${encodeURIComponent(destination)}`);
    } else {
      setError("Please enter a destination first.");
    }
  }

  return (
    <Flex direction="column" minH="100vh">
      {/* Content Section */}
      <Flex flex="1" mt="60px" pb="60px">
        {/* Sidebar */}
        <VStack
          p={6}
          bg="gray.100"
          shadow="md"
          spacing={5}
          w={{ base: "100%", md: "400px" }}
          align="stretch"
          overflowY="auto"
          divider={<StackDivider borderColor="gray.300" />}
          position="relative"
        >
          <HStack spacing={3} w="full">
            <Autocomplete>
              <Input placeholder="Origin" ref={originRef} bg="white" />
            </Autocomplete>
            <Autocomplete>
              <Input
                placeholder="Destination"
                ref={destinationRef}
                bg="white"
              />
            </Autocomplete>
          </HStack>

          <HStack spacing={3} justify="center">
            <Button
              leftIcon={<FaWalking />}
              onClick={() => setTravelMode("WALKING")}
            >
              Walk
            </Button>
            <Button
              leftIcon={<FaCar />}
              onClick={() => setTravelMode("DRIVING")}
            >
              Car
            </Button>
            <Button
              leftIcon={<FaBus />}
              onClick={() => setTravelMode("TRANSIT")}
            >
              Transit
            </Button>
          </HStack>

          <HStack>
            <Button
              colorScheme="blue"
              onClick={startJourneyAndSave}
              isLoading={loading}
              flex="1"
            >
              Start Journey
            </Button>
            <IconButton
              icon={<FaTimes />}
              onClick={clearRoute}
              colorScheme="red"
            />
          </HStack>

          <Text fontSize="lg">Distance: {distance}</Text>
          <Text fontSize="lg">Duration: {duration}</Text>

          <Button colorScheme="blue" onClick={goToNearbyPlaces}>
            <FaSearchLocation /> Show Nearby Places
          </Button>

          {/* Travel History */}
          <Box>
            <Heading size="md" mb={2}>
              <FaHistory /> Travel History
            </Heading>
            {history.length > 0 ? (
              history.map((trip) => (
                <HStack
                  key={trip._id}
                  bg="white"
                  p={3}
                  borderRadius="lg"
                  shadow="sm"
                  spacing={3}
                >
                  <Image
                    src={trip.destination_img_url}
                    boxSize="50px"
                    borderRadius="md"
                    objectFit="cover"
                  />
                  <Text fontSize="md" fontWeight="bold">
                    {trip.destination_name}
                  </Text>
                </HStack>
              ))
            ) : (
              <Text fontSize="sm" color="gray.500">
                No travel history found.
              </Text>
            )}
          </Box>
        </VStack>

        {/* Map Section */}
        <Box flex="1">
          <GoogleMap
            center={{ lat: 28.6139, lng: 77.209 }}
            zoom={10}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </Box>
      </Flex>
    </Flex>
  );
};

export default TravelPlanner;
