"use client";

import Link from "next/link";
import React, { useState } from "react";
// import logo from "@/public/logo.png";
import { COMPANY_NAME, NAV_ITEMS } from "@/constants";
import { FaBars, FaTimes } from "react-icons/fa"; // Add this import

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#ffffff50] backdrop-blur-md fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 md:p-2 mx-auto">
        <Link href="/" className="flex items-center rtl:space-x-reverse">
          {/* <img src={logo.src} className="h-10" alt={COMPANY_NAME} /> */}
          <span className="text-2xl font-semibold">
            <span className="font-serif text-blue-700">{COMPANY_NAME}</span>
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          className="inline-flex items-center justify-center w-10 h-10 p-2 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-2 px-3 rounded md:p-0 ${
                    item.isActive
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700"
                  }`}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
