import React from "react";
import { Metadata } from "next";
import MainSection from "./_components/MainSection";

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
    <main id='Entry-Client' className='min-h-screen'>
      <MainSection />
    </main>
  );
};

export default EntryPage;
