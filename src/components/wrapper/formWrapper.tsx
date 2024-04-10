import React from "react";

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="bg-black text-white w-1/2 min-h-svh p-6 md:flex flex-col justify-between items-start hidden">
          <h1 className="font-semibold text-lg">Signin Now</h1>
          <h1>Built by Gourav Thakur, powered by NextJS</h1>
        </div>
        <div className="bg-white w-full md:w-1/2  h-screen">
          <div className="max-w-[70%] mx-auto mt-12 md:p-6">{children}</div>
        </div>
      </div>
    </>
  );
}
