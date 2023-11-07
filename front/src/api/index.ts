import { SERVER_URL } from "@constants";
import axios from "axios";
import store from "@/store";

export const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const launchApi = () => {
  console.log("api launched");
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.getState().auth.data.accessToken}`;
    console.log(config);
    return config;
  });

  api.interceptors.response.use(
    (value) => value,
    async (error) => {
      console.log("api response error", error);
      const originalConfig = error.config;

      // accessToken 발급요청이 에러를 내면 무한루프에 빠짐
      if (error.config.url === "/auth/refresh") {
        return Promise.reject(error);
      }
      if (error.response?.status === 401 && !originalConfig.retry) {
        // 권한 오류가 발생했고 재실행된(무한루프방지) 경우가 아니라면
        try {
          // await store.dispatch(sendRefreshAccessToken())

          originalConfig.headers["Authorization"] = `Bearer ${store.getState().auth.data.accessToken}`;
          originalConfig.retry = true; // 아래 내용 처리 이후 해당 요청을 재실행

          return api(originalConfig);
        } catch (_error) {
          // ***토큰발급 실패, 로그인정보 초기화 및 로그인창 이동
          // SET_SIGNOUT();
          return Promise.reject(_error);
        }
      }
      return Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  );
};
