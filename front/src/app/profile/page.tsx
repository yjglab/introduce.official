import React from "react";
import { Metadata } from "next";

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
  return <main id='ProfilePage'>Profile</main>;
};

export default ProfilePage;
