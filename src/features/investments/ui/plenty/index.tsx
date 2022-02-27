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
          <div className="overflow-hidden bg-white border-b shadow sm:rounded-lg bg-opacity-40">
            <table className="min-w-full ">
              <thead className="">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-semibold leading-6 tracking-wider text-left text-gray-900 uppercase"
                  >
                    POOL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-semibold leading-6 tracking-wider text-left text-gray-900 uppercase"
                  >
                    STAKED
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-base font-semibold leading-6 tracking-wider text-left text-gray-900 uppercase"
                  >
                    STAKED VALUE
                  </th>
                </tr>
              </thead>
              <tbody>
                {(withXTZ || investments)?.map((farm) => (
                  <tr key={farm?.id}>
                    <td className="px-6 py-4 font-sans text-sm text-gray-900 whitespace-nowrap ">
                      <div className="inline-flex ">
                        <div className="flex-shrink-0">
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
                        <div className="flex-shrink-0 -translate-x-2">
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
                        {farm?.investmentId}
                      </div>
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
