import "./globals.css";
import type { Metadata, Viewport } from "next";
import { CLIENT_URL, SERVICE_NAME } from "@/utils/constants";
import { Noto_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import classNames from "classnames";
import QueryProvider from "./(providers)/QueryProvider";
import PrelineScript from "./(providers)/PrelineScript";
import Navigation from "./_common/Navigation";
import { ReduxProvider } from "./(providers)/ReduxProvider";
import { NextThemeProvider } from "./(providers)/NextThemeProvider";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { loadMeAPI } from "@api/auth";

const font = Noto_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const header = headers();
  const cookie = header.get("Cookie");
  if (cookie) {
    await queryClient.prefetchQuery({
      queryKey: ["data-me"],
      queryFn: () => loadMeAPI({ headers: { cookie } }),
    });
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <html lang='en' suppressHydrationWarning={true} className='!overflow-clip'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css'
        />
      </head>
      <body className={(classNames(font.className), "mt-16 dark:bg-gray-800 min-h-screen w-full")}>
        <QueryProvider>
          <HydrationBoundary state={dehydratedState}>
            <ReduxProvider>
              <NextThemeProvider>
                <Navigation />
                <div id='Root-Layout' className='max-w-7xl mx-auto'>
                  {children}
                </div>
              </NextThemeProvider>
            </ReduxProvider>
          </HydrationBoundary>
          {/* <ToastContainer /> */}
        </QueryProvider>
      </body>
      <PrelineScript />
    </html>
  );
}
