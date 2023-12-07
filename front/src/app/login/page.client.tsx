"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormSection from "@components/Login/FormSection";

const LoginClientPage = () => {
  const router = useRouter();
  // const { data: myInfo } = useMyInfoQuery();
  // useEffect(() => {
  //   if (myInfo) router.push("/");
  // }, [myInfo, router]);
  return (
    <main className='mt-40 flex justify-center'>
      <FormSection />
    </main>
  );
};

export default LoginClientPage;
