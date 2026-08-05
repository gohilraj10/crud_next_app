"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "n@/api/queryClient";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
