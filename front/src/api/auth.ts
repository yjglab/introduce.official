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

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(SERVER_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });
  console.log("refreshed");

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const res = await fetch(SERVER_URL + "/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status == 401) {
          console.log(res.statusText);

          return null;
        }
        const user = await res.json();
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

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
