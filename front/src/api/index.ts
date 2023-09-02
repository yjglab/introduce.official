import { SERVER_URL } from "@constants";
import axios from "axios";

export const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
