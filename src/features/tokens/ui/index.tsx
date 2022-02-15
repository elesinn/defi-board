import { useAtom } from 'jotai';

import { useTokensInfo } from 'api/tezPrices';
import { addressSearchAtom } from 'features/site-layout';

import { useTokensBalances } from '../../../api/tokens/index';

export const TokensList = () => {
  const [userAddress] = useAtom(addressSearchAtom);
  const { data: tokensBalances } = useTokensBalances({ userAddress });
  const { data: tokensInfo } = useTokensInfo();

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
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Token
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Estimated Value
                    </th>
                    {/* <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tokensBalances.map((token) => (
                    <tr key={token.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-10 h-10 rounded-full"
                              src={
                                token.artifact_uri?.replace(
                                  'ipfs://',
                                  'https://api.dipdup.net/thumbnail/',
                                ) ||
                                token.thumbnail_uri?.replace(
                                  'ipfs://',
                                  'https://api.dipdup.net/thumbnail/',
                                ) ||
                                `https://services.tzkt.io/v1/avatars/${token.contract.address}` ||
                                undefined
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {token.symbol}
                            </div>
                            <div className="text-sm text-gray-500">
                              {token.name} ({token.contract.alias})
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {/* {person.title} */}
                          {Number(
                            Number(token.balance) /
                              10 ** Number(token.decimals),
                          ).toFixed(3)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {/* {person.department} */}
                          {token.symbol}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {Number(
                            Number(
                              (Number(token.balance) /
                                10 ** Number(token.decimals)) *
                                (tokensInfo[token.symbol || '']?.currentPrice ||
                                  0),
                            ).toFixed(3),
                          )}
                        </div>
                        <div className="text-sm text-gray-500">ꜩ</div>
                      </td>
                      {/* <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {person.role}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit
                      </a>
                    </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
