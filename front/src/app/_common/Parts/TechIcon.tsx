import techImages from "@/utils/techImages";
import { FC } from "react";

interface Props {
  name: string;
}
interface TechImages {
  [key: string]: string;
}
const TechIcon: FC<Props> = ({ name }) => {
  const images = techImages as TechImages;
  return (
    <img
      src={images[name]}
      alt='tech-icon-image'
      className='object-cover rounded-full w-8 h-8 absolute bottom-1.5'
    />
  );
};

export default TechIcon;
