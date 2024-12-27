import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Menu as MenuIcon } from "lucide-react";

const ToggleButton = ({ onClick, icon, ariaLabel }) => {
  const IconComponent =
    icon === "menu" ? MenuIcon : icon === "sun" ? Sun : Moon;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="p-2 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
      aria-label={ariaLabel}
    >
      <IconComponent size={24} />
    </motion.button>
  );
};

export default ToggleButton;
