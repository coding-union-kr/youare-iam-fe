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
import { Toaster } from 'react-hot-toast';
import { showToastErrorMessage } from '@/util/toast';
import localFont from 'next/font/local';
import PwaSplashScript from '@/components/Script/PwaSplashScript';

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

const neo = localFont({
  src: [{ path: '../../public/fonts/neodgm.woff2' }],
  variable: '--local-neo-font',
});

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
          mutations: {
            onError: showToastErrorMessage,
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
      <PwaSplashScript />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Toaster />
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
                    <div className={`${neo.variable}`}>
                      {getLayout(<Component {...pageProps} />)}
                    </div>
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
