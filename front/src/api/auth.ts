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

export async function logoutAPI() {
  return await api.delete("/auth/logout");
}
