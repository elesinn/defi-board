import { useAtom } from 'jotai';
import Image from 'next/image';

import { useInvestment } from 'api/investments';
import { InvestmentKey, investmentData } from 'api/investments/investmentsData';
import { addressSearchAtom } from 'features/site-layout';

type Props = {
  investmentKey: InvestmentKey;
};

export const InvestmentItem = ({ investmentKey }: Props) => {
  const investment = investmentData[investmentKey];
  const [userAddress] = useAtom(addressSearchAtom);
  const { data } = useInvestment({
    investmentKey,
    userAddress,
  });
  if (!data) {
    return null;
  }

  const balance =
    Number(typeof data.value === 'string' ? data.value : data.value.balance) /
    10 ** investment.decimals;
  return (
    <li
      key={investmentKey}
      className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <div className="flex ">
              <div>
                <Image
                  src={`/images/${investment.icons[0]}.png`}
                  alt="token-icon-1"
                  className="rounded-full"
                  height={24}
                  width={24}
                />
              </div>
              <div className=" -translate-x-2">
                <Image
                  src={`/images/${investment.icons[1]}.png`}
                  alt="token-icon-2"
                  className="rounded-full"
                  height={24}
                  width={24}
                />
              </div>
            </div>
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {investmentKey}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <span className="mt-1 text-gray-500 text-sm truncate">Stake:</span>
            <span className="mt-1 text-gray-500 text-sm truncate">
              {balance && balance} LPT
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
