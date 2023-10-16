import { getServerSession } from "next-auth";
import { headers } from "next/headers";
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

  navLinks.forEach((l) => {
    l.active = process.env.NEXTAUTH_URL + l.path === headers().get("x-url");
  });

  return <Navbar defNavLinks={navLinks} />;
}
