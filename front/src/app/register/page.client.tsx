"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormSection from "@components/Register/FormSection";

const RegisterClientPage = () => {
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

export default RegisterClientPage;
