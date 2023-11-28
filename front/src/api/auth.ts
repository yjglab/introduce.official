import { AxiosRequestConfig } from "axios";
import { api } from ".";
import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";
import { SERVER_URL } from "@constants";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export async function signUpAPI(data: { email: string; name: string; password: string; position: string }) {
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

export const instance = axios.create({
  baseURL: "http://localhost:4000",
  headers: { Authorization: `Bearer ${default_access_token}` },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    // response에서 error가 발생했을 경우 catch로 넘어가기 전에 처리
    try {
      const errResponseStatus = error.response.status;
      const errResponseData = error.response.data;
      const prevRequest = error.config;

      // access token이 만료되어 발생하는 에러인 경우
      if (errResponseData.error?.message === "jwt expired" || errResponseStatus === 401) {
        const preRefreshToken = getCookie(REFRESH_TOKEN);
        if (preRefreshToken) {
          // refresh token을 이용하여 access token 재발급
          async function regenerateToken() {
            return await axios
              .post("api/user/token", {
                refresh_token: preRefreshToken,
              })
              .then(async (res) => {
                const { access_token, refresh_token } = res.data;
                // 새로 받은 token들 저장
                setCookie(ACCESS_TOKEN, access_token, {
                  path: "/" /*httpOnly: true */,
                });
                setCookie(REFRESH_TOKEN, refresh_token, {
                  path: "/" /*httpOnly: true */,
                });

                // header 새로운 token으로 재설정
                prevRequest.headers.Authorization = `Bearer ${access_token}`;

                // 실패했던 기존 request 재시도
                return await axios(prevRequest);
              })
              .catch((e) => {
                /*
                 token 재발행 또는 기존 요청 재시도 실패 시
                 기존 token 제거
                 */
                removeCookie(ACCESS_TOKEN);
                removeCookie(REFRESH_TOKEN);
                window.location.href = "/";

                return new Error(e);
              });
          }
          return await regenerateToken();
        } else {
          throw new Error("There is no refresh token");
        }
      }
    } catch (e) {
      // 오류 내용 출력 후 요청 거절
      return Promise.reject(e);
    }
  },
);

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
