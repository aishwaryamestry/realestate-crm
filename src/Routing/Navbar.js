import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "../pages/DarkMode";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full  bg-slate-100 text-black shadow-md dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-lg font-bold">Property Manager</div>
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
            >
              Login to Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/properties"
              className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
            >
              Property Listings
            </Link>
          </li>
          <li>
            <Link
              to="/tenants"
              className="hover:bg-blue-500 px-3 py-2 rounded-md transition"
            >
              Tenant Management
            </Link>
          </li>
          <li>
            <Link to="/payments">Payment History</Link>{" "}
            {/* Add link to Payment History */}
          </li>
          <li>
            <Link to="/maintenance">Maintenance</Link>
            {/* Add link to Payment History */}
          </li>
        </ul>
        <DarkMode />
      </div>
    </nav>
  );
};

export default Navbar;
