/* eslint-disable @next/next/no-img-element */
"use client";

import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./Button";
import { NavLink } from "./Header";
import NavItem from "./NavItem";
import UserMenu from "./UserMenu";

export default function Navbar({
  navLinks,
  session,
}: {
  navLinks: NavLink[];
  session?: Session | null;
}) {
  const [isHidden, setIsHidden] = useState(true);
  const newNavLinks = [...navLinks];
  const pathname = usePathname();

  newNavLinks.forEach((l) => {
    l.active = l.path === pathname;
  });

  return (
    <nav className="bg-white w-full z-20 top-0 left-0 border-b border-gray-200">
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
          {!session ? (
            <>
              <Link href="/login">
                <Button className="mr-2 px-5">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button className="mr-2 md:mr-0" type="blue">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <UserMenu {...session} />
          )}
          <button
            type="button"
            data-collapse-toggle="navbar-sticky"
            className="inline-flex items-center p-2 w-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
            {newNavLinks?.map((link, index) => {
              return <NavItem key={index} {...link} />;
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
