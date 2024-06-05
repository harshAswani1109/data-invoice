"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SimilarAddressesPage() {
  const apiV1 = process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const [addresses, setAddresses] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data from ${apiV1}/get-similar-addresses`); // Log the URL
        const response = await axios.get(`${apiV1}/get-similar-addresses`);
        console.log("Response data:", response.data); // Log the response data

        // Parse the JSON strings in the response data
        const parsedData = {};
        for (const key in response.data) {
          parsedData[key] = response.data[key].map(JSON.parse);
        }

        setAddresses(parsedData);
      } catch (error) {
        setError("Error fetching data from the server.");
        console.error("Error fetching data:", error);
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

  return (
    <div className="py-8 px-4 md:px-6">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
        Addresses
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Street
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="px-4 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pincode
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAddresses.map(([group, count]) => (
              <React.Fragment key={group}>
                {addresses[group].map((address, index) => (
                  <tr key={`${address._id.$oid}-${index}`} className="border-2">
                    {index === 0 && (
                      <td
                        rowSpan={addresses[group].length}
                        className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500 border-r-2"
                      >
                        {count}
                      </td>
                    )}
                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                      {address.Name}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                      {address.address}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                      {address.city}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                      {address.state}
                    </td>
                    <td className="px-4 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                      {address.pincode}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
