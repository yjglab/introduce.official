import TechIcon from "@app/_common/Parts/TechIcon";
import { FC } from "react";

interface Props {
  name: string;
}
const TechBadge: FC<Props> = ({ name }) => {
  return (
    <div className='w-[38px] h-full overflow-hidden bg-white dark:bg-gray-800 rounded-b-3xl shadow-lg flex justify-center relative'>
      <TechIcon name={name} />
    </div>
  );
};

export default TechBadge;
