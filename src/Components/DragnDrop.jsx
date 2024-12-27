import React from "react";
import { useDropzone } from "react-dropzone";

function DragnDrop({ onDrop }) {
  // useDropzone hook to handle drag-and-drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    onDrop, // Callback function when files are dropped
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer hover:border-blue-500"
    >
      <input {...getInputProps()} />
      <p className="text-center text-gray-500">
        Drag & drop some files here, or click to select files
      </p>
    </div>
  );
}

export default DragnDrop;
