import React from "react";
import { Metadata } from "next";
import FormSection from "./_components/_FormSection";

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

const AuthPage = async () => {
  return (
    <main id='AuthPage'>
      <FormSection />
    </main>
  );
};

export default AuthPage;

// export default withAuth(AuthOption.FORBIDDEN, AuthClientPage);
