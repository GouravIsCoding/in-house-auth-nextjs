import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import CONFIG from "@/config";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton({
  setAuthStatus,
}: {
  setAuthStatus: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const onclick = async () => {
    try {
      const res = await axios.post(`${CONFIG.DOMAIN}/api/user/logout`);
      setAuthStatus(false);
      const message = res.data.message;
      console.log(message);
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.message;
        console.log(message);
      }
    }
  };

  return (
    <>
      <Button variant={"outline"} className="text-black" onClick={onclick}>
        Logout
      </Button>
    </>
  );
}
