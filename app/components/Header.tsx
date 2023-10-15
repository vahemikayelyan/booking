import { getServerSession } from "next-auth";
import Navbar from "./Navbar";

export interface NavLink {
  path: string;
  label: string;
  active?: boolean;
  protected?: boolean;
}

export const APP_NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services", protected: true },
  { label: "Contact", path: "/contact" },
];

export default async function Header() {
  const session = await getServerSession();
  let navLinks = APP_NAV_LINKS;

  if (!session) {
    navLinks = APP_NAV_LINKS.filter((l) => !l.protected);
  }

  return <Navbar defNavLinks={navLinks} />;
}
