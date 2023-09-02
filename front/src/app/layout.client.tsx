"use client";

import useMyInfoQuery from "@/hooks/queries/useMyInfo";
import classNames from "classnames";
import { Noto_Sans } from "next/font/google";

const font = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  const { data: me } = useMyInfoQuery();

  return <main className={classNames(font.className)}>{children}</main>;
}
