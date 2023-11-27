import { AxiosRequestConfig } from "axios";
import { api } from ".";

export async function loadMyInfoAPI(options?: AxiosRequestConfig) {
  return api.get("/user", options).then((response) => response.data);
}
