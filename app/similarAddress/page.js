"use client";
import { useEffect, useState } from "react";

const sampleData = {
  "00": [
    {
      _id: "ObjectId('6093a2758d26a81471234256')",
      street: "123 Main St",
      city: "Cityville",
      state: "ST",
      pincode: "123456",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234257')",
      street: "125 Main St",
      city: "Cityville",
      state: "ST",
      pincode: "123456",
    },
  ],
  "01": [
    {
      _id: "ObjectId('6093a2758d26a81471234258')",
      street: "789 Oak St",
      city: "Villagetown",
      state: "ST",
      pincode: "789012",
    },
  ],
  "02": [
    {
      _id: "ObjectId('6093a2758d26a81471234256')",
      street: "123 Main St",
      city: "Cityville",
      state: "ST",
      pincode: "123456",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234257')",
      street: "125 Main St",
      city: "Cityville",
      state: "ST",
      pincode: "123456",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234257')",
      street: "125 Main St",
      city: "Cityville",
      state: "ST",
      pincode: "123456",
    },
  ],
};

export default function SimilarAddressesPage() {
  const apiV1 = process.env.ENDPOINT_URL;
  const [addresses, setAddresses] = useState(sampleData);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API fetch with sample data
    // Replace this with actual API call using Axios or Fetch
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(
    // `${apiV1}/get-similar-addresses`
    //     );
    //     setAddresses(response.data);
    //   } catch (error) {
    //     setError("Error fetching data from the server.");
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();

    // For now, set sample data directly
    setAddresses(sampleData);
  }, []);
  const getCounts = () => {
    const counts = {};
    for (const key in addresses) {
      counts[key] = addresses[key].length;
    }
    return counts;
  };

  // Sort the addresses based on their counts
  const sortedAddresses = Object.entries(getCounts()).sort(
    ([, countA], [, countB]) => countB - countA
  );

  return (
    <div className="py-24 px-6 lg:px-24">
      {error && <p>Error: {error}</p>}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Street
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pincode
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedAddresses.map(([group, count]) => (
            <>
              {addresses[group].map((address, index) => (
                <tr key={`${address._id}-${index}`} className="border-2">
                  {index === 0 && (
                    <td
                      rowSpan={addresses[group].length}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-r-2"
                    >
                      {count}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {address.street}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {address.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {address.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {address.pincode}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
