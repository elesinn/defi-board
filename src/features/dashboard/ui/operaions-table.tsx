import { useAtom } from 'jotai';

import { useOperations } from 'api/account/account';
import { addressSearchAtom } from 'features/site-layout';

export default function Operations() {
  const [address] = useAtom(addressSearchAtom);
  const { data: operations } = useOperations(address);

  if (!operations) {
    return null;
  }

  const dataSource = operations.slice(0, 10);

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
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Sender
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Type
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSource.map((operation) => (
                  <tr key={operation.hash}>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {operation.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="ml-0">
                        <div className="text-sm font-medium text-gray-900">
                          {operation.sender?.alias}
                        </div>
                        <div className="text-sm text-gray-500">
                          {operation.sender?.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {operation?.timestamp
                        ? new Date(operation.timestamp).toDateString()
                        : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {operation.type}
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
}
