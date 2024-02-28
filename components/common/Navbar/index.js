"use client";

import React, { useState } from "react";
import { PiFilePdfDuotone } from "react-icons/pi";
import { BsFiletypePdf } from "react-icons/bs";

export default function InputComponent() {
  const [pdfFiles, setPdfFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setPdfFiles(selectedFiles);
  };

  // Function to render PDF file names and icons
  const renderPdfFiles = () => {
    return pdfFiles.map((file, index) => (
      <div
        key={index}
        className="border-4 p-4 mb-4 flex items-center justify-between rounded-lg"
      >
        <div className="flex flex-row items-center gap-4">
          {/* Choose the PDF icon that fits your design */}
          <BsFiletypePdf
            size={40}
            className="text-gray-600 dark:text-gray-400"
          />
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
            {file.name}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <section className="flex flex-row justify-between items-start w-full ">
      <div className="flex flex-col justify-center items-start gap-4 w-2/3">
        {/* Display all selected PDF file names with icons within glass morphism boxes */}
        {pdfFiles.length > 0 && renderPdfFiles()}
      </div>
      <div className="flex items-center justify-center w-1/3">
        <label
          htmlFor="dropzone-file"
          className="w-80 h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {/* Choose the PDF icon that fits your design */}
            <BsFiletypePdf
              size={60}
              className="text-gray-600 dark:text-gray-400 mb-4"
            />
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300 mt-6">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              PDF files only
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
    </section>
  );
}
