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
