"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMyInfoQuery from "@/hooks/queries/useMyInfo";
import FormSection from "@components/SignIn/FormSection";

const SignInClientPage = () => {
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

export default SignInClientPage;
