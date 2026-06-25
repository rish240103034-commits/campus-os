import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.AUTH_PORT || 4001),

  JWT_ACCESS_SECRET:
    process.env.JWT_ACCESS_SECRET ||
    "campus_os_access_secret_2026",

  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET ||
    "campus_os_refresh_secret_2026",

  ACCESS_TOKEN_EXPIRES:
    process.env.ACCESS_TOKEN_EXPIRES || "15m",

  REFRESH_TOKEN_EXPIRES:
    process.env.REFRESH_TOKEN_EXPIRES || "7d",
};
