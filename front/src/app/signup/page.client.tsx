"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMyInfoQuery from "@/hooks/queries/useMyInfo";
import FormSection from "@components/SignUp/FormSection";

const SignUpClientPage = () => {
  const router = useRouter();
  // const { data: myData } = useMyInfoQuery();
  // useEffect(() => {
  //   if (myData) router.push("/");
  // }, [myData, router]);
  return (
    <main className='mt-40 flex justify-center'>
      <FormSection />
    </main>
  );
};

export default SignUpClientPage;
