"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddressPage() {
  const apiV1 = process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const [addresses, setAddresses] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiV1}/get-addresses-by-pincode`);
        const data = response.data;

        // Parse the JSON strings in the response data
        const parsedData = {};
        for (const pincode in data) {
          try {
            parsedData[pincode] = JSON.parse(data[pincode]);
          } catch (parseError) {
            console.error(
              `Error parsing data for pincode ${pincode}:`,
              parseError
            );
          }
        }
        setAddresses(parsedData);
      } catch (error) {
        setError("Error fetching data from the server.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiV1]);

  const sortedAddresses = Object.entries(addresses).sort(
    ([, addressesA], [, addressesB]) => addressesB.length - addressesA.length
  );

  return (
    <div className="py-24 px-6 lg:px-24">
      <h1 className="text-3xl font-bold mb-4">Addresses</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAddresses.map(([pincode, addressList], index) => (
          <div
            key={pincode}
            className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl shadow-md p-6 transform transition duration-300 hover:scale-105"
          >
            <h2 className="text-xl font-bold mb-4">{pincode}</h2>
            <ul className="divide-y divide-gray-200">
              {addressList.map((address, idx) => (
                <li key={`${address._id.$oid}-${idx}`} className="py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 14l9-5-9-5-9 5 9 5z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-lg font-medium text-gray-900">
                        {address.address}
                      </p>
                      <p className="text-sm text-gray-500">
                        {address.city}, {address.state}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
