"use client";

import { AuthOption, withAuth } from "@/utils/withAuth";
import MainSection from "./_components/MainSection";

const EntryClientPage = () => {
  return (
    <main id='Entry-Client' className='min-h-screen'>
      <MainSection />
    </main>
  );
};

export default withAuth(AuthOption.FORBIDDEN, EntryClientPage);
