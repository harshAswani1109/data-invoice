"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const sampleData = {
  123456: [
    {
      _id: "ObjectId('6093a2758d26a81471234256')",
      street: "123 Main St",
      city: "Cityville",
      state: "ST",
      pincode: "123456",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234257')",
      street: "456 Elm St",
      city: "Townsville",
      state: "ST",
      pincode: "123456",
    },
  ],
  789012: [
    {
      _id: "ObjectId('6093a2758d26a81471234258')",
      street: "789 Oak St",
      city: "Villagetown",
      state: "ST",
      pincode: "789012",
    },
  ],
  345678: [
    {
      _id: "ObjectId('6093a2758d26a81471234259')",
      street: "789 Elm St",
      city: "Hamletville",
      state: "ST",
      pincode: "345678",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234260')",
      street: "101 Pine St",
      city: "Foresttown",
      state: "ST",
      pincode: "345678",
    },
  ],
  123457: [
    {
      _id: "ObjectId('6093a2758d26a81471234256')",
      street: "123 Main St",
      city: "Cityville",
      state: "ST",
      pincode: "123457",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234257')",
      street: "456 Elm St",
      city: "Townsville",
      state: "ST",
      pincode: "123457",
    },
  ],
  789789: [
    {
      _id: "ObjectId('6093a2758d26a81471234258')",
      street: "789 Oak St",
      city: "Villagetown",
      state: "ST",
      pincode: "789789",
    },
  ],
  347678: [
    {
      _id: "ObjectId('6093a2758d26a81471234259')",
      street: "789 Elm St",
      city: "Hamletville",
      state: "ST",
      pincode: "347678",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234260')",
      street: "101 Pine St",
      city: "Foresttown",
      state: "ST",
      pincode: "347678",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234261')",
      street: "222 Oak St",
      city: "Villagetown",
      state: "ST",
      pincode: "347678",
    },
  ],
  111111: [
    {
      _id: "ObjectId('6093a2758d26a81471234259')",
      street: "111 High St",
      city: "Topcity",
      state: "ST",
      pincode: "111111",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234260')",
      street: "222 Elm St",
      city: "Downtown",
      state: "ST",
      pincode: "111111",
    },
    {
      _id: "ObjectId('6093a2758d26a81471234261')",
      street: "333 Oak St",
      city: "Uptown",
      state: "ST",
      pincode: "111111",
    },
  ],
};

export default function AddressPage() {
  const apiV1 = process.env.ENDPOINT_URL;

  //   const [addresses, setAddresses] = useState([]);
  const [addresses, setAddresses] = useState(sampleData);
  const [error, setError] = useState(null);

  const sortedAddresses = Object.entries(addresses).sort(
    ([, addressesA], [, addressesB]) => addressesB.length - addressesA.length
  );

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get(`${apiV1}/get-addresses-by-pincode`);
    //     setAddresses(response.data);
    //   } catch (error) {
    //     setError("Error fetching data from the server.");
    //     console.error("Error fetching data:", error);
    //   }
    // };

    // fetchData();
    setAddresses(sampleData);
  }, []);

  return (
    <div className="py-24 px-6 lg:px-24">
      <h1 className="text-3xl font-bold mb-4">Addresses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedAddresses.map(([pincode, addressList], index) => (
          <div
            key={pincode}
            className={`bg-gradient-to-br from-blue-200 to-purple-200 rounded-xl shadow-md p-6 transform transition duration-300 hover:scale-105          }`}
          >
            <h2 className="text-xl font-bold mb-4">{pincode}</h2>
            <ul className="divide-y divide-gray-200">
              {addressList.map((address) => (
                <li key={address._id} className="py-4">
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
                        {address.street}
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
