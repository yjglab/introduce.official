"use client";

import { AuthOption, withAuth } from "@/utils/withAuth";
import FormSection from "./_components/FormSection";

const LoginClientPage = () => {
  return (
    <main id='Login-Client'>
      <FormSection />
    </main>
  );
};

export default withAuth(AuthOption.FORBIDDEN, LoginClientPage);
