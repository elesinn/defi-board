import { useXtzPriceForCurrency } from 'api/coingecko';
import { TZ } from 'shared/utils/tezos-sign';

import { TezosPriceChart } from './tezos-price-chart';

export const TezosInfoColumn = () => {
  const { value, currency } = useXtzPriceForCurrency();

  return (
    <div className="w-full h-[300px]">
      {value && (
        <div className="flex justify-center text-lg text-main">
          1{TZ} = {value} {currency.toUpperCase()} (30 days)
        </div>
      )}
      <TezosPriceChart />
    </div>
  );
};
