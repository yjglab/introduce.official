import { AxiosRequestConfig } from "axios";
import { api } from ".";

export function loadMyData(options?: AxiosRequestConfig) {
  return api.get("/user", options).then((response) => response.data);
}
