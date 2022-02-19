import React from 'react';

import { useAtom } from 'jotai';

import { useTokensInfo } from 'api/tezPrices';
import { useTokensBalances } from 'api/tokens';
import { addressSearchAtom } from 'features/site-layout';
import Table, { AvatarCell, DefaultWithDescription } from 'shared/ui/table';

import { DailyPriceChange } from './dailyPriceChange';
import PriceChangeChart from './priceChangeChart';
import { TokensDonut } from './TokensDonut';

export function PriceChangeCell({ row, column }: any) {
  const { data: tokensInfo } = useTokensInfo();
  const token = tokensInfo && tokensInfo[row.original[column.tokenAccessor]];
  return token ? <DailyPriceChange token={token} /> : '';
}
export function PriceChangeChartCell({ row, column }: any) {
  const { data: tokensInfo } = useTokensInfo();
  const token = tokensInfo && tokensInfo[row.original[column.tokenAccessor]];
  return token ? (
    <div className="h-16 min-w-[100px] max-w-[200px]">
      <PriceChangeChart token={token} />
    </div>
  ) : (
    ''
  );
}

export const TokensList = () => {
  const [userAddress] = useAtom(addressSearchAtom);
  const { data: tokensBalances } = useTokensBalances({ userAddress });
  const { data: tokensInfo } = useTokensInfo();

  const tableData = React.useMemo(() => {
    return tokensBalances?.map((token) => ({
      imgUrl:
        token.artifact_uri?.replace(
          'ipfs://',
          'https://api.dipdup.net/thumbnail/',
        ) ||
        token.thumbnail_uri?.replace(
          'ipfs://',
          'https://api.dipdup.net/thumbnail/',
        ) ||
        `https://services.tzkt.io/v1/avatars/${token.contract.address}` ||
        undefined,
      symbol: token.symbol,
      name: `${token.name || ''} (${token.contract.alias})`,
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
            (tokensInfo[token.symbol || '']?.currentPrice || 0),
        ).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        }),
      tzText: 'ꜩ',
      week: 'fake',
    }));
  }, [tokensBalances, tokensInfo]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Token',
        accessor: 'symbol',
        Cell: AvatarCell,
        imgAccessor: 'imgUrl',
        descAccessor: 'name',
      },
      {
        Header: '24h change',
        accessor: 'tzText',
        tokenAccessor: 'symbol',
        Cell: PriceChangeCell,
        disableSortBy: true,
      },
      {
        Header: '30d change',
        accessor: 'week',
        tokenAccessor: 'symbol',
        Cell: PriceChangeChartCell,
        disableSortBy: true,
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        descAccessor: 'symbol',
        Cell: DefaultWithDescription,
      },
      {
        Header: 'Estimated Value',
        accessor: 'balanceinTzx',
        descAccessor: 'tzText',
        Cell: DefaultWithDescription,
      },
    ],
    [],
  );

  if (!tokensBalances || !tokensInfo) {
    return null;
  }

  return (
    <>
      {tableData && <TokensDonut data={tableData} />}

      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-lg font-medium text-gray-900 bg-white">
            My tokens
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {tableData ? (
          <Table columns={columns} data={tableData} />
        ) : (
          'No tokens yet :('
        )}
      </div>
    </>
  );
};
