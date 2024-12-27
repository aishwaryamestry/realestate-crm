import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGlobalState } from "../context/GlobalContext";

const PaymentsTable = ({ title }) => {
  const { payments } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(payments);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4; // Number of rows per page

  // Handle Search
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = payments.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.type.toLowerCase().includes(term) ||
        product.status.toLowerCase().includes(term) ||
        product.location.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <motion.div
      className="bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 m-5 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Payment Records</h2>

        <div className="relative ">
          <input
            type="text"
            placeholder="Search properties..."
            className="bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-600">
                  No payments available
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <motion.tr
                  key={payment.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 items-center">
                    {payment.tenantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    {payment.status}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm ">
                    <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed"
              : "text-blue-400 hover:text-blue-300"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="">
          Page {currentPage} of {totalPages}
        </div>
        <button
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed"
              : "text-blue-400 hover:text-blue-300"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </motion.div>
  );
};

export default PaymentsTable;
