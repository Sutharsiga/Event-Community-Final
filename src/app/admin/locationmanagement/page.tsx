"use client";

import { useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries: any = ["places"]; // Load Places library for location search

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.7128, // Default: New York
  lng: -74.006,
};

const eventLocations = [
  { id: 1, name: "Music Concert", lat: 40.73061, lng: -73.935242 },
  { id: 2, name: "Art Exhibition", lat: 40.758896, lng: -73.98513 },
];

export default function MapLocationManagement() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use .env for API Key
    libraries,
  });
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


  const [selectedLocation, setSelectedLocation] = useState(null);

  if (loadError) return <p>Error loading maps</p>;
  if (!isLoaded) return <p>Loading maps...</p>;

  return (
    <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Map & Location Management</h1>

      {/* Google Map */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Event Locations</h2>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
          {eventLocations.map((event) => (
            <Marker
              key={event.id}
              position={{ lat: event.lat, lng: event.lng }}
              title={event.name}
            //   onClick={() => setSelectedLocation(event)}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Proximity Filters */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Proximity Filters</h2>
        <select className="w-full p-2 border rounded">
          <option value="5">Within 5km</option>
          <option value="10">Within 10km</option>
          <option value="20">Within 20km</option>
        </select>
      </div>

      {/* Selected Event Details */}
      {selectedLocation && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold">Selected Event:</h3>
          {/* <p>{selectedLocation.name}</p> */}
        </div>
      )}
    </div>
  );
}
