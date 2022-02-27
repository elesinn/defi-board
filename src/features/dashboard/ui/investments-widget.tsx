import { useAtom } from 'jotai';
import Link from 'next/link';

import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import InvestmentsDonut from 'features/investments/ui/InvestmentsDonut';
import { addressSearchAtom } from 'features/site-layout';

export const InvestmentsWidget = () => {
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
    <div className="overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow bg-opacity-40">
      <div className="flex justify-between px-4 py-5 sm:px-6">
        <div className="inline-grid items-center justify-start grid-flow-col gap-2 font-medium leading-6 text-gray-900 align-top">
          Investments Allocation
        </div>
        <Link href="/investments">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-main-500 order-0 hover:bg-[#6560be] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500 sm:order-1 sm:ml-3"
          >
            View All
          </button>
        </Link>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="w-full min-h-[300px] ratio my-6">
          <InvestmentsDonut data={chartData} />
        </div>
      </div>
    </div>
  );
};
