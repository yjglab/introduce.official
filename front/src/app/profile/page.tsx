import React from "react";
import { Metadata } from "next";
import PageContainer from "@app/_common/Container/PageContainer";

export async function generateMetadata() {
  return {
    title: "내 프로필",
    description: "",
    openGraph: {
      title: "내 프로필",
      description: "",
    },
  } as Metadata;
}

const ProfilePage = async () => {
  return <PageContainer pageName='Profile Page'>profile</PageContainer>;
};

export default ProfilePage;
