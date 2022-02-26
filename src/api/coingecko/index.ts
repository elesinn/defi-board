import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import ky from 'ky';
import useSwr from 'swr';

const currencyAtom = atomWithStorage('currency', 'usd');

export const useXtzPriceForCurrency = () => {
  const [currency, setCurrency] = useAtom(currencyAtom);
  const { data } = useSwr<any>(`/xtzprice=${currency}`, () =>
    ky
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=tezos&vs_currencies=${currency}`,
      )
      .json(),
  );

  return {
    value: data ? data?.tezos[currency] : undefined,
    currency,
    setCurrency,
  };
};

type Timestamp = number;
// type IMarketChartInterval = 'daily' | 'hourly' | 'minutely';
type IMarketChartResponse = {
  prices: [Timestamp, number][];
  market_caps: [Timestamp, number][];
  total_volumes: [Timestamp, number][];
};

const xtzMarketChartDaysAtom = atomWithStorage('xtzMarketChartDaysAtom', 30);
// const xtzMarketChartIntervalAtom = atomWithStorage<IMarketChartInterval>('xtzMarketChartIntervalAtom', 'daily');

export const useXtzMarketChart = () => {
  const [vs_currency] = useAtom(currencyAtom);
  const [days] = useAtom(xtzMarketChartDaysAtom);
  const res = useSwr<IMarketChartResponse>(
    `/xtz_historical_data=${vs_currency}/days=${days}`,
    () =>
      ky
        .get(`https://api.coingecko.com/api/v3/coins/tezos/market_chart`, {
          searchParams: {
            vs_currency,
            days,
            interval: days < 30 ? 'hourly' : 'daily',
          },
        })
        .json(),
  );
  return {
    ...res,
    currencyAtom,
    daysAtom: xtzMarketChartDaysAtom,
  };
};
