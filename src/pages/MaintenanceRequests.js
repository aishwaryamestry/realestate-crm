import React, { useState, useEffect } from "react";
import { useGlobalState } from "../context/GlobalContext";
import axios from "axios";
import { motion } from "framer-motion";

const MaintenanceRequests = () => {
  const { maintenance, loading, error } = useGlobalState();
  const [updatedRequests, setUpdatedRequests] = useState([]);
  const [apiError, setApiError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setUpdatedRequests(maintenance);
  }, [maintenance]);

  if (loading)
    return <div className="text-center text-gray-700">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error loading maintenance requests: {error.message}
      </div>
    );
  if (updatedRequests.length === 0)
    return (
      <div className="text-center text-gray-700">
        No maintenance requests found.
      </div>
    );

  const handleStatusChange = async (id, newStatus) => {
    setIsUpdating(true);
    try {
      // Ensure the backend URL points to port 5000
      await axios.put(`http://localhost:5000/api/maintenance/${id}`, {
        status: newStatus,
      });
      setUpdatedRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      setApiError("Error updating status.");
      console.error("Error updating status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      className=" bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border dark:border-gray-700 m-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Maintenance Requests</h2>
      {apiError && <div className="text-red-500 my-2">{apiError}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="border-b p-3 text-left ">ID</th>
              <th className="border-b p-3 text-left ">Description</th>
              <th className="border-b p-3 text-left ">Property</th>
              <th className="border-b p-3 text-left ">Status</th>
              <th className="border-b p-3 text-left ">Action</th>
            </tr>
          </thead>
          <tbody>
            {updatedRequests.map((request) => (
              <tr key={request.id}>
                <td className="border-b p-3">{request.id}</td>
                <td className="border-b p-3">{request.description}</td>
                <td className="border-b p-3">{request.property}</td>
                <td className="border-b p-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full ${
                      request.status === "Resolved"
                        ? "bg-green-500 text-white"
                        : request.status === "In Progress"
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="border-b p-3 flex space-x-2">
                  {request.status !== "Resolved" && (
                    <button
                      onClick={() => handleStatusChange(request.id, "Resolved")}
                      className="bg-green-500 px-4 py-2 rounded hover:bg-green-400 disabled:bg-gray-400"
                      disabled={isUpdating}
                    >
                      {isUpdating ? "Updating..." : "Mark as Resolved"}
                    </button>
                  )}
                  {request.status !== "In Progress" &&
                    request.status !== "Resolved" && (
                      <button
                        onClick={() =>
                          handleStatusChange(request.id, "In Progress")
                        }
                        className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 disabled:bg-gray-400"
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Mark as In Progress"}
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MaintenanceRequests;
