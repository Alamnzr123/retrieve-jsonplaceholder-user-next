"use client";

import React from "react";
import { DarkThemeToggle } from "flowbite-react";
export default function Index({ onSearch }: any) {
  const onSearchbarChange = (event: any) => {
    onSearch(event.target.value);
  };
  return (
    <>
      <div className="flex items-center gap-3">
        <DarkThemeToggle />
        <form className="mx-auto max-w-md">
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="size-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={onSearchbarChange}
              type="search"
              id="default-search"
              className="block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search"
              required
            />
          </div>
        </form>
      </div>
    </>
  );
}
