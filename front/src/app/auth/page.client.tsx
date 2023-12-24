"use client";

import { AuthOption, withAuth } from "@/utils/withAuth";
import FormSection from "@components/Auth/FormSection";

const AuthClientPage = () => {
  return (
    <>
      <FormSection />
    </>
  );
};

export default withAuth(AuthOption.FORBIDDEN, AuthClientPage);
