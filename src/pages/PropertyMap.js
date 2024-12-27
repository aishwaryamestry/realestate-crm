import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const PropertyMap = ({ properties }) => {
  const [mapCenter, setMapCenter] = useState({
    lat: 37.7749, // Default to San Francisco's coordinates
    lng: -122.4194,
  });

  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  // Set the map center based on properties (you can center it based on the first property or all properties)
  useEffect(() => {
    if (properties.length > 0) {
      const center = {
        lat: properties[0].latitude || 37.7749, // Use latitude from property or default
        lng: properties[0].longitude || -122.4194, // Use longitude from property or default
      };
      setMapCenter(center);
    }
  }, [properties]);

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Property Locations</h2>
      <LoadScript googleMapsApiKey="process.env.REACT_APP_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={10} // Adjust zoom level based on the number of properties
        >
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={{
                lat: property.latitude,
                lng: property.longitude,
              }}
              title={property.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PropertyMap;
