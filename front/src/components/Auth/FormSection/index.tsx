"use client";

import { useState } from "react";
import Link from "next/link";

import { SERVER_URL } from "@/utils/constants";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const FormSection = () => {
  const [FormType, setFormType] = useState<"login" | "register">("login");
  const [ApiErrors, setAPIErrors] = useState<any>({});

  const changeForm = (formType: "login" | "register") => {
    setAPIErrors({});
    setFormType(formType);
  };

  return (
    <>
      <RegisterForm ApiErrors={ApiErrors} setAPIErrors={setAPIErrors} />
    </>
  );
};

export default FormSection;
