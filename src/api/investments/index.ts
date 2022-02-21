import { useAtom } from 'jotai';
import useSWR from 'swr';

import { tzktApi } from 'api';
import { useTokensInfo } from 'api/tezPrices';
import { tezosTkAtom } from 'features/beacon/useTezos';

import { InvestmentKey, PlentyFarms } from './plenty/config';
import { IInvestment } from './types';

export const useInvestment = ({
  userAddress,
  investmentKey,
}: {
  userAddress: string;
  investmentKey: InvestmentKey;
}) => {
  const inv = PlentyFarms[investmentKey];
  return useSWR<IInvestment>(
    inv
      ? `contracts/${inv.CONTRACT}/bigmaps/balances/keys/${userAddress}`
      : null,
  );
};

export const usePlentyInvestments = (userAddress: string) => {
  return useSWR('usePlentyInvestments/' + userAddress, async () => {
    const res = await Promise.all(
      Object.values(PlentyFarms).map(async (inv) => {
        const res = await tzktApi
          .get(`contracts/${inv.CONTRACT}/bigmaps/balances/keys/${userAddress}`)
          .json<IInvestment>();
        const tokenBalance =
          Number(
            typeof res?.value === 'string' ? res.value : res?.value?.balance,
          ) /
          10 ** inv.DECIMAL;

        return { ...res, tokenBalance, investmentId: inv.ID as InvestmentKey };
      }),
    );
    return res.filter((item) => item.id);
  });
};

export const usePlentyInvestmentsInXTZ = (userAddress: string) => {
  const { data } = usePlentyInvestments(userAddress);
  const [tezosTk] = useAtom(tezosTkAtom);
  const { data: tokensInfo } = useTokensInfo();
  return useSWR(
    data && tokensInfo ? 'usePlentyInvestmentsInXTZ/' + userAddress : null,
    async () => {
      const res = await Promise.all(
        data?.map(async (item) => {
          const balance = item.tokenBalance;
          const investment = PlentyFarms[item.investmentId];
          const exchangeContract = await tezosTk.wallet.at(investment.DEX);
          const exchangeStorage: any = await exchangeContract.storage();

          // const systemFee = exchangeStorage.systemFee.toNumber();
          // const lpFee = exchangeStorage.lpFee.toNumber();
          const token1_pool = exchangeStorage.token1_pool.toNumber();
          const token2_pool = exchangeStorage.token2_pool.toNumber();
          let lpTokenSupply = exchangeStorage.totalSupply.toNumber();

          let tokenOut_supply = token2_pool;
          let tokenIn_supply = token1_pool;

          const pair = investment.ID.split(' - ').map(
            (p) => tokensInfo?.[String(p).toLowerCase()],
          );
          if (!pair[0] || !pair[1]) return { ...item, XTZBalance: undefined };

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

          return { ...item, XTZBalance: Number(stakeInXtz.toFixed(4)) };
          // setBalanceInXtz(Number(stakeInXtz.toFixed(4)));
        }) || [],
      );
      return res.filter(Boolean);
    },
  );
};
