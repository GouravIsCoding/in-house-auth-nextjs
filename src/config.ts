interface config {
  DOMAIN: string;
  REFRESH_TOKEN: string;
  ACCESS_TOKEN: string;
  MAILTRAP_USER: string;
  MAILTRAP_PASS: string;
}

const CONFIG: config = {
  DOMAIN: "http://localhost:3000",
  REFRESH_TOKEN: process.env.REFRESH_TOKEN!,
  ACCESS_TOKEN: process.env.ACCESS_TOKEN!,
  MAILTRAP_USER: process.env.MAILTRAP_USER!,
  MAILTRAP_PASS: process.env.MAILTRAP_PASS!,
};

export default CONFIG;
