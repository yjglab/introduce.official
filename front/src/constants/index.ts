export const PRODUCTION = process.env.NODE_ENV === "production";

export const SERVICE_NAME = "Hoolter";
export const CLIENT_PORT = 1000;
export const SERVER_PORT = 1001;
export const CLIENT_URL = PRODUCTION ? "" : `http://localhost:${CLIENT_PORT}`;
export const SERVER_URL = PRODUCTION ? "https://" : `http://localhost:${SERVER_PORT}`;
