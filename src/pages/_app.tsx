import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';

import { Toaster } from 'react-hot-toast';
import '@fontsource/source-sans-pro';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import SEO from '../constants/next-seo.config';
import { WalletConnectionProvider } from '../providers/wallet-connection';

require('@solana/wallet-adapter-react-ui/styles.css');
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletConnectionProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <Toaster position='top-right' />
      </WalletConnectionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
