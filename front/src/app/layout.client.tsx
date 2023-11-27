"use client";

import store from "@/store";
import Navigation from "@components/Common/Navigation";
import classNames from "classnames";
import { Noto_Sans } from "next/font/google";
import { headers } from "next/headers";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const font = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});

export default function RootClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Navigation />
      <div id='layout' className={classNames(font.className)}>
        {children}
      </div>
      <ToastContainer />
    </Provider>
  );
}
