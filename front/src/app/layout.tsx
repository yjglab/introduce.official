import "./globals.css";
import type { Metadata, Viewport } from "next";
import { CLIENT_URL, SERVICE_NAME } from "@/utils/constants";
import { Provider } from "react-redux";
import store from "@/store";
import { Noto_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import classNames from "classnames";
import QueryProvider from "./(providers)/QueryProvider";
import PrelineLoader from "./(providers)/PrelineLoader";
import Navigation from "./_common/_Navigation";
import { ReduxProvider } from "./(providers)/ReduxProvider";
import { NextThemeProvider } from "./(providers)/NextThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
export const metadata: Metadata = {
  metadataBase: new URL(CLIENT_URL),
  title: {
    template: `%s | ${SERVICE_NAME}`,
    default: SERVICE_NAME,
  },
  description: "설명",
  manifest: "/manifest/manifest.json",
  openGraph: {
    title: SERVICE_NAME,
    description: "설명",
    url: CLIENT_URL,
    siteName: SERVICE_NAME,
    images: [
      {
        url: "/manifest/icon-192x192.png",
        alt: "logo",
        width: 192,
        height: 192,
      },
    ],
  },
  icons: "/images/common/icon.png",
};

const font = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='!overflow-clip'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css'
        />
      </head>
      <body className=''>
        <PrelineLoader />
        <NextThemeProvider>
          <QueryProvider>
            <ReduxProvider>
              <Navigation />
              <div id='layout' className={(classNames(font.className), "mt-16")}>
                {children}
              </div>
              <ToastContainer />
            </ReduxProvider>
          </QueryProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
