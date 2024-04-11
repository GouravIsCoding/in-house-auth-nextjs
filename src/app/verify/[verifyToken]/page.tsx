"use client";

import { Button } from "@/components/ui/button";
import CONFIG from "@/config";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Page({ params }: { params: { verifyToken: string } }) {
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const onClick = async () => {
    setErr(() => null);
    setMsg(() => null);
    axios
      .post(`${CONFIG.DOMAIN}/api/user/verify`, {
        verifyToken: params.verifyToken,
      })
      .then((res) => {
        const { error, message } = res.data;
        if (error) return setErr(() => error);
        if (message) return setMsg(() => message);
      })
      .catch((error) => {
        setErr(() => error.response.data.message);
      });
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        {(msg && (
          <div className="bg-green-700 p-4 rounded-lg text-white">{msg}</div>
        )) ||
          (err && (
            <div className="bg-red-700 p-4 rounded-lg text-white">{err}</div>
          )) || (
            <Button onClick={onClick} variant={"default"}>
              Click to verify
            </Button>
          )}
      </div>
    </>
  );
}
