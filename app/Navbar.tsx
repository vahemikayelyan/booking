"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const defNavLinks: { label: string; path: string; active?: boolean }[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [navLinks, setNavLinks] = useState(defNavLinks);
  const [isHidden, setIsHidden] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    defNavLinks.forEach((link) => {
      link.active = link.path === pathname;
    });
    setNavLinks([...defNavLinks]);
  }, [pathname]);

  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Flowbite
          </span>
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2"
          >
            Sign In
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 mr-2 text-center md:mr-0"
          >
            Sign Up
          </button>
          <button
            type="button"
            data-collapse-toggle="navbar-sticky"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setIsHidden(!isHidden)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          id="navbar-sticky"
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isHidden ? "hidden" : ""
          }`}
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            {navLinks.map((link) => (
              <li key={link.label} onClick={() => setIsHidden(true)}>
                <Link
                  href={link.path}
                  className={`block py-2 pl-3 pr-4 ${
                    link.active
                      ? `text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 rounded`
                      : `text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0`
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
