import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StatCard = ({
  name,
  icon: Icon,
  value,
  color,
  title,
  count,
  description,
  bgColor,
  textColor,
  link,
}) => {
  return (
    <Link to={link}>
      <motion.div
        className=" text-lightText bg-lightBackground dark:bg-darkBackground dark:text-darkText  bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-200 dark:border-gray-700"
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div className="px-4 py-5 sm:p-6  dark:text-darkText">
          <span className="flex items-center text-sm font-medium text-lightText dark:text-darkText">
            <Icon size={20} className="mr-2" style={{ color }} />
            <h3 className={`text-xl font-bold ${textColor}`}>{title}</h3>
          </span>

          <p className="mt-1 text-3xl font-semibold text-lightText dark:text-darkText">
            {count}
          </p>
        </div>

        <p className="text-gray-600">{description}</p>
      </motion.div>
    </Link>
  );
};
export default StatCard;
