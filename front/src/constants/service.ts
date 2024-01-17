export const DEVELOPMENT = process.env.NODE_ENV === "development";

export const SERVICE_NAME = "introduce";
export const CLIENT_PORT = 3000;
export const SERVER_PORT = 3040;
export const CLIENT_URL = !DEVELOPMENT ? "https://" : `http://localhost:${CLIENT_PORT}`;
export const SERVER_URL = !DEVELOPMENT ? "https://" : `http://localhost:${SERVER_PORT}/api`;
