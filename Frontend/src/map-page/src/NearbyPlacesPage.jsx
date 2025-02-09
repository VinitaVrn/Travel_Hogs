import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Image,
  HStack,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const NearbyPlacesPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultDestination = queryParams.get("destination") || "";

  const extractCityName = (place) => place.split(",")[0].trim();

  const [place, setPlace] = useState(extractCityName(defaultDestination));
  const [destinationData, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDestinationData = useCallback(async (destination) => {
    try {
      setLoading(true);
      setError("");
      setDestinationData(null);

      const city = extractCityName(destination);
      const response = await fetch(
        `https://travel-hogs.onrender.com/destination/alldetails/${city}`
      );

      if (!response.ok) throw new Error("Failed to fetch destination data");

      const data = await response.json();
      setDestinationData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (place) fetchDestinationData(place);
  }, [place, fetchDestinationData]);

  return (
    <Box
      textAlign="center"
      p={6}
      fontFamily="Arial, sans-serif"
      color="gray.700"
      bg="#f9f9f9"
      minH="100vh" // Ensure full height
      pt="100px" // Adjust according to navbar height
      pb="80px"
    >
      <Text fontSize="3xl" fontWeight="bold" mb={4} color="#007BFF">
        🌍 Explore {place || "Your Destination"}
      </Text>

      {/* Search Box */}
      <HStack justify="center" mb={6} spacing={3}>
        <Input
          value={place}
          onChange={(e) => setPlace(extractCityName(e.target.value))}
          placeholder="Enter a destination..."
          width="320px"
          borderRadius="25px"
          border="1px solid #ccc"
          padding="12px"
          textAlign="center"
          _focus={{ borderColor: "#007BFF", boxShadow: "0 0 10px #007BFF" }}
        />
        <Button
          colorScheme="blue"
          onClick={() => fetchDestinationData(place)}
          borderRadius="25px"
          px="20px"
          _hover={{ bg: "#0056b3", transform: "scale(1.05)" }}
          transition="0.2s ease-in-out"
        >
          🔍 Search
        </Button>
      </HStack>

      {/* Loading and Error Handling */}
      {loading && <Spinner size="lg" color="blue.500" />}
      {error && (
        <Text fontSize="lg" color="red.500">
          {error}
        </Text>
      )}

      {/* Destination Data */}
      {destinationData && (
        <Box
          mt={8}
          textAlign="left"
          maxW="900px"
          mx="auto"
          p={5}
          bg="white"
          borderRadius="15px"
          boxShadow="md"
        >
          <Image
            src={destinationData.img_url}
            alt={destinationData.Destination}
            width="100%"
            borderRadius="15px"
            mb={4}
          />
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            {destinationData.Destination}
          </Text>
          <Text fontSize="lg" mb={4} textAlign="justify">
            {destinationData.Description}
          </Text>

          {/* Attractions */}
          <Text fontSize="xl" fontWeight="semibold" mt={6} textAlign="center">
            🏛️ Top Attractions
          </Text>
          <HStack wrap="wrap" justify="center" spacing={4} mt={4}>
            {destinationData.Attractions.map((attraction, index) => (
              <Box
                key={index}
                overflow="hidden"
                borderRadius="15px"
                boxShadow="md"
                transition="0.3s"
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                mt={4} // Added margin-top for spacing
              >
                <Image
                  src={attraction.url}
                  alt="Attraction"
                  width="220px"
                  height="150px"
                  objectFit="cover"
                  borderRadius="15px" // Ensuring border-radius on all sides
                />
              </Box>
            ))}
          </HStack>

          {/* Hotels - Display in Inline Grid */}
          <Text fontSize="xl" fontWeight="semibold" mt={6} textAlign="center">
            🏨 Hotels
          </Text>
          <Flex wrap="wrap" justify="center" spacing={4} mt={4} gap={4}>
            {destinationData.Hotels.map((hotel) => (
              <Box
                key={hotel._id}
                borderWidth="1px"
                borderRadius="15px"
                p={4}
                bg="white"
                boxShadow="md"
                transition="0.3s"
                _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
                width={{ base: "100%", sm: "48%", md: "30%" }} // Responsive sizing
                mt={4} // Added margin-top for spacing
              >
                <Image
                  src={hotel.image}
                  alt={hotel.hotelName}
                  borderRadius="15px"
                  width="100%"
                  height="160px"
                  objectFit="cover"
                />
                <Text fontWeight="bold" fontSize="lg" mt={2}>
                  {hotel.hotelName}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {hotel.address}
                </Text>
                <Text fontSize="md" fontWeight="bold" color="green.600">
                  💰 ₹{hotel.pricePerNight} / night
                </Text>
                <Text fontSize="sm" color="orange.500">
                  ⭐ {hotel.rating}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default NearbyPlacesPage;
