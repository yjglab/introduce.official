"use client";

import classNames from "classnames";
import Avatar, { genConfig } from "react-nice-avatar";

interface Props {
  displayName: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const UserAvatar: React.FC<Props> = ({ displayName, size = "sm" }) => {
  return (
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
        "border-2 border-white",
      )}
      {...genConfig(displayName)}
    />
  );
};
