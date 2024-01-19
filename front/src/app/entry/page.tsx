import React from "react";
import { Metadata } from "next";
import MainSection from "./_components/MainSection";
import PageContainer from "@app/_common/Container/PageContainer";

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
    <PageContainer pageName='Entry Page'>
      <MainSection />
    </PageContainer>
  );
};

export default EntryPage;
