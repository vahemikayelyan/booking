/* eslint-disable @next/next/no-img-element */
import { useOutsideClick } from "@/utils/shared";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import { useRef, useState } from "react";

function UserMenu(props: DefaultSession) {
  const [isHidden, setIsHidden] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setIsHidden(true);
  });

  return (
    <div ref={ref} className="flex items-center md:order-2">
      <button
        type="button"
        onClick={() => setIsHidden(!isHidden)}
        className="flex relative mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="user photo"
        />
      </button>
      <div
        className={`${
          isHidden ? "hidden " : ""
        }z-50 absolute top-[40px] right-[10px] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            {props.user?.email}
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => {
                setIsHidden(true);
                signOut({ callbackUrl: "/login" });
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default UserMenu;
