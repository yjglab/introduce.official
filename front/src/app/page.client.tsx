"use client";

import React, { FC, useState } from "react";
import ProjectsSection from "@components/Root/ProjectsSection";

interface Props {
  initialData?: null;
}

const RootClientPage: FC<Props> = ({ initialData }) => {
  return <ProjectsSection />;
};

export default RootClientPage;
