"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormSection from "@components/Login/FormSection";

const LoginClientPage = () => {
  const router = useRouter();
  return (
    <main className='mt-40 flex justify-center'>
      <FormSection />
    </main>
  );
};

export default LoginClientPage;
