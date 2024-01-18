import React, { FC } from "react";

import OverlayContainer from "@app/_common/Parts/OverlayContainer";

interface Props {
  params: {
    name: string;
  };
}

const ProjectOverlayPage: FC<Props> = ({ params }) => {
  return <OverlayContainer>{params.name}</OverlayContainer>;
};

export default ProjectOverlayPage;
