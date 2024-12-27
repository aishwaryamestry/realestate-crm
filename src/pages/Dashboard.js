import React, { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalContext";
import StatCard from "../Components/StatCard";
import { motion } from "framer-motion";
import { UserCheck, UserPlus, Users2Icon, UserX } from "lucide-react";
import Table from "../Components/Table";
import UsersTable from "../Components/UsersTable";
import PaymentsTable from "../Components/PaymenntsTable";
import Loader from "../Components/Loader";

const Dashboard = () => {
  const { properties, tenants, payments, maintenance } = useGlobalState();
  const userStats = {
    totalUsers: 152845,
    newUsersToday: 243,
    activeUsers: 98520,
    churnRate: "2.4%",
  };

  return (
    <>
      <div className="container bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText mx-auto p-6">
        <h1 className="text-3xl">Tenant Dashboard</h1>

        {/* Overview Cards */}
        <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <StatCard
              icon={Users2Icon}
              value={userStats.totalUsers.toLocaleString()}
              color="#6366F1"
              title="Properties"
              count={properties.length}
              bgColor="bg-blue-100"
              textColor="text-blue-600"
              link="/properties"
            />
            <StatCard
              title="Tenants"
              count={tenants.length}
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
              bgColor="bg-red-100"
              textColor="text-red-600"
              link="/maintenance"
              icon={UserX}
              value={userStats.churnRate}
              color="#EF4444"
            />
          </motion.div>
        </main>

        <div className=" bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText">
          <Table title={"Property Overview"} />
        </div>

        <div>
          <UsersTable />
        </div>

        {/* Latest Activity Section */}
        <div className="mt-10 bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText">
          <h2 className="text-2xl font-bold mb-4">Latest Activity</h2>

          <div className="shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4 ">
              Recent Maintenance Requests
            </h3>
            {maintenance.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {maintenance.slice(0, 5).map((request) => (
                  <li key={request.id} className="py-2  flex justify-between">
                    <span>{request.description}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        request.status === "Pending"
                          ? "bg-red-200 text-red-600"
                          : "bg-green-200 text-green-600"
                      }`}
                    >
                      {request.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="">No recent maintenance requests.</p>
            )}
          </div>
        </div>

        {/* Reusable Payment History */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Recent Payments</h2>
          <PaymentsTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
