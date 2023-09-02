const PRODUCTION = process.env.NODE_ENV === "production";
const SERVICE_NAME = "Hulter";
const SERVER_PORT = 1001;
const SERVER_URL = PRODUCTION ? "https://" : `http://localhost:${SERVER_PORT}`;

module.exports = {
  PRODUCTION,
  SERVICE_NAME,
  SERVER_PORT,
  SERVER_URL,
};
