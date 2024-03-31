"use client";

import React, { useState } from "react";
import { BsFiletypePdf, BsTrash } from "react-icons/bs";

export default function InputComponent() {
  const [pdfFiles, setPdfFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setPdfFiles([...pdfFiles, ...selectedFiles]);
  };

  const handleDeletePdf = (index) => {
    const updatedFiles = [...pdfFiles];
    updatedFiles.splice(index, 1);
    setPdfFiles(updatedFiles);
  };

  const handleCancel = () => {
    setPdfFiles([]);
  };

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append(`file`, file);

      const response = await fetch(
        "https://api.man-fashion.saranshsinha.me/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("PDFs submitted successfully!");
        const data = await response.json();
        await getDetails(data.url);
        // router.push({
        //   pathname: "/result/[slug]",
        //   query: { slug: "success" },
        // });

        // return true;
      } else {
        console.error("Error submitting PDFs:", response.statusText);

        // router.push({
        //   pathname: "/result/[slug]",
        //   query: { slug: "error" },
        // });

        // return false;
      }
    } catch (error) {
      console.error("Error:", error);

      // return false;
    }
  };

  const getDetails = async (url) => {
    try {
      const response = await fetch(
        "https://api.man-fashion.saranshsinha.me/get-details",
        {
          method: "POST",
          body: JSON.stringify({ url }), // Use the URL from the first API response as the body
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Details retrieved successfully!");
        const data = await response.json();
        console.log("Details data:", data);
      } else {
        console.error("Error retrieving details:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async () => {
    for (const file of pdfFiles) {
      await uploadFile(file);
    }
  };

  const renderPdfFiles = () => {
    return pdfFiles.map((file, index) => (
      <div
        key={index}
        className="border-4 p-4 mb-4 flex items-center justify-between rounded-lg"
      >
        <div className="flex flex-row items-center gap-4">
          <BsFiletypePdf
            size={40}
            className="text-gray-600 dark:text-gray-400"
          />
          <span className="text-gray-800 dark:text-gray-200 text-lg font-semibold">
            {file.name}
          </span>
        </div>
        <button
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
          onClick={() => handleDeletePdf(index)}
        >
          <BsTrash size={24} />
        </button>
      </div>
    ));
  };

  return (
    <section className="flex flex-row justify-between items-start w-full ">
      <div className="flex flex-col justify-center items-start gap-4 w-2/3">
        {pdfFiles.length > 0 && renderPdfFiles()}
      </div>
      <div className="flex items-center justify-center w-1/3">
        <label
          htmlFor="dropzone-file"
          className="w-80 h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
        <div className="mt-4 space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
            disabled={pdfFiles.length === 0}
          >
            Submit
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={handleCancel}
            disabled={pdfFiles.length === 0}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
