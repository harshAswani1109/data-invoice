"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MOCK_ADDRESS_DATA } from "@/constants";
// import background from "@/public/background.jpg";

export default function SimilarAddressesPage() {
  const apiV1 = process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const [addresses, setAddresses] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data from ${apiV1}/get-similar-addresses`);
        const response = await axios.get(`${apiV1}/get-similar-addresses`);
        console.log("Response data:", response.data);

        const parsedData = {};
        for (const key in response.data) {
          parsedData[key] = response.data[key].map(JSON.parse);
        }

        setAddresses(parsedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          "Error fetching data from the server. Using mock data for testing."
        );

        // Use mock data when API is down
        const parsedMockData = {};
        for (const key in MOCK_ADDRESS_DATA) {
          parsedMockData[key] = MOCK_ADDRESS_DATA[key].map(JSON.parse);
        }
        setAddresses(parsedMockData);
      }
    };

    fetchData();
  }, [apiV1]);

  const getCounts = () => {
    const counts = {};
    for (const key in addresses) {
      counts[key] = addresses[key].length;
    }
    return counts;
  };

  const sortedAddresses = Object.entries(getCounts()).sort(
    ([, countA], [, countB]) => countB - countA
  );

  const isValidAddress = (address) => {
    return !(
      address.Name === "NA" &&
      address.address === "NA" &&
      address.city === "NA" &&
      address.state === "NA" &&
      address.pincode === "NA"
    );
  };

  return (
    <div
      className="min-h-screen px-4 py-20 bg-center bg-cover md:px-6"
      // style={{ backgroundImage: `url(${background.src})` }}
    >
      <div className="p-6 rounded-lg shadow-lg backdrop-blur-md bg-[#ffffff50]">
        {error && <p className="text-red-500">{error}</p>}
        <h1 className="mb-4 text-2xl font-bold text-center md:text-3xl md:text-left text-[#0e1111]">
          Addresses
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead className="bg-white/20">
              <tr>
                <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-[#0e1111] uppercase md:px-6 md:py-3">
                  Count
                </th>
                <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-[#0e1111] uppercase md:px-6 md:py-3">
                  Name
                </th>
                <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-[#0e1111] uppercase md:px-6 md:py-3">
                  Street
                </th>
                <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-[#0e1111] uppercase md:px-6 md:py-3">
                  City
                </th>
                <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-[#0e1111] uppercase md:px-6 md:py-3">
                  State
                </th>
                <th className="px-4 py-2 text-xs font-medium tracking-wider text-left text-[#0e1111] uppercase md:px-6 md:py-3">
                  Pincode
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/10 backdrop-blur-sm">
              {sortedAddresses.map(([group, count]) => {
                const validAddresses = addresses[group].filter(isValidAddress);
                return (
                  <React.Fragment key={group}>
                    {validAddresses.map((address, index) => (
                      <tr key={`${address._id.$oid}-${index}`} className="transition duration-150 ease-in-out border-b border-gray-200/30 hover:bg-white/20">
                        {index === 0 && (
                          <td
                            rowSpan={validAddresses.length}
                            className="px-4 py-2 text-sm text-[#0e1111] border-r border-gray-200/30 md:px-6 md:py-4 whitespace-nowrap"
                          >
                            {validAddresses.length}
                          </td>
                        )}
                        <td className="px-4 py-2 text-sm text-[#0e1111] md:px-6 md:py-4 whitespace-nowrap">
                          {address.Name}
                        </td>
                        <td className="px-4 py-2 text-sm text-[#0e1111] md:px-6 md:py-4 whitespace-nowrap">
                          {address.address}
                        </td>
                        <td className="px-4 py-2 text-sm text-[#0e1111] md:px-6 md:py-4 whitespace-nowrap">
                          {address.city}
                        </td>
                        <td className="px-4 py-2 text-sm text-[#0e1111] md:px-6 md:py-4 whitespace-nowrap">
                          {address.state}
                        </td>
                        <td className="px-4 py-2 text-sm text-[#0e1111] md:px-6 md:py-4 whitespace-nowrap">
                          {address.pincode}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
