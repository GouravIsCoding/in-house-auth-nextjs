import CONFIG from "@/config";
import axios, { AxiosError } from "axios";

export default async function accessRetry(fn: () => any) {
  try {
    const response = await fn();
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const accessStatus = error.response?.data?.accessTokenNeeded;
      console.log(`\n\n\n\n\n\n${accessStatus}\n\n\n\n\n\n`);
      if (accessStatus) {
        try {
          const res = await axios.post(`${CONFIG.DOMAIN}/api/user/access`);

          console.log(`\n\n\n\n\n\n${res.data.message}\n\n\n\n\n\n`);

          return await fn();
        } catch (error) {
          if (error instanceof AxiosError) return error.response;
        }
      }
    }
  }
}
