"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { FC, useMemo } from "react";

interface Props {
  children?: React.ReactNode;
}

const QueryProvider: FC<Props> = ({ children }) => {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retryOnMount: true,
            refetchOnReconnect: false,
            retry: false,
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default QueryProvider;
