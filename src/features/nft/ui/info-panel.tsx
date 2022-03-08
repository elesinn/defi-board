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

  const mainSymbols = symbols.slice(0, 4);

  const other = symbols.slice(5).reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="flex flex-wrap rounded-lg shadow bg-main-200 ">
      <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg bg-main-500">
        <dt className="text-sm font-medium text-white">Total</dt>
        <dd className="mt-1 text-3xl font-semibold text-green-400 truncate">
          {total !== undefined ? (
            total
          ) : (
            <ImSpinner2 className="animate-spin" />
          )}
        </dd>
      </dl>
      {mainSymbols.map((item) => {
        return (
          <dl
            className="flex flex-col px-4 py-5 overflow-hidden rounded-lg "
            key={item.id}
          >
            <dt className="text-sm font-medium text-gray-600">{item.id}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
              {item.value}
            </dd>
          </dl>
        );
      })}
      {other ? (
        <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg ">
          <dt className="text-sm font-medium text-gray-600">Other</dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
            {other}
          </dd>
        </dl>
      ) : null}
    </div>
  );
};
