import React from 'react';

import { useAtom } from 'jotai';

import { useTokensInfo } from 'api/tezPrices';
import { addressSearchAtom } from 'features/site-layout';
import Table, { AvatarCell } from 'shared/table';

import { useTokensBalances } from '../../../api/tokens/index';

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
      ).toFixed(3),
      balanceinTzx:
        tokensInfo &&
        Number(
          Number(
            (Number(token.balance) / 10 ** Number(token.decimals)) *
              (tokensInfo[token.symbol || '']?.currentPrice || 0),
          ).toFixed(3),
        ),
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
        Header: 'Quantity',
        accessor: 'balance',
      },
      {
        Header: 'Estimated Value',
        accessor: 'balanceinTzx',
      },
    ],
    [],
  );

  if (!tokensBalances || !tokensInfo) {
    return null;
  }

  return (
    <>
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
