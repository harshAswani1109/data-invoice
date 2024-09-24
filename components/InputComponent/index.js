"use client";

import React, { useState, useEffect } from "react";
import { BsFiletypePdf, BsTrash } from "react-icons/bs";
import PopupComponent from "@/components/PopUpComponent";
// import backgroundimage from "../../public/user-background.jpg";
// import Image from "next/image";

export default function InputComponent() {
  const apiV1 = process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const [pdfFiles, setPdfFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (pdfFiles.length > 0) {
      setShowGuide(false);
    } else {
      setShowGuide(true);
    }
  }, [pdfFiles]);

  const renderGuide = () => {
    return (
      <div className="hidden lg:block bg-[#F5DEB3] z-10 items-center justify-between w-full p-6 rounded-lg shadow-lg max-w-md">
        <h3 className="mb-4 text-xl font-bold">How to use:</h3>
        <ol className="space-y-2 list-decimal list-inside">
          <li>
            Click on the "Click to upload" area or drag and drop PDF files.
          </li>
          <li>Selected files will appear in the left panel.</li>
          <li>Click "Submit" to upload the files.</li>
          <li>Use the trash icon to remove individual files if needed.</li>
          <li>Click "Cancel" to clear all selected files.</li>
        </ol>
      </div>
    );
  };

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
      formData.append("file", file);

      const response = await fetch(`${apiV1}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        await getDetails(data.url);
        return true;
      } else {
        console.error("Error submitting PDFs:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const getDetails = async (url) => {
    try {
      const response = await fetch(`${apiV1}/get-details`, {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
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
      const success = await uploadFile(file);
      if (success) {
        setPopupMessage("Data Added successfully");
        setIsError(false);
      } else {
        setPopupMessage("Error submitting PDFs");
        setIsError(true);
        break;
      }
    }
    setShowPopup(true);
  };

  const renderPdfFiles = () => {
    return pdfFiles.map((file, index) => (
      <div
        key={index}
        className="flex items-center justify-between w-full gap-2 p-4 border-4 rounded-lg"
      >
        <div className="flex flex-row items-center gap-4">
          <BsFiletypePdf size={40} className="text-gray-600 " />
          <span className="text-xs font-semibold text-gray-800 sm:text-sm lg:text-lg">
            {file.name}
          </span>
        </div>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => handleDeletePdf(index)}
        >
          <BsTrash size={24} />
        </button>
      </div>
    ));
  };

  return (
    <section
      className="w-full h-screen bg-center bg-cover"
      // style={{ backgroundImage: `url(${backgroundimage.src})` }}
    >
      <div className="flex flex-col-reverse items-start justify-end md:justify-center w-full min-h-screen px-6 md:py-12 md:flex-row bg-white/10 backdrop-blur-sm gap-y-10 lg:px-12">
        <div className="flex flex-col items-start justify-center w-full gap-4 md:w-1/2 ">
          {pdfFiles.length > 0 && renderPdfFiles()}
          {showGuide && renderGuide()}
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <label
            htmlFor="dropzone-file"
            className="w-60 sm:w-80 h-60 sm:h-80 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#F5DEB3] backdrop-blur hover:bg-gray-10 flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <BsFiletypePdf size={60} className="mb-4 text-gray-600" />
              <p className="mt-6 mb-2 text-sm text-gray-600">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-600 ">PDF files only</p>
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
              className="bg-[#1805db] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
              disabled={pdfFiles.length === 0}
            >
              Submit
            </button>
            <button
              className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
              onClick={handleCancel}
              disabled={pdfFiles.length === 0}
            >
              Cancel
            </button>
          </div>
        </div>
        {showPopup && (
          <PopupComponent
            message={popupMessage}
            onClose={() => setShowPopup(false)}
            isError={isError}
          />
        )}
      </div>
    </section>
    // <section className="flex flex-col-reverse items-center justify-center w-full min-h-screen bg-center bg-cover md:flex-row">
    //   <div className="flex flex-col-reverse items-start justify-between w-full min-h-screen p-6 rounded-lg gap-y-10 md:flex-row bg-white/30 backdrop-blur-sm md:p-10">
    //     <div className="flex flex-col items-start justify-center w-full gap-4 md:w-1/2">
    //       {pdfFiles.length > 0 && renderPdfFiles()}
    //     </div>
    //     <div className="flex flex-col items-center justify-center w-full pt-20">
    //       <label
    //         htmlFor="dropzone-file"
    //         className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer w-60 sm:w-80 h-60 sm:h-80 bg-gray-50 -800 over:bg-gray-100 00 gray-500 -600"
    //       >
    //         <div className="flex flex-col items-center justify-center pt-5 pb-6">
    //           <BsFiletypePdf
    //             size={60}
    //             className="mb-4 text-gray-600"
    //           />
    //           <p className="mt-6 mb-2 text-sm text-gray-600">
    //             <span className="font-semibold">Click to upload</span> or drag
    //             and drop
    //           </p>
    //           <p className="text-xs text-gray-600 ">
    //             PDF files only
    //           </p>
    //         </div>
    //         <input
    //           id="dropzone-file"
    //           type="file"
    //           className="hidden"
    //           accept=".pdf"
    //           multiple
    //           onChange={handleFileChange}
    //         />
    //       </label>
    //       <div className="mt-4 space-x-4">
    //         <button
    //           className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    //           onClick={handleSubmit}
    //           disabled={pdfFiles.length === 0}
    //         >
    //           Submit
    //         </button>
    //         <button
    //           className="px-4 py-2 font-bold text-gray-800 bg-gray-300 rounded hover:bg-gray-400"
    //           onClick={handleCancel}
    //           disabled={pdfFiles.length === 0}
    //         >
    //           Cancel
    //         </button>
    //       </div>
    //     </div>
    //     {showPopup && (
    //       <PopupComponent
    //         message={popupMessage}
    //         onClose={() => setShowPopup(false)}
    //         isError={isError}
    //       />
    //     )}
    //   </div>
    // </section>
  );
}
