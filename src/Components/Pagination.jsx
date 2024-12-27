import { useState } from "react";
import { Card } from "./Card";
import ReactPaginate from "react-paginate";

export default function Pagination({ filteredProperties }) {
  const [currentPage, setCurrentPage] = useState(0); // State for current page (zero-indexed)
  const propertiesPerPage = 4; // Number of properties per page

  // Calculate the properties for the current page
  const offset = currentPage * propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    offset,
    offset + propertiesPerPage
  );

  // Handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      {/* Property Listings */}

      {currentProperties.length > 0 ? (
        currentProperties.map((property) => (
          <Card key={property.id} property={property} />
        ))
      ) : (
        <p className="text-gray-600 col-span-full">
          No properties match your filters.
        </p>
      )}

      {/* Pagination Controls */}
      <div className="mt-8 flex justify-center items-center space-x-2">
        <ReactPaginate
          previousLabel={<span className="font-semibold">Previous</span>}
          nextLabel={<span className="font-semibold">Next</span>}
          breakLabel={<span className="font-semibold">...</span>}
          pageCount={Math.ceil(filteredProperties.length / propertiesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex space-x-2 items-center justify-center"}
          pageClassName={"flex items-center justify-center"}
          pageLinkClassName={
            "px-4 py-2 rounded-md text-sm font-medium bg-white border border-gray-300 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
          activeClassName={"bg-blue-500 text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          previousClassName={
            "flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
          nextClassName={
            "flex items-center justify-center px-4 py-2 rounded-md bg-white border border-gray-300 cursor-pointer hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          }
        />
      </div>
    </>
  );
}
