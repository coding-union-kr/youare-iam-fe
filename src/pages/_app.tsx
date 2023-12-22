import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';
import { NextPageWithLayout } from '@/types/page';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/error/ErrorFallback';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type ErrorFallbackProp = {
  resetErrorBoundary: (...args: any[]) => void;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }: ErrorFallbackProp) => (
                  <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                )}
              >
                {getLayout(<Component {...pageProps} />)}
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
