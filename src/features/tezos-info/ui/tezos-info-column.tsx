import dynamic from 'next/dynamic';

import { useXtzPriceForCurrency } from 'api/coingecko';
import { TZ } from 'shared/utils/tezos-sign';

const Chart = dynamic(
  () => import('./tezos-price-chart').then<any>((mod) => mod.TezosPriceChart),
  { ssr: false },
);

export const TezosInfoColumn = () => {
  const { value, currency } = useXtzPriceForCurrency();

  return (
    <div className="w-full h-full flex- flex-col gap-2">
      {value ? (
        <div className="flex justify-center text-lg text-main">
          1{TZ} = {value} {currency.toUpperCase()} (30 days)
        </div>
      ) : (
        <div className="flex justify-center text-lg text-main animate-ping">
          {TZ}
        </div>
      )}
      <Chart />
    </div>
  );
};
