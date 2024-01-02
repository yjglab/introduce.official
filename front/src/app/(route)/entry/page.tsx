import React from "react";
import { Metadata } from "next";
import ClientPage from "./page.client";

export async function generateMetadata() {
  return {
    title: "회원가입",
    description: "인트로듀스에 회원가입",
    openGraph: {
      title: "회원가입",
      description: "인트로듀스에 회원가입",
    },
  } as Metadata;
}

const EntryPage = async () => {
  return (
    <>
      <ClientPage />
    </>
  );
};

export default EntryPage;
