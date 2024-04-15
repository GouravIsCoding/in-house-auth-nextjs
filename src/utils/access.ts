import CONFIG from "@/config";
import axios from "axios";

export default async function accessRetry(fn: () => Promise<boolean>) {
  try {
    const response = await fn();
    if (response) {
      await axios.post(`${CONFIG.DOMAIN}/api/user/access`);
      await fn();
    }
  } catch (error) {
    console.log(error);
  }
}
