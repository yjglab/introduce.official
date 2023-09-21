import { AxiosRequestConfig } from "axios";
import { api } from ".";

export function loadMyInfoAPI(options?: AxiosRequestConfig) {
  return api.get("/user", options).then((response) => response.data);
}
