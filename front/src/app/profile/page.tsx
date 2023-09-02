import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { loadMyInfo } from "@/api/user";
import ClientPage from "./page.client";

const ProfilePage = async () => {
  const header = headers();
  const cookie = header.get("Cookie");
  const data = await loadMyInfo({
    headers: cookie ? { cookie } : undefined,
  });
  if (!data) {
    redirect("/");
  }
  return <ClientPage />;
};

export default ProfilePage;
