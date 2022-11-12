import { AppProps } from 'next/app';
import Head from 'next/head';

import { Suspense } from 'react';
import { Providers } from '../components/providers';

import { Noto_Sans_JP } from '@next/font/google';

const noto = Noto_Sans_JP({
  weight: ['400'],
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${noto.style.fontFamily};
        }
      `}</style>

      <Head>
        <title>My App</title>
      </Head>

      <main className="app">
        <Providers>
          <Suspense fallback={<div>...</div>}>
            <Component {...pageProps} />
          </Suspense>
        </Providers>
      </main>
    </>
  );
}

export default CustomApp;
