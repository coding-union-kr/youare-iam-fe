import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
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
import { LazyMotion, domAnimation } from 'framer-motion';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

declare global {
  interface Window {
    Kakao: any;
  }
}

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

  function kakaoInit() {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        onLoad={kakaoInit}
      ></Script>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <LazyMotion features={domAnimation}>
              <QueryErrorResetBoundary>
                {({ reset }) => (
                  <ErrorBoundary
                    onReset={reset}
                    fallbackRender={({
                      resetErrorBoundary,
                    }: ErrorFallbackProp) => (
                      <ErrorFallback resetErrorBoundary={resetErrorBoundary} />
                    )}
                  >
                    {getLayout(<Component {...pageProps} />)}
                  </ErrorBoundary>
                )}
              </QueryErrorResetBoundary>
            </LazyMotion>
          </HydrationBoundary>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
