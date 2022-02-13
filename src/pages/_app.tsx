import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import { tzApi } from 'api';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <SWRConfig
    value={{
      refreshInterval: 0,
      fetcher: (resource) => tzApi.get(resource).json(),
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
);

export default MyApp;
