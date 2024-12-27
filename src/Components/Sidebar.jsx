import {
  BarChart2,
  DollarSign,
  HandCoins,
  Home,
  HousePlus,
  Menu,
  Users,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook

const SIDEBAR_ITEMS = [
  {
    name: "DashBoard",
    icon: BarChart2,
    color: "#6366f1",
    href: "/tenant-dashboard",
  },
  {
    name: "Properties",
    icon: Home,
    color: "#8B5CF6",
    href: "/properties",
  },
  { name: "Tenants", icon: Users, color: "#EC4899", href: "/tenants" },
  {
    name: "Maintenance",
    icon: DollarSign,
    color: "#10B981",
    href: "/maintenance",
  },
  {
    name: "Payment History",
    icon: HandCoins,
    color: "#F59E0B",
    href: "/payments",
  },
  { name: "Register", icon: HousePlus, color: "#3B82F6", href: "/register" },
  { name: "Logout", icon: Users, color: "#6EE7B7", href: "/" },
];

const Sidebar = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use theme from context
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <motion.div
      layout
      className={`relative z-10 transition-all flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div
        className={`h-screen p-4 flex flex-col border-r transition-all ${
          isDarkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-gray-100 border-gray-200"
        }`}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Toggle sidebar visibility
          className={` p-2 bg-transparent rounded-lg ${
            isDarkMode ? "text-darkText" : "text-lightText"
          } transition-all shadow-md mb-4`}
        >
          <Menu size={24} />
        </button>

        {/* Light/Dark Mode Toggle */}
        <motion.div
          className="mt-4 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.1 }}
        >
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} // Toggle the theme
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-lg ${
              isDarkMode
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-200 text-gray-900 hover:bg-gray-300"
            }`}
          >
            {isDarkMode ? (
              <Moon size={20} className="transition-all" />
            ) : (
              <Sun size={20} className="transition-all" />
            )}
          </motion.button>
        </motion.div>

        {/* Sidebar Navigation */}
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item, index) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                layout
                className={`flex items-center p-4 text-sm font-medium rounded-lg mb-2 hover:bg-gray-700 transition-colors ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(75, 85, 99, 0.5)", // Slightly lighter bg on hover
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Animated Icon */}
                <motion.div
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon
                    size={20}
                    style={{
                      color: item.color,
                      minWidth: "20px",
                      transition: "all 0.3s ease-in-out",
                    }}
                  />
                </motion.div>

                {/* Animated Text with Delay based on Index */}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                        transition: { delay: 0.1 * index, duration: 0.3 },
                      }}
                      exit={{
                        opacity: 0,
                        width: 0,
                        transition: { duration: 0.4 },
                      }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
