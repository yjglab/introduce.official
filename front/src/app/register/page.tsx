import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import ClientPage from "./page.client";
import { Metadata } from "next";

export async function generateMetadata() {
  return {
    title: "회원가입",
    description: "훌터에 회원가입하고 프로젝트를 업로드해보세요!",
    openGraph: {
      title: "회원가입",
      description: "훌터에 회원가입하고 프로젝트를 업로드해보세요!",
    },
  } as Metadata;
}

const RegisterPage = async () => {
  // const header = headers();
  // const cookie = header.get("Cookie");
  // const myData = await loadMyInfoAPI({
  //   headers: cookie ? { cookie } : undefined,
  // });
  // if (myData) {
  //   redirect("/");
  // }
  return <ClientPage />;
};

export default RegisterPage;
