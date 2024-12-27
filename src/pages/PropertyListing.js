import React, { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalContext";
import Map from "../Components/Map/Map";
import { motion } from "framer-motion";

// Fallback placeholder image
const placeholderImage = "https://via.placeholder.com/300x200?text=No+Image";

const PropertyListings = () => {
  const { properties } = useGlobalState();
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    priceRange: [0, 10000],
    availability: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1); // New state for pagination
  const itemsPerPage = 8; // Number of items per page

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      let updatedProperties = properties;

      // Apply filters
      if (filters.type) {
        updatedProperties = updatedProperties.filter(
          (property) =>
            property.type.toLowerCase() === filters.type.toLowerCase()
        );
      }

      if (filters.location) {
        updatedProperties = updatedProperties.filter((property) =>
          property.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())
        );
      }

      updatedProperties = updatedProperties.filter(
        (property) =>
          property.price >= filters.priceRange[0] &&
          property.price <= filters.priceRange[1]
      );

      if (filters.availability) {
        updatedProperties = updatedProperties.filter(
          (property) =>
            property.status.toLowerCase() === filters.availability.toLowerCase()
        );
      }

      setFilteredProperties(updatedProperties);
    } catch (error) {
      setError("There was an issue filtering the properties.");
    } finally {
      setLoading(false);
    }
  }, [filters, properties]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [
        name === "minPrice" ? Number(value) : prevFilters.priceRange[0],
        name === "maxPrice" ? Number(value) : prevFilters.priceRange[1],
      ],
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      location: "",
      priceRange: [0, 10000],
      availability: "",
    });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic to slice the filtered properties array
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    hover: { scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" },
  };

  return (
    <div className="container bg-lightBackground text-lightText dark:bg-slate-800 dark:text-darkText mx-auto p-6">
      <motion.div
        className="p-4 rounded-lg shadow-lg mb-6 transition duration-300 dark:bg-slate-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4">Filters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-2">Property Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700"
            >
              <option value="">All Types</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="cottage">Cottage</option>
              <option value="loft">Loft</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter location"
              className="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Price Range</label>
            <div className="flex space-x-2">
              <input
                type="number"
                name="minPrice"
                value={filters.priceRange[0]}
                onChange={handlePriceRangeChange}
                placeholder="Min Price"
                className="w-1/2 p-2 border rounded bg-gray-200 dark:bg-gray-700"
              />
              <input
                type="number"
                name="maxPrice"
                value={filters.priceRange[1]}
                onChange={handlePriceRangeChange}
                placeholder="Max Price"
                className="w-1/2 p-2 border rounded bg-gray-200 dark:bg-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">Availability</label>
            <select
              name="availability"
              value={filters.availability}
              onChange={handleFilterChange}
              className="w-full p-2 border rounded bg-gray-200 dark:bg-gray-700"
            >
              <option value="">All</option>
              <option value="for sale">For Sale</option>
              <option value="for rent">For Rent</option>
              <option value="for lease">For Lease</option>
            </select>
          </div>
        </div>
        <button
          onClick={clearFilters}
          className="mt-4 p-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-600"
        >
          Clear Filters
        </button>
      </motion.div>

      {loading && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading properties...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500 dark:text-red-400">{error}</p>
      )}

      {!loading && !error && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
        >
          {currentProperties.map((property) => (
            <motion.div
              key={property.id}
              className="bg-white dark:bg-gray-900 dark:text-gray-200 rounded-lg shadow-lg overflow-hidden transition-all"
              variants={cardVariants}
              whileHover="hover"
            >
              <img
                src={property.img || placeholderImage}
                alt={property.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{property.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {property.location}
                </p>
                <p className="text-blue-500 font-semibold">
                  ${property.price.toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-l-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">{currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-r-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Map items={filteredProperties} />
      </motion.div>
    </div>
  );
};

export default PropertyListings;
