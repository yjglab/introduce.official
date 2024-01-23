"use client";

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
      alt={images[name]}
      className='object-cover rounded-full w-7 h-7 absolute bottom-1.5'
    />
  );
};

export default TechIcon;
