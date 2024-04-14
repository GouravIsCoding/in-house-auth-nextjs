import { Button } from "../ui/button";
import axios, { AxiosError } from "axios";
import CONFIG from "@/config";

export default function LogoutButton() {
  const onclick = async () => {
    try {
      const res = await axios.post(`${CONFIG.DOMAIN}/api/user/logout`);
      const message = res.data.message;
      console.log(message);
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
