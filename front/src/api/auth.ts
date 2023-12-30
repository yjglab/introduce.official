import { api } from ".";

export async function registerAPI(data: {
  email: string;
  displayName: string;
  password: string;
  position: string;
}) {
  const response = await api.post("/auth/local/register", data);
  return response.data;
}

export async function loginAPI(data: { email: string; password: string }) {
  const response = await api.post("/auth/local/login", data);
  return response.data;
}

export async function logoutAPI() {
  return await api.delete("/auth/logout");
}

export async function loadMeAPI() {
  const response = await api.get("/auth/me").then((response) => response.data);
  return response.data;
}
