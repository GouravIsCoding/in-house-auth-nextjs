"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const authStatus = false;
  const navItems = [
    { id: 1, name: "Signin", to: "/signin", authInfo: !authStatus },
    { id: 2, name: "Signup", to: "/signup", authInfo: !authStatus },
    { id: 3, name: "Profile", to: "/profile", authInfo: authStatus },
    { id: 4, name: "Logout", to: "/logout", authInfo: authStatus },
  ];

  return (
    <>
      <nav className="bg-black min-h-12 text-white">
        <div className="py-6 px-6">
          <div className="inline-block text-2xl">InHouseAuth</div>
          <div className="float-right inline-block">
            {navItems.map(
              (item) =>
                item.authInfo && (
                  <li className="inline-block mx-2 no-underline" key={item.id}>
                    <Link
                      className={`${
                        pathname === item.to ? "text-green-500" : ""
                      }`}
                      href={item.to}
                    >
                      {item.name}
                    </Link>
                  </li>
                )
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
