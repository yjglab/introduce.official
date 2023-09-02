import { AxiosRequestConfig } from "axios";
import { api } from ".";

export function loadMyInfo(options?: AxiosRequestConfig) {
  return api.get(`/user`).then((response) => response.data);
}
