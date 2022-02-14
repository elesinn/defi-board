import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { tzktApi } from 'api';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      refreshInterval: 0,
      fetcher: (resource) => tzktApi.get(resource).json(),
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
);

export default MyApp;
