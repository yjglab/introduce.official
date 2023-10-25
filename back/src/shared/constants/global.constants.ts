//eslint-disable-next-line
require('dotenv').config();

export const PRODUCTION = process.env.NODE_ENV === 'production';
export const SERVICE_NAME = 'Hoolter';
export const SERVER_PORT = 1001;
export const SERVER_URL = PRODUCTION
  ? 'https://'
  : `http://localhost:${SERVER_PORT}`;
