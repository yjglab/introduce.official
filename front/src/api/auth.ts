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
