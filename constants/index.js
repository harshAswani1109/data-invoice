export const COMPANY_NAME = "Man Fashion";

export const NAV_ITEMS = [
  { href: "/", label: "Home", isActive: true },
  { href: "/similarPincode", label: "Similar Pincode", isActive: false },
  { href: "/similarAddress", label: "Similar Address", isActive: false },
  // { href: "/contact", label: "Contact", isActive: false },
];

export const MOCK_ADDRESS_DATA = {
  "Group 1": [
    JSON.stringify({
      Name: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      pincode: "10001",
      _id: { $oid: "1" },
    }),
    JSON.stringify({
      Name: "Jane Smith",
      address: "456 Elm St",
      city: "New York",
      state: "NY",
      pincode: "10002",
      _id: { $oid: "2" },
    }),
    JSON.stringify({
      Name: "Mike Johnson",
      address: "789 Broadway",
      city: "New York",
      state: "NY",
      pincode: "10003",
      _id: { $oid: "8" },
    }),
  ],
  "Group 2": [
    JSON.stringify({
      Name: "Alice Johnson",
      address: "789 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      pincode: "90001",
      _id: { $oid: "3" },
    }),
    JSON.stringify({
      Name: "Bob Williams",
      address: "321 Pine Rd",
      city: "Los Angeles",
      state: "CA",
      pincode: "90002",
      _id: { $oid: "4" },
    }),
    JSON.stringify({
      Name: "Charlie Brown",
      address: "654 Cedar Ln",
      city: "Los Angeles",
      state: "CA",
      pincode: "90003",
      _id: { $oid: "5" },
    }),
  ],
  "Group 3": [
    JSON.stringify({
      Name: "Emily Davis",
      address: "101 Maple St",
      city: "Chicago",
      state: "IL",
      pincode: "60601",
      _id: { $oid: "9" },
    }),
    JSON.stringify({
      Name: "David Wilson",
      address: "202 Oak Rd",
      city: "Chicago",
      state: "IL",
      pincode: "60602",
      _id: { $oid: "10" },
    }),
  ],
};

export const MOCK_ADDRESS_DATA_1 = {
  110001: JSON.stringify([
    {
      _id: { $oid: "1" },
      address: "Connaught Place",
      city: "New Delhi",
      state: "Delhi",
    },
    {
      _id: { $oid: "2" },
      address: "Janpath",
      city: "New Delhi",
      state: "Delhi",
    },
    {
      _id: { $oid: "8" },
      address: "Barakhamba Road",
      city: "New Delhi",
      state: "Delhi",
    },
  ]),
  400001: JSON.stringify([
    {
      _id: { $oid: "3" },
      address: "Fort",
      city: "Mumbai",
      state: "Maharashtra",
    },
    {
      _id: { $oid: "4" },
      address: "Colaba",
      city: "Mumbai",
      state: "Maharashtra",
    },
    {
      _id: { $oid: "5" },
      address: "Nariman Point",
      city: "Mumbai",
      state: "Maharashtra",
    },
  ]),
  700001: JSON.stringify([
    {
      _id: { $oid: "6" },
      address: "B.B.D. Bagh",
      city: "Kolkata",
      state: "West Bengal",
    },
    {
      _id: { $oid: "7" },
      address: "Dalhousie Square",
      city: "Kolkata",
      state: "West Bengal",
    },
  ]),
  600001: JSON.stringify([
    {
      _id: { $oid: "9" },
      address: "George Town",
      city: "Chennai",
      state: "Tamil Nadu",
    },
    {
      _id: { $oid: "10" },
      address: "Parrys Corner",
      city: "Chennai",
      state: "Tamil Nadu",
    },
  ]),
  500001: JSON.stringify([
    {
      _id: { $oid: "11" },
      address: "Abids",
      city: "Hyderabad",
      state: "Telangana",
    },
    {
      _id: { $oid: "12" },
      address: "Koti",
      city: "Hyderabad",
      state: "Telangana",
    },
  ]),
};
