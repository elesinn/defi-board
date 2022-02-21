import { useHomeData } from 'api/home';
import { TZ } from 'shared/utils/tezos-sign';

import { TezosPriceChart } from './tezos-prica-chart';

export const TezosInfoColumn = () => {
  const { data } = useHomeData();

  const lastPrise = data?.priceChart.at(-1);

  return (
    <div className="w-full h-[300px]">
      {lastPrise && (
        <div className="flex justify-center text-lg text-main">
          1{TZ} = {Math.round(lastPrise?.value * 100) / 100} USD
        </div>
      )}
      <TezosPriceChart />
    </div>
  );
};
