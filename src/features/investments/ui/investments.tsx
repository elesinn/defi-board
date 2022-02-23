import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';

import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import { addressSearchAtom } from 'features/site-layout';

import InvestmentsAccordion from './accordion';

const InvestmentsDonut = dynamic(() => import('./InvestmentsDonut'), {
  ssr: false,
});

export const Investments = () => {
  const [address] = useAtom(addressSearchAtom);

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
    <div>
      <div className="w-full min-h-[450px] ratio my-6">
        <InvestmentsDonut data={chartData} />
      </div>
      <InvestmentsAccordion />
    </div>
  );
};
