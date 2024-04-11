interface config {
  DOMAIN: string;
  REFRESH_TOKEN: Uint8Array;
  ACCESS_TOKEN: Uint8Array;
  MAILTRAP_USER: string;
  MAILTRAP_PASS: string;
}

const CONFIG: config = {
  DOMAIN: "http://localhost:3000",
  REFRESH_TOKEN: new TextEncoder().encode(process.env.REFRESH_TOKEN!),
  ACCESS_TOKEN: new TextEncoder().encode(process.env.ACCESS_TOKEN!),
  MAILTRAP_USER: process.env.MAILTRAP_USER!,
  MAILTRAP_PASS: process.env.MAILTRAP_PASS!,
};

export default CONFIG;
