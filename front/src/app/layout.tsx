import "./globals.css";
import type { Metadata } from "next";
import { cache } from "react";
import { Hydrate, QueryClient, dehydrate } from "@tanstack/react-query";
import ClientLayout from "./layout.client";
import Providers from "./providers.client";
import { CLIENT_URL, SERVICE_NAME } from "@/utils/constants";
import PrelineLoader from "./prelineLoader";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SERVICE_NAME}`,
    default: SERVICE_NAME,
  },
  description: "설명",
  viewport: "width=device-width, initial-scale=1.0",
  verification: {
    google: "",
  },
  manifest: "/manifest/manifest.json",
  openGraph: {
    // sns platform share data
    title: SERVICE_NAME,
    description: "설명",
    url: CLIENT_URL,
    siteName: SERVICE_NAME,
    type: "website",
    locale: "ko_KR",
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

const getQueryClient = cache(() => new QueryClient());

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();
  return (
    <html lang='en'>
      <head>
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.css'
        />
      </head>
      <body>
        <Providers>
          <Hydrate state={dehydratedState}>
            <ClientLayout>{children}</ClientLayout>
          </Hydrate>
        </Providers>
        <PrelineLoader />
      </body>
    </html>
  );
}
