"use client";

import TechIcon from "@app/_common/Parts/TechIcon";
import Tooltip from "@app/_common/Parts/Tooltip";
import { FC } from "react";

interface Props {
  name: string;
  index: number;
}
const TechBadge: FC<Props> = ({ name, index }) => {
  return (
    <div className='flex w-[32px] h-full overflow-hidden bg-white dark:bg-gray-800 rounded-b-3xl shadow-lg shadow-black/30 justify-center relative'>
      <TechIcon name={name} />
    </div>
  );
};

export default TechBadge;
