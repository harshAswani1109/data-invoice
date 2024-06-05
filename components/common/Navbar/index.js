import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="flex flex-wrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800 fixed">
      <nav className="max-w-[85rem] w-full mx-auto px-4" aria-label="Global">
        <div className="flex items-center justify-between">
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="/"
          >
            Man Fashion
          </Link>
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="/similarPincode"
          >
            similarPincode
          </Link>
          <Link
            className="flex-none text-xl font-semibold dark:text-white"
            href="/similarAddress"
          >
            SimilarAddress
          </Link>
          <div className="">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <svg
                className="hs-collapse-open:hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        {/* <div id="navbar-with-collapse" className="hidden basis-full grow sm:block">
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
            <a
              className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              href="#"
              aria-current="page"
            >
              Landing
            </a>
          </div>
        </div> */}
      </nav>
    </header>
  );
}
