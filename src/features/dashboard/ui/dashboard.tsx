import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import { useAccount, useOperationsInfo } from 'api/account/account';
import { useXtzPriceForCurrency } from 'api/coingecko';
import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import { useTokensInfo } from 'api/tezPrices';
import { useTokensBalances } from 'api/tokens';
import { tezosAccountAtom } from 'features/auth';
import { TezosInfoColumn } from 'features/tezos-info';
import {
  formatTezosBalanceInCurrency,
  formatTezosBalanceWithSign,
} from 'shared/utils/balance';
import { TZ } from 'shared/utils/tezos-sign';

import { InvestmentsWidget } from './investments-widget';
import { TokensWidget } from './tokens-widget';
dayjs.extend(relativeTime);

export const Dashboard = () => {
  const [address] = useAtom(tezosAccountAtom);
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

  return (
    <div className="flex flex-col gap-2">
      <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg shadow bg-main-500">
        <dt className="text-sm font-medium text-white ">Net Worth</dt>
        <dd className="mt-1 text-4xl font-semibold text-green-400 truncate">
          {totalBalance ? (
            <>
              {totalBalance?.toFixed(3)}
              {TZ}
              <div className="text-xs text-green-300">
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

      <div className="grid grid-cols-2 bg-white divide-x rounded-lg shadow md:grid-cols-3 bg-opacity-40">
        <dl className="flex flex-col px-4 py-5 overflow-hidden">
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
        <dl className="flex flex-col px-4 py-5 overflow-hidden">
          <dt className="text-sm font-medium text-gray-600">Tokens Worth</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {totalTokens?.toFixed(3)}
            {TZ}
            <div className="text-xs text-gray-700">
              {formatTezosBalanceInCurrency(totalTokens, value, currency, true)}
            </div>
          </dd>
        </dl>
        <dl className="flex flex-col px-4 py-5 overflow-hidden">
          <dt className="text-sm font-medium text-gray-600">XTZ on account</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {formatTezosBalanceWithSign(account?.balance)}
            <div className="text-xs text-gray-700">
              {formatTezosBalanceInCurrency(account.balance, value, currency)}
            </div>
          </dd>
        </dl>
      </div>

      <div className="grid grid-cols-2 bg-white divide-x rounded-lg shadow md:grid-cols-3 bg-opacity-40">
        <dl className="flex flex-col flex-grow px-4 py-5 overflow-hidden ">
          <dt className="text-sm font-medium text-gray-600">Active Since</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {dayjs(account.firstActivityTime).format('YYYY-MM-DD')}
            <div className="text-xs text-gray-700">
              Last seen {dayjs(account.lastActivityTime).fromNow()}
            </div>
          </dd>
        </dl>
        <dl className="flex flex-col px-4 py-5 overflow-hidden">
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
        <dl className="flex flex-col px-4 py-5 overflow-hidden ">
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

      <div className="grid grid-cols-1 gap-4 leading-6 text-gray-900 lg:grid-cols-2">
        <TokensWidget />
        <InvestmentsWidget />
      </div>
      <div className="md:hidden">
        <TezosInfoColumn />
      </div>
    </div>
  );
};
