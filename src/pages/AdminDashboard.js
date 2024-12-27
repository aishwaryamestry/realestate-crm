import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../Components/Sidebar";
import StatCard from "../Components/StatCard";
import Table from "../Components/Table";
import UsersTable from "../Components/UsersTable";
import { useGlobalState } from "../context/GlobalContext";
import PaymentsTable from "../Components/PaymenntsTable";
import Header from "../Components/Header";
import { useTheme } from "../context/ThemeContext";
import MaintenanceRequests from "./MaintenanceRequests";

const AdminDashboard = () => {
  const { properties, tenants, payments, maintenance } = useGlobalState();
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeContent, setActiveContent] = useState(null);

  const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
  };

  // Mock data for the chart
  const data = [
    { name: "Jan", activeUsers: 20, properties: 5, revenue: 1000 },
    { name: "Feb", activeUsers: 35, properties: 8, revenue: 2000 },
    { name: "Mar", activeUsers: 40, properties: 10, revenue: 3000 },
    { name: "Apr", activeUsers: 60, properties: 12, revenue: 4000 },
    { name: "May", activeUsers: 70, properties: 15, revenue: 5000 },
  ];

  return (
    <>
      <Header title="Hello Admin, Welcome to Dashboard !" />
      <div className="flex h-screen bg-lightBackground dark:bg-darkBackground text-gray-100 m-0 p-0 overflow-hidden ">
        <div className="container p-12 overflow-auto">
          <main className="max-w-7xl mx-auto py-4 px-4 lg:px-8">
            <motion.div
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <StatCard
                icon={UsersIcon}
                value={userStats.totalUsers.toLocaleString()}
                color="#6366F1"
                title="Properties"
                count={properties.length}
                description="Total properties managed"
                bgColor="bg-blue-100"
                textColor="text-blue-600"
                link="/properties"
              />
              <StatCard
                title="Tenants"
                count={tenants.length}
                description="Active tenants"
                bgColor="bg-green-100"
                textColor="text-green-600"
                link="/tenants"
                icon={UserPlus}
                value={userStats.newUsersToday}
                color="#10B981"
              />
              <StatCard
                title="Payments"
                count={payments.length}
                description="Payments processed"
                bgColor="bg-yellow-100"
                textColor="text-yellow-600"
                link="/payments"
                icon={UserCheck}
                value={userStats.activeUsers.toLocaleString()}
                color="#F59E0B"
              />
              <StatCard
                title="Maintenance"
                count={
                  maintenance.filter((req) => req.status === "Pending").length
                }
                description="Pending requests"
                bgColor="bg-red-100"
                textColor="text-red-600"
                link="/maintenance"
                icon={UserX}
                value={userStats.churnRate}
                color="#EF4444"
              />
            </motion.div>
          </main>
          {/* Card Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-6 m-4">
            <div
              onClick={() => setActiveContent("tenants")}
              className="cursor-pointer block bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-blue-600">
                Manage Tenants
              </h3>
              <p className="text-gray-700">
                View, edit, or delete user accounts.
              </p>
            </div>

            <div
              onClick={() => setActiveContent("properties")}
              className="cursor-pointer block bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-green-600">
                Manage Properties
              </h3>
              <p className="text-gray-700">Add, edit, or remove properties.</p>
            </div>

            <div
              onClick={() => setActiveContent("payments")}
              className="cursor-pointer block bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-yellow-600">Payments</h3>
              <p className="text-gray-700">Configure application settings.</p>
            </div>

            <div
              onClick={() => setActiveContent("maintenance")}
              className="cursor-pointer block bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-yellow-600">
                Maintenance Requests
              </h3>
              <p className="text-gray-700">View and manage requests.</p>
            </div>
          </div>

          {/* Stats Section */}

          {/* Conditional Content Below */}
          {activeContent === "tenants" && <UsersTable />}

          {activeContent === "properties" && <Table title={"Properties"} />}

          {activeContent === "payments" && <PaymentsTable />}

          {activeContent === "maintenance" && <MaintenanceRequests />}

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-300">
              Recent Payments
            </h2>
            <PaymentsTable />
          </div>
          {/* Analytics Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">
                Site Usage Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="activeUsers"
                    stroke="#8884d8"
                  />
                  <Line type="monotone" dataKey="properties" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="revenue" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
