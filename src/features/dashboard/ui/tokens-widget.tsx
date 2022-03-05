import React from 'react';

import { useAtom } from 'jotai';
import Link from 'next/link';

import { useTokensInfo } from 'api/tezPrices';
import { useTokensBalances } from 'api/tokens';
import { addressSearchAtom } from 'features/site-layout';
import TokensDonut from 'features/tokens/ui/TokensDonut';
import { TZ } from 'shared/utils/tezos-sign';

export const TokensWidget = () => {
  const [userAddress] = useAtom(addressSearchAtom);
  const { data: tokensBalances } = useTokensBalances({ userAddress });
  const { data: tokensInfo } = useTokensInfo();
  const tableData = React.useMemo(() => {
    return tokensBalances
      ?.filter((item) => !item.artifact_uri)
      .map((token) => ({
        imgUrl:
          token.thumbnail_uri?.replace(
            'ipfs://',
            'https://api.dipdup.net/thumbnail/',
          ) ||
          `https://services.tzkt.io/v1/avatars/${token.contract.address}` ||
          undefined,
        symbol: token.symbol,
        name: token.name || token.contract.alias,
        // alias: token.contract.alias,
        balance: Number(
          Number(token.balance) / 10 ** Number(token.decimals),
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
        balanceinTzx:
          tokensInfo &&
          Number(
            (Number(token.balance) / 10 ** Number(token.decimals)) *
              (tokensInfo[token.symbol?.toLowerCase() || '']?.currentPrice ||
                0),
          ).toLocaleString(undefined, {
            minimumFractionDigits: 2,
          }),
        tzText: TZ,
        week: 'fake',
      }));
  }, [tokensBalances, tokensInfo]);

  const dataSortedByBalance =
    tableData
      ?.filter((d) => d.balanceinTzx && Number(d.balanceinTzx) > 0)
      ?.sort((a, b) => Number(b.balanceinTzx) - Number(a.balanceinTzx)) || [];

  const dataToDisplay = dataSortedByBalance.slice(0, 4).map((d) => ({
    id: d.symbol || 'Token',
    value: Number(d.balanceinTzx) || 0,
  }));

  const otherData = dataSortedByBalance.slice(5).reduce((acc, data) => {
    acc += Number(data.balanceinTzx) || 0;
    return acc;
  }, 0);
  const otherDataToDisplay =
    otherData > 0 ? { id: 'Other Tokens', value: otherData } : undefined;

  const data = otherDataToDisplay
    ? [...dataToDisplay, otherDataToDisplay]
    : dataToDisplay;

  return (
    <div className="overflow-hidden bg-white divide-y divide-gray-200 rounded-lg shadow bg-opacity-40">
      <div className="flex justify-between px-4 py-5 sm:px-6">
        <div className="inline-grid items-center justify-start grid-flow-col gap-2 font-medium leading-6 text-gray-900 align-top">
          Token Allocation
        </div>
        <Link href="/tokens">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-main-500 order-0 hover:bg-[#6560be]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main-500 sm:order-1 sm:ml-3"
          >
            View All
          </button>
        </Link>
      </div>
      <div className="px-4 py-5 sm:p-6">
        {tableData && (
          <div className=" w-full min-h-[300px] ratio">
            <TokensDonut data={data} />
          </div>
        )}
      </div>
    </div>
  );
};
