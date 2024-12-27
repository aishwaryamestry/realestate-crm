// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import { AuthProvider } from "./context/AuthContext"; // Import AuthProvider
import PropertyListings from "./pages/PropertyListing";
import TenantManagement from "./pages/TenantManagement";
import PaymentHistory from "./pages/PaymentHistory";
import MaintenanceRequests from "./pages/MaintenanceRequests";
import { ToastContainer } from "react-toastify";

import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import TenantRegistration from "./pages/TenantRegistration";

import ProtectedRoute from "./Routing/ProtectedRoute";
import Property from "./pages/Property";
import "leaflet/dist/leaflet.css";

import PropertiesOverview from "./pages/PropertiesOverview";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Map from "./Components/Map/Map";
import Loader from "./Components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <GlobalProvider>
      <Router>
        <AuthProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {loading ? <Loader /> : <MainLayout />}
        </AuthProvider>
      </Router>
    </GlobalProvider>
  );
}

// MainLayout component for conditional rendering
const MainLayout = () => {
  const location = useLocation();

  // Define routes where the Sidebar should not be displayed
  const excludeSidebarRoutes = ["/"];

  // Check if the current route should include the Sidebar
  const isSidebarVisible = !excludeSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen bg-lightBackground dark:bg-darkBackground">
      {/* Conditionally render Sidebar */}
      {isSidebarVisible && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tenant-dashboard"
            element={
              <ProtectedRoute role="tenant">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/properties" element={<PropertyListings />} />
          <Route path="/overview" element={<PropertiesOverview />} />
          <Route path="/:id" element={<Property />} />
          <Route path="/tenants" element={<TenantManagement />} />
          <Route path="/payments" element={<PaymentHistory />} />
          <Route path="/maintenance" element={<MaintenanceRequests />} />
          <Route path="/register" element={<TenantRegistration />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
