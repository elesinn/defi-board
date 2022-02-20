import { useAtom } from 'jotai';
import Image from 'next/image';

import {
  usePlentyInvestments,
  usePlentyInvestmentsInXTZ,
} from 'api/investments';
import { addressSearchAtom } from 'features/site-layout';
import { TZ } from 'shared/utils/tezos-sign';

export const InvestmentTable = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data: investments } = usePlentyInvestments(address);
  const { data: withXTZ } = usePlentyInvestmentsInXTZ(address);
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  ></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    LP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex ">
                        <div>
                          <Image
                            src={`/images/${
                              farm?.investmentId.split(' - ')[0]
                            }.png`}
                            alt="token-icon-1"
                            className="rounded-full"
                            height={24}
                            width={24}
                          />
                        </div>
                        <div className="-translate-x-2 ">
                          <Image
                            src={`/images/${
                              farm?.investmentId.split(' - ')[1]
                            }.png`}
                            alt="token-icon-2"
                            className="rounded-full"
                            height={24}
                            width={24}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {farm?.investmentId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {farm?.tokenBalance} LP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {(farm as any)?.XTZBalance} {TZ}
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
