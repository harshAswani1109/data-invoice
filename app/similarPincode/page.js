"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MOCK_ADDRESS_DATA_1 } from "@/constants";
// import background from "@/public/background.jpg";

export default function AddressPage() {
  const apiV1 = process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const [addresses, setAddresses] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiV1}/get-addresses-by-pincode`);
        const data = response.data;

        // Parse the JSON strings in the response data and filter out "NA" entries
        const parsedData = {};
        for (const pincode in data) {
          try {
            const parsedAddresses = JSON.parse(data[pincode]);
            parsedData[pincode] = parsedAddresses.filter(address => 
              !(address.Name === "NA" && 
                address.address === "NA" && 
                address.city === "NA" && 
                address.state === "NA" && 
                address.pincode === "NA")
            );
          } catch (parseError) {
            console.error(
              `Error parsing data for pincode ${pincode}:`,
              parseError
            );
          }
        }
        setAddresses(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Use mock data when API is down
        const parsedMockData = {};
        for (const pincode in MOCK_ADDRESS_DATA_1) {
          const parsedAddresses = JSON.parse(MOCK_ADDRESS_DATA_1[pincode]);
          parsedMockData[pincode] = parsedAddresses.filter(address => 
            !(address.Name === "NA" && 
              address.address === "NA" && 
              address.city === "NA" && 
              address.state === "NA" && 
              address.pincode === "NA")
          );
        }
        setAddresses(parsedMockData);
        setError("Using mock data (API is down).");
      }
    };

    fetchData();
  }, [apiV1]);

  const sortedAddresses = Object.entries(addresses).sort(
    ([, addressesA], [, addressesB]) => addressesB.length - addressesA.length
  );

  return (
    <div
      className="min-h-screen px-4 py-20 bg-center bg-cover md:px-6 "
      // style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="sm:p-6">
        <h1 className="mb-4 text-3xl font-bold text-[#0e1111]">Addresses</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedAddresses.map(([pincode, addressList], index) => (
            <div
              key={pincode}
              className="p-6 transition duration-300 transform shadow-md rounded-xl hover:scale-105 backdrop-blur-md bg-[#ffffff50]"
            >
              <h2 className="mb-4 text-xl font-bold text-[#0e1111]">{pincode}</h2>
              <ul className="divide-y divide-gray-200">
                {addressList.map((address, idx) => (
                  <li key={`${address._id.$oid}-${idx}`} className="py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg
                          className="w-6 h-6 text-gray-400"
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
                        <p className="text-lg font-medium text-[#0e1111]">
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
    </div>
  );
}
