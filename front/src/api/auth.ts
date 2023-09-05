import { AxiosRequestConfig } from "axios";
import { api } from ".";

export function signUpAPI(data: {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  position: string;
}) {
  return api.post("/auth/signup", data).then((response) => response.data);
}
