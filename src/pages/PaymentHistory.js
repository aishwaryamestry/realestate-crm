import React from "react";
import { useGlobalState } from "../context/GlobalContext";
import * as XLSX from "xlsx"; // Import the xlsx library
import Table from "../Components/Table";
import PaymentsTable from "../Components/PaymenntsTable";
import { motion } from "framer-motion";
import Header from "../Components/Header";

const PaymentHistory = () => {
  const { payments, loading, error } = useGlobalState();

  const downloadExcel = () => {
    // Map data to an array of objects for the Excel file
    const worksheetData = payments.map((payment) => ({
      ID: payment.id,
      Date: payment.date,
      Tenant: payment.tenantName,
      Amount: payment.amount,
      "Payment Method": payment.method,
      Status: payment.status,
    }));

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(worksheetData);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");

    // Export the workbook to a file
    XLSX.writeFile(wb, "payment_history.xlsx");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin border-4 rounded-full w-16 h-16 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <>
      <Header title={"Payment History"} />
      <motion.div
        className=" bg-lightBackground dark:bg-darkBackground text-lightText dark:text-darkText bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 m-3 border border-gray-100 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={downloadExcel}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Download Payment History (Excel)
        </button>
      </motion.div>
      <PaymentsTable />
    </>
  );
};

export default PaymentHistory;
