import type { PropsWithChildren } from "react";
import { AuthProvider } from "./auth";
import { ConvexProvider } from "./convex";
import { QueryClientProvider } from "./query-client";
import { ThemeProvider } from "./theme";

export function DefaultProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <ConvexProvider>
          <AuthProvider>{children}</AuthProvider>
        </ConvexProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
