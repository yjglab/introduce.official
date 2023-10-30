import "./globals.css";
import type { Metadata } from "next";
import { CLIENT_URL, SERVICE_NAME } from "@constants";
import { cache } from "react";
import { Hydrate, QueryClient, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { loadMyInfoAPI } from "@/api/user";
import ClientLayout from "./layout.client";
import Providers from "./providers.client";

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
  // const header = headers();
  // const cookie = header.get("Cookie");
  // await queryClient.prefetchQuery(["user"], () =>
  //   loadMyInfoAPI({ headers: cookie ? { cookie } : undefined }),
  // );
  const dehydratedState = dehydrate(queryClient);
  queryClient.clear();
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Hydrate state={dehydratedState}>
            <ClientLayout>{children}</ClientLayout>
          </Hydrate>
        </Providers>
      </body>
    </html>
  );
}
