import { useActivePathnameStore } from "@/store/active-pathname";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavLink } from "./Header";

export default function NavItem(props: NavLink) {
  const { activePathname, setActivePathname } = useActivePathnameStore();
  const [hasMounted, setHasMounted] = useState(false);
  const handleClick = () => {
    setActivePathname(props.path);
  };

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);

      if (props.active) {
        setActivePathname(props.path);
      }
    }
  }, [setActivePathname, hasMounted, props.active, props.path]);

  const isActive =
    activePathname === props.path || (props.active && !hasMounted);

  return (
    <li key={props.label}>
      <Link
        onClick={handleClick}
        href={props.path}
        className={`block py-2 pl-3 pr-4 ${
          isActive
            ? `text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:p-0 rounded`
            : `text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0`
        }`}
      >
        {props.label}
      </Link>
    </li>
  );
}
