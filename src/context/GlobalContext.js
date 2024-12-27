import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Create the global context
const GlobalContext = createContext();

// GlobalProvider component
export const GlobalProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesResponse = await axios.get(
          "http://localhost:5000/properties"
        );
        const tenantsResponse = await axios.get(
          "http://localhost:5000/tenants"
        );
        const paymentsResponse = await axios.get(
          "http://localhost:5000/payments"
        );
        const maintenanceResponse = await axios.get(
          "http://localhost:5000/maintenance"
        );

        setProperties(propertiesResponse.data);
        setTenants(tenantsResponse.data);
        setPayments(paymentsResponse.data);
        setMaintenance(maintenanceResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Update maintenance status
  const updateMaintenanceStatus = async (id, newStatus) => {
    try {
      // Make the PUT request to update maintenance status on the backend
      await axios.put(`http://localhost:5000/maintenance/${id}`, {
        status: newStatus,
      });
      toast.success("Maintenance status updated successfully!");

      // Update local state optimistically
      setMaintenance((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update maintenance status!");
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        properties,
        tenants,
        payments,
        maintenance,
        updateMaintenanceStatus, // Provide the update function
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalState = () => {
  return useContext(GlobalContext);
};
