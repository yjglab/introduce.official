import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { loadMyInfoAPI } from "@/api/user";
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

const SignInPage = async () => {
  const header = headers();
  const cookie = header.get("Cookie");
  // const myInfo = await loadMyInfoAPI({
  //   headers: cookie ? { cookie } : undefined,
  // });
  // if (myInfo) {
  //   redirect("/");
  // }
  return <ClientPage />;
};

export default SignInPage;
