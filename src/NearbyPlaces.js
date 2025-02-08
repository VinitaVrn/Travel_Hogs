import React, { useEffect, useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  Button,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const NearbyPlaces = ({ latitude, longitude }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [nextPageToken, setNextPageToken] = useState(null);

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (latitude && longitude) {
      setPlaces([]); // Clear previous results on location change
      fetchNearbyPlaces();
    }
  }, [latitude, longitude]);

  const fetchNearbyPlaces = async (pageToken = "") => {
    setLoading(true);
    setError(null);

    if (!API_KEY) {
      setError("Google Maps API key is missing. Check your .env file.");
      setLoading(false);
      return;
    }

    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${API_KEY}`;
    if (pageToken) url += `&pagetoken=${pageToken}`;

    try {
      // Delay if fetching the next page to ensure the token is valid
      if (pageToken) await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        setPlaces((prev) => {
          // Prevent duplicate places from being added
          const uniquePlaces = new Set([...prev, ...data.results]);
          return [...uniquePlaces];
        });
        setNextPageToken(data.next_page_token || null);
      } else {
        throw new Error(data.error_message || "Failed to fetch nearby places.");
      }
    } catch (error) {
      setError(`An error occurred: ${error.message}`);
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (placeId) => {
    setImageErrors((prev) => ({
      ...prev,
      [placeId]: true,
    }));
  };

  return (
    <VStack spacing={3} align="stretch" mt={4}>
      {loading && (
        <Box textAlign="center" mt={4}>
          <Spinner />
        </Box>
      )}
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      {places.map((place) => (
        <Box
          key={place.place_id}
          p={3}
          shadow="xs"
          borderWidth="1px"
          borderRadius="md"
        >
          <HStack>
            <FaMapMarkerAlt color="red" />
            <Text fontWeight="bold">{place.name}</Text>
          </HStack>
          <Text>{place.vicinity || "Address not available"}</Text>
          <Text>Rating: {place.rating || "N/A"}</Text>
          {place.photos &&
            place.photos.length > 0 &&
            !imageErrors[place.place_id] && (
              <Image
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=300&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`}
                alt={place.name}
                borderRadius="md"
                mt={2}
                onError={() => handleImageError(place.place_id)}
              />
            )}
          {imageErrors[place.place_id] && (
            <Text mt={2}>No photo available</Text>
          )}
        </Box>
      ))}
      {nextPageToken && (
        <Button
          mt={4}
          colorScheme="blue"
          onClick={() => fetchNearbyPlaces(nextPageToken)}
        >
          Load More
        </Button>
      )}
    </VStack>
  );
};

export default NearbyPlaces;
