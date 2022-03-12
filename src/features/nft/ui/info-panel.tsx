import { useAtom } from 'jotai';
import { groupBy, orderBy } from 'lodash';
import { ImSpinner2 } from 'react-icons/im';

import { useTokensBalances } from 'api/tokens';
import { tezosAccountAtom } from 'features/auth';

export const NftInfoPanel = () => {
  const [userAddress] = useAtom(tezosAccountAtom);
  const { data: tokensBalances } = useTokensBalances({ userAddress });
  const nfts = tokensBalances?.filter((b) => b.artifact_uri);
  const total = nfts?.length;

  const bySymbol = groupBy(nfts, 'symbol');
  const symbols = orderBy(
    Object.entries(bySymbol).map(([key, item]) => ({
      id: key,
      value: item.length,
    })),
    'value',
    'desc',
  );

  const other = symbols.slice(4).reduce((acc, item) => acc + item.value, 0);
  const mainSymbols = [
    ...symbols.slice(0, 4),
    {
      id: 'Other',
      value: other,
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 bg-white divide-x rounded-lg shadow md:grid-cols-3 bg-opacity-40">
        <dl className="flex flex-col px-4 py-5 overflow-hidden bg-main-500 rounded-l-lg">
          <dt className="text-sm font-medium text-white">Total</dt>
          <dd className="mt-1 text-3xl font-semibold text-green-400 truncate">
            {total !== undefined ? (
              total
            ) : (
              <ImSpinner2 className="animate-spin" />
            )}
          </dd>
        </dl>
        {mainSymbols.slice(0, 2).map((item) => {
          return (
            <dl
              className="flex flex-col px-4 py-5 overflow-hidden"
              key={item.id}
            >
              <dt className="text-sm font-medium text-gray-600">{item.id}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
                {item.value}
              </dd>
            </dl>
          );
        })}
      </div>
      <div className="grid grid-cols-2 bg-white divide-x rounded-lg shadow md:grid-cols-3 bg-opacity-40">
        {mainSymbols.slice(2).map((item) => {
          return (
            <dl
              className="flex flex-col px-4 py-5 overflow-hidden"
              key={item.id}
            >
              <dt className="text-sm font-medium text-gray-600">{item.id}</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
                {item.value}
              </dd>
            </dl>
          );
        })}
      </div>
    </div>
  );
};
