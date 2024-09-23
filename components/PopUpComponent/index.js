import Link from "next/link";
import React from "react";
import { BsX } from "react-icons/bs";

export default function PopupComponent({ message, onClose, isError }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{isError ? "Error" : "Success"}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <BsX size={24} />
          </button>
        </div>
        <p className="mb-4">{message}</p>
        {!isError && (
          <div className="flex justify-between">
            <Link
              href="/user/similarPincode"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Go to Similar Pincode
            </Link>
            <Link
              href="/user/similarAddress"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Go to Similar Address
            </Link>
          </div>
        )}
        {isError && (
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
