import { AxiosRequestConfig } from "axios";
import { api } from ".";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { SERVER_URL } from "@constants";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export async function signUpAPI(data: {
  email: string;
  nickname: string;
  password: string;
  position: string;
}) {
  const response = await api.post("/auth/signup", data);
  return response.data;
}

export async function signInAPI(data: { email: string; password: string }) {
  const response = await api.post("/auth/signin", data);
  return response.data;
}

export async function signOutAPI() {
  const response = await api.post("/auth/signout");
  return response.data;
}

export async function emailDuplicationAPI(data: { email: string }) {
  const response = await api.post("/auth/email-duplication", data);
  return response.data;
}

export async function emailConfirmationAPI(data: {
  email: string;
  userInputCode: string; // user input code
  confirmationCode: string;
}) {
  console.log(data);
  const response = await api.post("/auth/email-confirmation", data);
  return response.data;
}

// export async function refreshAccessToken() {
//   const response = await api.get("/auth/refresh");
//   return response.data;
// }

// export async function retainAuthAPI(options?: AxiosRequestConfig) {
//   const response = await api.get("/auth/retain", options);
//   return response.data;
// }

// export async function retainAuthAPI(data: { accessToken?: string }) {
//   const response = await api.post("/auth/retain", data);
//   return response.data;
// }
