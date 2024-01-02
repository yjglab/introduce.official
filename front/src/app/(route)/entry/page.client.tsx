"use client";

import { AuthOption, withAuth } from "@/utils/withAuth";
import FormSection from "./_components/FormSection";

const EntryClientPage = () => {
  return (
    <main id='EntryClientPage'>
      <FormSection />
    </main>
  );
};

export default withAuth(AuthOption.FORBIDDEN, EntryClientPage);
