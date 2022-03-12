import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';

import { tzktApi } from 'api';
import '../styles/global.css';
import { useAuthRedirect } from 'features/auth';
import { SiteLayout } from 'features/site-layout';
import WithYandexMetrika from 'features/ym/WithYandexMetrika';

const titles: Record<string, string> = {
  '/dashboard': 'Home',
  '/nft': 'NFT',
  '/tokens': 'Tokens',
  '/investments': 'Investments',
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const title = titles[pathname];
  useAuthRedirect();
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (resource) => tzktApi.get(resource).json(),
      }}
    >
      <WithYandexMetrika>
        {pathname === '/' ? (
          <Component {...pageProps} />
        ) : (
          <SiteLayout title={title || ''}>
            <Component {...pageProps} />
          </SiteLayout>
        )}
      </WithYandexMetrika>
    </SWRConfig>
  );
};

export default MyApp;
