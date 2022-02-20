import { useCallback, useEffect, useMemo } from 'react';

import { atom, useAtom } from 'jotai';
import Image from 'next/image';

import { useInvestment } from 'api/investments';
import { PlentyFarms, InvestmentKey } from 'api/investments/plenty/config';
import { useTokensInfo } from 'api/tezPrices';
import { tezosTkAtom } from 'features/beacon/useTezos';
import { addressSearchAtom } from 'features/site-layout';
import { TZ } from 'shared/utils/tezos-sign';

import { investmentBalancesAtom } from '../model';

type Props = {
  investmentKey: InvestmentKey;
};

const createBalanceAtom = (id: string) => {
  const bAtom = atom<number | undefined, number>(
    undefined,
    (get, set, value: number) => {
      set(bAtom, value);
      const balances = get(investmentBalancesAtom);
      set(investmentBalancesAtom, {
        Plenty: {
          ...balances.Plenty,
          [id]: value,
        },
      });
    },
  );
  return bAtom;
};

export const InvestmentItem = ({ investmentKey }: Props) => {
  const balanceAtom = useMemo(
    () => createBalanceAtom(investmentKey),
    [investmentKey],
  );
  const investment = PlentyFarms[investmentKey];
  const [tezosTk] = useAtom(tezosTkAtom);
  const [userAddress] = useAtom(addressSearchAtom);

  const [balanceInXtz, setBalanceInXtz] = useAtom(balanceAtom);
  const { data } = useInvestment({
    investmentKey,
    userAddress,
  });

  const { data: tokensInfo } = useTokensInfo();

  const balance =
    Number(
      typeof data?.value === 'string' ? data.value : data?.value?.balance,
    ) /
    10 ** investment.DECIMAL;

  const updateBalanceInXtz = useCallback(async () => {
    if (!data || !tokensInfo) {
      return;
    }

    if (!balance) return;
    const exchangeContract = await tezosTk.wallet.at(investment.DEX);
    const exchangeStorage: any = await exchangeContract.storage();

    // const systemFee = exchangeStorage.systemFee.toNumber();
    // const lpFee = exchangeStorage.lpFee.toNumber();
    const token1_pool = exchangeStorage.token1_pool.toNumber();
    const token2_pool = exchangeStorage.token2_pool.toNumber();
    let lpTokenSupply = exchangeStorage.totalSupply.toNumber();

    let tokenOut_supply = token2_pool;
    let tokenIn_supply = token1_pool;

    const pair = investment.ID.split(' - ').map((p) => tokensInfo[String(p)]);
    if (!pair[0] || !pair[1]) return;

    const tokenIn_Decimal = pair[0].decimals || 0;
    const tokenOut_Decimal = pair[1].decimals || 0;
    const liquidityToken_Decimal = investment.TOKEN_DECIMAL;

    tokenIn_supply = tokenIn_supply / Math.pow(10, tokenIn_Decimal);
    tokenOut_supply = tokenOut_supply / Math.pow(10, tokenOut_Decimal);
    lpTokenSupply = lpTokenSupply / Math.pow(10, liquidityToken_Decimal);
    // const exchangeFee = 1 / lpFee + 1 / systemFee;
    // const tokenOutPerTokenIn = tokenOut_supply / tokenIn_supply;

    let tokenFirst_Out = (balance * tokenIn_supply) / lpTokenSupply;
    let tokenSecond_Out = (balance * tokenOut_supply) / lpTokenSupply;

    let stakeInXtz = 0;

    stakeInXtz =
      tokenFirst_Out * pair[0].currentPrice +
      tokenSecond_Out * pair[1].currentPrice;

    setBalanceInXtz(Number(stakeInXtz.toFixed(4)));
  }, [balance, data, investment, tezosTk.wallet, tokensInfo]);

  useEffect(() => {
    if (!balanceInXtz) {
      updateBalanceInXtz();
    }
  }, [balanceInXtz, updateBalanceInXtz]);

  if (!data || !tokensInfo) {
    return null;
  }

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
                  src={`/images/${investment.ID.split(' - ')[0]}.png`}
                  alt="token-icon-1"
                  className="rounded-full"
                  height={24}
                  width={24}
                />
              </div>
              <div className="-translate-x-2 ">
                <Image
                  src={`/images/${investment.ID.split(' - ')[1]}.png`}
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
          {balanceInXtz && (
            <div className="flex items-center space-x-3">
              <span className="mt-1 text-sm text-gray-500 truncate">
                Stake in XTZ:
              </span>
              <span className="mt-1 text-sm text-gray-500 truncate">
                {balanceInXtz}

                {TZ}
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
