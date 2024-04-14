"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logoutButton";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import CONFIG from "@/config";

export default function Navbar() {
  const pathname = usePathname();
  const [authStatus, setAuthStatus] = useState(false);

  const navItems = [
    { id: 1, name: "Signin", to: "/signin", authInfo: !authStatus },
    { id: 2, name: "Signup", to: "/signup", authInfo: !authStatus },
    { id: 3, name: "Profile", to: "/profile", authInfo: authStatus },
  ];
  useEffect(() => {
    axios
      .get(`${CONFIG.DOMAIN}/api/user/authstatus`)
      .then((res) => {
        const auth = res.data.authStatus;
        setAuthStatus(auth);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const auth = error.response?.data.authStatus;
          setAuthStatus(auth);
        }
      });
  }, []);

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
            {authStatus && <LogoutButton />}
          </div>
        </div>
      </nav>
    </>
  );
}
