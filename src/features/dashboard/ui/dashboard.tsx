import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import { useAccount, useOperationsInfo } from 'api/account/account';
import { useXtzPriceForCurrency } from 'api/coingecko';
import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import { useTokensInfo } from 'api/tezPrices';
import { useTokensBalances } from 'api/tokens';
import { addressSearchAtom } from 'features/site-layout';
import {
  formatTezosBalanceInCurrency,
  formatTezosBalanceWithSign,
} from 'shared/utils/balance';
import { TZ } from 'shared/utils/tezos-sign';

export const Dashboard = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data: account } = useAccount(address);
  const { data: withXTZ } = usePlentyInvestmentsInXTZ(address);
  const operationsInfo = useOperationsInfo(address);
  const { value, currency } = useXtzPriceForCurrency();
  const { data: tokensBalances } = useTokensBalances({ userAddress: address });
  const { data: tokensInfo } = useTokensInfo();

  const totalTokens = tokensBalances
    ?.filter((item) => !item.artifact_uri)
    .reduce((sum, token) => {
      const balanceInXtz =
        tokensInfo &&
        Number(
          (Number(token.balance) / 10 ** Number(token.decimals)) *
            (tokensInfo[token.symbol?.toLowerCase() || '']?.currentPrice || 0),
        );

      sum = sum + (balanceInXtz || 0);
      return sum;
    }, 0);

  const totaPlentylInvestments =
    withXTZ?.reduce<number>((acc, item) => acc + (item?.XTZBalance || 0), 0) ||
    0;

  const { farms } = useCrunchyInvestments(address);

  const totalCrunchyInvestments = farms?.reduce((acc, farm) => {
    acc +=
      Number(farm.stakedAmount) / Math.pow(10, Number(farm.poolToken.decimals));
    return acc;
  }, 0);

  if (!account) {
    return null;
  }
  const accountBalance = Math.round(account?.balance / 10000) / 100;

  const totalBalance =
    totalCrunchyInvestments +
    totaPlentylInvestments +
    accountBalance +
    totalTokens;

  const totalInvestments = totalCrunchyInvestments + totaPlentylInvestments;
  // const stats = [
  //   // {
  //   //   name: 'Balance',
  //   //   stat: (Math.round(account?.balance / 10000) / 100).toString() + TZ,
  //   // },
  //   {
  //     name: 'Total Investments',
  //     stat: withXTZ?.reduce<number>(
  //       (acc, item) => acc + (item?.XTZBalance || 0),
  //       0,
  //     ),
  //   },
  //   {
  //     name: 'Active Tokens',
  //     stat: account?.activeTokensCount,
  //   },
  // ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap rounded-lg shadow bg-main-200 ">
        <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg bg-main-500">
          <dt className="text-sm font-medium text-white ">Net Worth</dt>
          <dd className="mt-1 text-3xl font-semibold text-green-400 truncate">
            {totalBalance ? (
              <>
                {totalBalance?.toFixed(3)}
                {TZ}
                <div className="text-xs text-green-400">
                  {formatTezosBalanceInCurrency(
                    totalBalance,
                    value,
                    currency,
                    true,
                  )}
                </div>
              </>
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </dl>
        <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg ">
          <dt className="text-sm font-medium text-gray-600">DeFi worth</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {withXTZ ? (
              <>
                {totalInvestments?.toFixed(3)}
                {TZ}
                <div className="text-xs text-gray-700">
                  {formatTezosBalanceInCurrency(
                    totalInvestments,
                    value,
                    currency,
                    true,
                  )}
                </div>
              </>
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </dl>
        <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg ">
          <dt className="text-sm font-medium text-gray-600">Tokens Worth</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {totalTokens?.toFixed(3)}
            {TZ}
            <div className="text-xs text-gray-700">
              {formatTezosBalanceInCurrency(totalTokens, value, currency, true)}
            </div>
          </dd>
        </dl>
        <div className="flex flex-col px-4 py-5 overflow-hidden rounded-lg ">
          <dt className="text-sm font-medium text-gray-600">XTZ on account</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {formatTezosBalanceWithSign(account?.balance)}
            <div className="text-xs text-gray-700">
              {formatTezosBalanceInCurrency(account.balance, value, currency)}
            </div>
          </dd>
        </div>
      </div>

      <div className="flex flex-wrap rounded-lg shadow bg-main-200 ">
        <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg ">
          <dt className="text-sm font-medium text-gray-600">Gas used</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {operationsInfo?.gasUsed ? (
              <>
                {formatTezosBalanceWithSign(operationsInfo.gasUsed)}
                <div className="text-xs text-gray-700">
                  {formatTezosBalanceInCurrency(
                    operationsInfo?.gasUsed,
                    value,
                    currency,
                  )}
                </div>
              </>
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </dl>
        <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg ">
          <dt className="text-sm font-medium text-gray-600">Total fee</dt>
          <dd className="mt-1 text-3xl font-semibold truncate">
            {operationsInfo?.allocationFee &&
            operationsInfo?.bakerFee &&
            operationsInfo?.storageFee ? (
              <>
                {formatTezosBalanceWithSign(
                  operationsInfo.allocationFee +
                    operationsInfo.bakerFee +
                    operationsInfo.storageFee,
                )}
                <div className="text-xs text-gray-700">
                  {formatTezosBalanceInCurrency(
                    operationsInfo.allocationFee +
                      operationsInfo.bakerFee +
                      operationsInfo.storageFee,
                    value,
                    currency,
                  )}
                </div>
              </>
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </dl>
      </div>
    </div>
  );
};
