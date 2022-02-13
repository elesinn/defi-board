import ky from 'ky';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import '../styles/global.css';

export const tzApi = ky.extend({
  prefixUrl: 'https://api.tzkt.io/v1/',
});

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      refreshInterval: 3000,
      fetcher: (resource) => tzApi.get(resource).json(),
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
);

export default MyApp;
