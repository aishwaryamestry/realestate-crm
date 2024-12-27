import React, { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalContext";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook
import UsersTable from "../Components/UsersTable";
import { motion } from "framer-motion";

const TenantManagement = () => {
  const { tenants } = useGlobalState();
  const { isDarkMode } = useTheme(); // Get current theme mode (light/dark)
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortedTenants, setSortedTenants] = useState([]);

  useEffect(() => {
    let filteredTenants = tenants;

    // Search
    if (searchTerm) {
      filteredTenants = filteredTenants.filter(
        (tenant) =>
          tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    if (sortField) {
      filteredTenants = filteredTenants.sort((a, b) => {
        if (sortField === "moveInDate") {
          return new Date(a.moveInDate) - new Date(b.moveInDate);
        }
        if (sortField === "rent") {
          return a.rent - b.rent;
        }
        return a.name.localeCompare(b.name);
      });
    }

    setSortedTenants(filteredTenants);
  }, [searchTerm, sortField, tenants]);

  return (
    <div className="container  text-lightText dark:text-darkText mx-auto p-6 bg-lightBackground dark:bg-darkBackground  ">
      <h1 className="text-2xl mb-6">Tenant Management</h1>

      {/* Search and Sort */}
      <motion.div
        className="bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-4 m-2  border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl mb-4">Search and Sort</h2>
        <div className="flex flex-wrap gap-4">
          {/* Search Input */}
          <div>
            <label className="block mb-2">Search Tenants</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or email"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Sort Options */}
          <div>
            <label className="block mb-2">Sort By</label>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="w-full p-2 border rounded "
            >
              <option value="name">Name</option>
              <option value="moveInDate">Move-In Date</option>
              <option value="rent">Rent Amount</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Tenant Table */}
      <UsersTable />
    </div>
  );
};

export default TenantManagement;
