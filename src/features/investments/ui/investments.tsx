import { useAtom } from 'jotai';

import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import { tezosAccountAtom } from 'features/auth';

import InvestmentsAccordion from './accordion';
import { InvestmentInfoPanel } from './info-panel';

export const Investments = () => {
  const [address] = useAtom(tezosAccountAtom);

  const { data: withXTZ } = usePlentyInvestmentsInXTZ(address);
  const { farms } = useCrunchyInvestments(address);

  const totalCrunchy = farms?.reduce((acc, farm) => {
    acc +=
      Number(farm.stakedAmount) / Math.pow(10, Number(farm.poolToken.decimals));
    return acc;
  }, 0);

  const totalPlenty =
    withXTZ?.reduce<number>((acc, item) => acc + (item?.XTZBalance || 0), 0) ||
    0;

  const chartData = [
    {
      value: totalCrunchy,
      id: 'Crunchy',
    },
    {
      value: totalPlenty,
      id: 'Plenty',
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <InvestmentInfoPanel data={chartData} />
      <InvestmentsAccordion />
    </div>
  );
};
