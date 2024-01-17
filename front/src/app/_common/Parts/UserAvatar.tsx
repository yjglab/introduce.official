"use client";

import classNames from "classnames";
import Avatar, { genConfig } from "react-nice-avatar";

interface Props {
  displayName: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const UserAvatar: React.FC<Props> = ({ displayName, size = "sm" }) => {
  return (
    <Avatar
      className={classNames(
        size === "sm" ? "w-12 h-12" : size === "md" ? "w-16 h-16" : size === "xl" ? "w-36 h-36" : null,
        "border-2 border-gray-200 dark:border-white",
      )}
      {...genConfig(displayName)}
    />
  );
};
