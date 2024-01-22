"use client";

import { RiSize } from "@constants/styles";
import { RiAwardFill, RiMedal2Fill, RiMedalFill, RiStarFill, RiStarHalfSFill } from "@remixicon/react";
import classNames from "classnames";
import Avatar, { genConfig } from "react-nice-avatar";

interface Props {
  displayName: string;
  plan?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const UserAvatar: React.FC<Props> = ({ displayName, plan, size = "sm" }) => {
  return (
    <>
      {plan === "pro" ? (
        <div className='relative grid overflow-hidden rounded-full p-[3px] shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] shadow-gray-800 transition-colors duration-200'>
          <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-full w-full overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          <span className='backdrop absolute inset-[4px] rounded-full transition-colors duration-200' />
          <Avatar
            className={classNames(
              size === "xs"
                ? "w-9 h-9"
                : size === "sm"
                ? "w-12 h-12"
                : size === "md"
                ? "w-16 h-16"
                : size === "xl"
                ? "w-36 h-36"
                : null,
              "z-10",
            )}
            {...genConfig(displayName)}
          />
        </div>
      ) : (
        <div className='relative rounded-full p-[2.5px] shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] shadow-white'>
          <Avatar
            className={classNames(
              size === "xs"
                ? "w-9 h-9"
                : size === "sm"
                ? "w-12 h-12"
                : size === "md"
                ? "w-16 h-16"
                : size === "xl"
                ? "w-36 h-36"
                : null,
              "z-10",
            )}
            {...genConfig(displayName)}
          />
        </div>
      )}
    </>
  );
};
