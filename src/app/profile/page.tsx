import CONFIG from "@/config";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

export default async function Page() {
  let user, message;
  try {
    const res = await axios.get(`${CONFIG.DOMAIN}/api/user/profile`, {
      headers: {
        Cookie: cookies().toString(),
      },
    });
    message = res.data.message;
    user = res.data.user;
  } catch (error) {
    if (error instanceof AxiosError) message = error.response?.data.message;
  }

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center flex-col">
        {message && (
          <div className="bg-green-700 p-4 rounded-lg text-white">
            {message}
          </div>
        )}
        {user && (
          <div className="p-4 shadow-md">
            <h1 className="text-lg font-semibold">Details</h1>
            <p>
              Name: {user.firstname} {user.lastname}
            </p>
            <p>ID: {user.id}</p>
            <p>E-mail: {user.email}</p>
          </div>
        )}
      </div>
    </>
  );
}
