"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMyInfoQuery from "@/hooks/queries/useMyInfo";

const ProfileClientPage = () => {
  const router = useRouter();
  const { data: me } = useMyInfoQuery();
  useEffect(() => {
    if (!me) router.push("/");
  }, [me, router]);
  return <>profile</>;
};

export default ProfileClientPage;
