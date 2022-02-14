import { useMemo } from 'react';

import { useAtom } from 'jotai';
import Image from 'next/image';

import { useInvestment } from 'api/investments';
import { InvestmentKey, investmentData } from 'api/investments/investmentsData';
import { useTokensInfo } from 'api/tezPrices';
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

  const { data: tokensInfo } = useTokensInfo();

  const balanceInXtz = useMemo(() => {
    if (!data || !tokensInfo) {
      return 0;
    }
    const balance = Number(
      typeof data.value === 'string' ? data.value : data.value.balance,
    );
    //@ts-ignore
    const tokenInfo = tokensInfo[investment.rewardToken];
    if (!balance || !tokenInfo) return NaN;
    const formatedInvestmentKey = investment.id
      .replace('-LP', '')
      .replace('-', '/');

    const pair = tokenInfo.pairs.find(
      (p) => p.symbols === formatedInvestmentKey,
    );

    if (!pair?.sides[0] || !pair?.sides[1]) {
      return 0;
    }

    const t1Amount =
      (pair?.sides[0]?.pool * balance * 10 ** 6) / pair?.lptSupply;
    const t2Amount =
      (pair?.sides[1]?.pool * balance * 10 ** 6) / pair?.lptSupply;

    if (!t1Amount || !t2Amount || !pair.sides[1].symbol) {
      return 0;
    } else {
      let stakeInXtz = 0;
      if (!tokenInfo?.decimals || !tokensInfo[pair.sides[1].symbol]) return 0;

      stakeInXtz =
        (t1Amount / 10 ** tokenInfo?.decimals) * tokenInfo.currentPrice +
        (t2Amount /
          10 ** (tokensInfo[String(pair.sides[1].symbol)] as any).decimals) *
          (tokensInfo[String(pair.sides[1].symbol)] as any).currentPrice;

      return Number(stakeInXtz.toFixed(10));
    }
  }, [data, investment, tokensInfo]);

  if (!data || !tokensInfo) {
    return null;
  }

  const balance =
    Number(typeof data.value === 'string' ? data.value : data.value.balance) /
    10 ** investment.decimals;
  return (
    <li
      key={investmentKey}
      className="col-span-1 bg-white divide-y divide-gray-200 rounded-lg shadow"
    >
      <div className="flex items-center justify-between w-full p-6 space-x-6">
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
              <div className="-translate-x-2 ">
                <Image
                  src={`/images/${investment.icons[1]}.png`}
                  alt="token-icon-2"
                  className="rounded-full"
                  height={24}
                  width={24}
                />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {investmentKey}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <span className="mt-1 text-sm text-gray-500 truncate">Stake:</span>
            <span className="mt-1 text-sm text-gray-500 truncate">
              {balance || 'Unknown'} LPT
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="mt-1 text-sm text-gray-500 truncate">
              Stake in XTZ:
            </span>
            <span className="mt-1 text-sm text-gray-500 truncate">
              {balanceInXtz || 'Unknown'} ꜩ
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};
