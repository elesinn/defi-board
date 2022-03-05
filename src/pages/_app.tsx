import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

import { tzktApi } from 'api';
import '../styles/global.css';
import { SiteLayout } from 'features/site-layout';
import WithYandexMetrika from 'features/ym/WithYandexMetrika';

const titles: Record<string, string> = {
  '/': 'Home',
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
      <WithYandexMetrika>
        <SiteLayout title={title || ''}>
          <Component {...pageProps} />
        </SiteLayout>
      </WithYandexMetrika>
    </SWRConfig>
  );
};

export default MyApp;
