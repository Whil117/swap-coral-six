/* eslint-disable @next/next/no-page-custom-font */
import { ApolloProvider } from '@apollo/client';
import AtomSEO from '@Components/@atoms/AtomSeo';
import { Global } from '@emotion/react';
import HeadComponent from '@Styles/global/head';
import Normalize from '@Styles/global/normalize';
import { Provider } from 'jotai';
import Layouts from 'layout';
import { SessionProvider } from 'next-auth/react';
import type { AppPropsWithLayout } from 'next/app';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import client from '../apollo/client';
const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithLayout) => {
  const SEO = Component.SEO;

  return (
    <Provider>
      {SEO?.title && (
        <AtomSEO
          title="Swap Coral Six"
          page={SEO.title}
          image={SEO?.image}
          keywords={SEO?.keywords}
          description={SEO?.description}
        />
      )}
      <ToastContainer />
      <Script
        src="https://open.spotify.com/embed-podcast/iframe-api/v1"
        async
      />
      <script
        src="https://open.spotify.com/embed-podcast/iframe-api/v1"
        async
      ></script>
      <ApolloProvider client={client}>
        <SessionProvider session={session}>
          <HeadComponent>
            <Layouts Layout={Component.Layout} SEO={SEO}>
              <Global styles={Normalize} />
              <Component {...pageProps} />
            </Layouts>
          </HeadComponent>
        </SessionProvider>
      </ApolloProvider>
    </Provider>
  );
};

export default MyApp;
