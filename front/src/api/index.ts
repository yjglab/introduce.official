import { SERVER_URL } from "@/utils/constants";
import axios from "axios";

export const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
