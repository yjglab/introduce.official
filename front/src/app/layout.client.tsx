"use client";

import Navigation from "@components/Common/Navigation";
import classNames from "classnames";
import { Noto_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <div id='layout' className={classNames(font.className)}>
        {children}
      </div>
      <ToastContainer />
    </>
  );
}
