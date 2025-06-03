'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from '@/components/SnackbarProvider';
import ColorModeProvider from '@/theme/ColorModeContext';
import { getQueryClient } from './get-query-client';

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
