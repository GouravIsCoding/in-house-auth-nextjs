"use client";
import CONFIG from "@/config";
import accessRetry from "@/utils/access";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [msg, setMsg] = useState<string | null>(null);
  const [usr, setUsr] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const response = await accessRetry(async () => {
        return await axios.get(`${CONFIG.DOMAIN}/api/user/profile`);
      });
      console.log(response);
      const { user, message } = response?.data;
      setMsg(message);
      setUsr(user);
    })();
  }, []);

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center flex-col">
        {msg && (
          <div className="bg-green-700 p-4 rounded-lg text-white">{msg}</div>
        )}
        {usr && (
          <div className="p-4 shadow-md">
            <h1 className="text-lg font-semibold">Details</h1>
            <p>
              Name: {usr.firstname} {usr.lastname}
            </p>
            <p>ID: {usr.id}</p>
            <p>E-mail: {usr.email}</p>
          </div>
        )}
      </div>
    </>
  );
}
