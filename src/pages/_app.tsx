import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

import { tzktApi } from 'api';
import '../styles/global.css';
import { SiteLayout } from 'features/site-layout';

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/nft': 'NFT',
  '/tokens': 'Tokens',
  '/investments': 'Investments',
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const title = titles[pathname];
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (resource) => tzktApi.get(resource).json(),
      }}
    >
      <SiteLayout title={title || ''}>
        <Component {...pageProps} />
      </SiteLayout>
    </SWRConfig>
  );
};

export default MyApp;
