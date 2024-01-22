"use client";

import classNames from "classnames";
import Avatar, { genConfig } from "react-nice-avatar";

interface Props {
  displayName: string;
  plan?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const UserAvatar: React.FC<Props> = ({ displayName, plan, size = "sm" }) => {
  return (
    <div
      className={classNames(
        plan === "user"
          ? "shadow-white"
          : plan === "pro"
          ? "shadow-gray-900"
          : plan === "expert"
          ? "shadow-none"
          : "",
        "relative grid overflow-hidden rounded-full p-[3px] shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200",
      )}
    >
      {(plan === "pro" || plan === "expert") && (
        <>
          {plan === "expert" && (
            <div className='w-full h-full z-10 absolute bg-gradient-to-l animate-shine bg-[700%_auto] from-indigo-600 via-cyan-400 to-purple-400' />
          )}
          <span className="spark mask-gradient animate-flip before:animate-rotate absolute inset-0 h-full w-full overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
          <span className='backdrop absolute inset-[4px] rounded-full transition-colors duration-200' />
        </>
      )}
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
  );
};
