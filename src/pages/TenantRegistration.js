import React, { useState } from "react";
import DragnDrop from "../Components/DragnDrop";

const TenantRegistration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleImageDrop = (acceptedFiles) => {
    // Convert files to object URLs for preview purposes
    const imageURLs = acceptedFiles.map((file) => URL.createObjectURL(file));
    setUploadedImages((prevImages) => [...prevImages, ...imageURLs]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || uploadedImages.length === 0) {
      setMessageType("error");
      setMessage("Please fill all fields and upload at least one image.");
      return;
    }

    const tenantData = { name, email, images: uploadedImages };

    setLoading(true);
    setMessage(""); // Reset any previous message
    setMessageType("");

    try {
      const response = await fetch("http://localhost:5000/api/tenants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenantData),
      });

      if (response.ok) {
        setMessageType("success");
        setMessage("Tenant registered successfully!");
        setName(""); // Reset form fields
        setEmail("");
        setUploadedImages([]);
      } else {
        setMessageType("error");
        setMessage("Error during registration. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessageType("error");
      setMessage("Error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-lightBackground dark:bg-darkBackground ">
      <div className=" bg-accentLight dark:bg-accentDark text-lightText dark:text-darkText p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl text-center mb-6">Tenant Registration</h2>

        {/* Display messages */}
        {message && (
          <div
            className={`mb-4 p-4 text-center rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium ">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium">Upload Images</h3>
            <DragnDrop onDrop={handleImageDrop} />

            {/* Display uploaded images */}
            {uploadedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Uploaded Image ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => {
                        setUploadedImages(
                          uploadedImages.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {loading ? (
              <span className="flex justify-center">
                <svg
                  role="status"
                  className="inline w-6 h-6  animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 101"
                  fill="none"
                >
                  <path
                    fill="currentColor"
                    d="M99.5 50.5C99.5 78.4 78.4 99.5 50.5 99.5C22.6 99.5 1.5 78.4 1.5 50.5C1.5 22.6 22.6 1.5 50.5 1.5C78.4 1.5 99.5 22.6 99.5 50.5ZM93.5 50.5C93.5 74.6 74.6 93.5 50.5 93.5C26.4 93.5 7.5 74.6 7.5 50.5C7.5 26.4 26.4 7.5 50.5 7.5C74.6 7.5 93.5 26.4 93.5 50.5Z"
                  />
                </svg>
              </span>
            ) : (
              "Register Tenant"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TenantRegistration;
