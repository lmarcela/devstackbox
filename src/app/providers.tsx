'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from '@/components/SnackbarProvider';
import ColorModeProvider from '@/theme/ColorModeContext';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <QueryClientProvider client={queryClient}>
        <ColorModeProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ColorModeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
