import { AxiosRequestConfig } from "axios";
import { api } from ".";

export function signUpAPI(data: {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  position: string;
}) {
  return api.post("/auth/signup", data).then((response) => response.data);
}

export function signInAPI(data: { email: string; password: string }) {
  return api.post("/auth/signin", data).then((response) => response.data);
}

export function signOutAPI() {
  return api.post("/auth/signout").then((response) => response.data);
}

export function emailDuplicationAPI(data: { email: string }) {
  return api.post("/auth/email-duplication", data).then((response) => response.data);
}

export function emailConfirmationAPI(data: {
  email: string;
  emailConfirmationCode: string; // user input code
  assignedConfirmationCode: string;
}) {
  return api.post("/auth/email-confirmation", data).then((response) => response.data);
}
