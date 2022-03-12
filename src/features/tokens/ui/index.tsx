import React from 'react';

import { useAtom } from 'jotai';

import { useTokensInfo } from 'api/tezPrices';
import { useTokensBalances } from 'api/tokens';
import { tezosAccountAtom } from 'features/auth';
import Table, { AvatarCell, DefaultWithDescription } from 'shared/ui/table';
import { TZ } from 'shared/utils/tezos-sign';

import { DailyPriceChange } from './dailyPriceChange';
import { TokensInfoPanel } from './info-panel';
import PriceChangeChart from './priceChangeChart';

export function PriceChangeCell({ row, column }: any) {
  const { data: tokensInfo } = useTokensInfo();
  const token =
    tokensInfo && tokensInfo[row.original[column.tokenAccessor]?.toLowerCase()];
  return token ? <DailyPriceChange token={token} /> : '';
}
export function PriceChangeChartCell({ row, column }: any) {
  const { data: tokensInfo } = useTokensInfo();
  const token =
    tokensInfo && tokensInfo[row.original[column.tokenAccessor]?.toLowerCase()];
  return token ? (
    <div className="h-16 min-w-[100px] max-w-[200px]">
      <PriceChangeChart token={token} />
    </div>
  ) : (
    ''
  );
}

export const TokensList = () => {
  const [userAddress] = useAtom(tezosAccountAtom);
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

  const dataSortedByBalance =
    tableData
      ?.filter((d) => d.balanceinTzx && Number(d.balanceinTzx) > 0)
      ?.sort((a, b) => Number(b.balanceinTzx) - Number(a.balanceinTzx)) || [];

  const otherData = dataSortedByBalance.slice(5).reduce((acc, data) => {
    acc += Number(data.balanceinTzx) || 0;
    return acc;
  }, 0);

  const dataToDisplay = dataSortedByBalance.slice(0, 5).map((d) => ({
    id: d.symbol || 'Token',
    value: Number(d.balanceinTzx) || 0,
  }));

  if (!tokensBalances || !tokensInfo) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <TokensInfoPanel
          data={[
            ...dataToDisplay,
            {
              id: 'Other',
              value: Math.round(otherData * 100) / 100,
            },
          ]}
        />
      </div>
      <div className="flex flex-col overflow-hidden mt-6">
        {tableData ? (
          <Table columns={columns} data={tableData} />
        ) : (
          'No tokens yet :('
        )}
      </div>
    </>
  );
};
