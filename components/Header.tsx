import { getServerSession } from "next-auth";
import Navbar from "./Navbar";
export interface NavLink {
  path: string;
  label: string;
  active?: boolean;
  public?: boolean;
  protected?: boolean;
}

export const APP_NAV_LINKS: NavLink[] = [
  { label: "Dashboard", path: "/dashboard", protected: true },
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services", protected: true },
  { label: "Contact", path: "/contact", public: true },
];

export default async function Header() {
  const session = await getServerSession();
  let navLinks = APP_NAV_LINKS;

  navLinks = APP_NAV_LINKS.filter(
    (l) => (l.protected && session) || (!l.protected && !session) || l.public
  );

  return <Navbar navLinks={navLinks} session={session} />;
}
