import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { loadMyInfoAPI } from "@/api/user";
import ClientPage from "./page.client";
import { Metadata } from "next";

export async function generateMetadata() {
  return {
    title: "내 프로필",
    description: "반응형 웹 서비스 개발자, 육재경입니다.",
    openGraph: {
      title: "내 프로필",
      description: "반응형 웹 서비스 개발자, 육재경입니다.",
    },
  } as Metadata;
}

const ProfilePage = async () => {
  const header = headers();
  const cookie = header.get("Cookie");
  // const data = await loadMyInfoAPI({
  //   headers: cookie ? { cookie } : undefined,
  // });
  // if (!data) {
  //   redirect("/");
  // }
  return <ClientPage />;
};

export default ProfilePage;
