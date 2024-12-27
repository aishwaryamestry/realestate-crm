import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Property() {
  const { id } = useParams(); // Get the ID from the URL
  const [property, setProperty] = useState(null); // State to store the property data

  useEffect(() => {
    // Fetch property data based on the `id`
    axios
      .get(`http://localhost:5000/properties/${id}`) // Replace with your API endpoint
      .then((response) => {
        setProperty(response.data); // Set the fetched property data
      })
      .catch((error) => {
        console.error("Error fetching property data:", error);
      });
  }, [id]); // Run effect when `id` changes

  if (!property) {
    return <p>Loading property details...</p>; // Show loading message while fetching
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{property.name}</h1>
      <img
        key={property.id}
        src={property.img}
        alt={property.name}
        className="rounded-lg shadow-md"
      />
      <p className="text-gray-600">Price: ${property.price}</p>
      <p className="text-gray-600">Location: {property.location}</p>
      <p className="text-gray-600">Size: {property.type} sq ft</p>
      <p className="text-gray-600">{property.status}</p>

      {/* Display images */}
      {/* <div className="mt-4 grid grid-cols-2 gap-4">
        {property.img.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={property.name}
            className="rounded-lg shadow-md"
          />
        ))}
      </div> */}
    </div>
  );
}
