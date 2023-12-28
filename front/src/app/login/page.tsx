import { headers } from "next/headers";
import ClientPage from "./page.client";
import { Metadata } from "next";

export async function generateMetadata() {
  return {
    title: "로그인",
    description: "로그인 페이지",
    openGraph: {
      title: "로그인",
      description: "로그인 페이지",
    },
  } as Metadata;
}

const LoginPage = async () => {
  const header = headers();
  const cookie = header.get("Cookie");
  return <ClientPage />;
};

export default LoginPage;
