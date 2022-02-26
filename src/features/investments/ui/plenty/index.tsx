import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import {
  usePlentyInvestments,
  usePlentyInvestmentsInXTZ,
} from 'api/investments/plenty';
import { useTokensInfo } from 'api/tezPrices';
import { addressSearchAtom } from 'features/site-layout';
import { TZ } from 'shared/utils/tezos-sign';

export const PlentyTable = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data: investments } = usePlentyInvestments(address);
  const { data: withXTZ } = usePlentyInvestmentsInXTZ(address);
  const { data: tokensInfo } = useTokensInfo();
  return (
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
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    LP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    {TZ}
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(withXTZ || investments)?.map((farm) => (
                  <tr key={farm?.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      <div className="flex ">
                        <div>
                          {tokensInfo && (
                            <img
                              src={
                                tokensInfo[
                                  farm?.investmentId
                                    .split(' - ')[0]
                                    ?.toLowerCase() as any
                                ]?.thumbnailUri?.replace(
                                  'ipfs://',
                                  'https://ipfs.fleek.co/ipfs/',
                                ) || ''
                              }
                              // src={`/images/${
                              //   farm?.investmentId.split(' - ')[0]
                              // }.png`}
                              alt="token-icon-1"
                              className="rounded-full"
                              height={24}
                              width={24}
                            />
                          )}
                        </div>
                        <div className="-translate-x-2 ">
                          {tokensInfo && (
                            <img
                              src={
                                tokensInfo[
                                  farm?.investmentId
                                    .split(' - ')[1]
                                    ?.toLowerCase() as any
                                ]?.thumbnailUri?.replace(
                                  'ipfs://',
                                  'https://ipfs.fleek.co/ipfs/',
                                ) || ''
                              }
                              // src={`/images/${
                              //   farm?.investmentId.split(' - ')[0]
                              // }.png`}
                              alt="token-icon-2"
                              className="rounded-full"
                              height={24}
                              width={24}
                            />
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                      {farm?.investmentId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {farm?.tokenBalance} LP
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                      {(farm as any)?.XTZBalance ? (
                        `${(farm as any)?.XTZBalance}${TZ}`
                      ) : (
                        <ImSpinner2 className="animate-spin" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
