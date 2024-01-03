"use client";

import { AuthOption, withAuth } from "@/utils/withAuth";
import FormSection from "./_components/FormSection";

const RegisterClientPage = () => {
  return (
    <main id='Register-Client'>
      <FormSection />
    </main>
  );
};

export default withAuth(AuthOption.FORBIDDEN, RegisterClientPage);
