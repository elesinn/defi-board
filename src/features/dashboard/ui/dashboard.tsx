import { useAtom } from 'jotai';

import { useAccount } from 'api/account';
import { addressSearchAtom } from 'features/site-layout';
import { TZ } from 'shared/tezos-sign';

import AccountDomain from './account-domain';
import { HistoryChart } from './history-chart';
import Operations from './operaions-table';

export const Dashboard = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data: account } = useAccount(address);
  if (!account) {
    return null;
  }
  const stats = [
    {
      name: 'Balance',
      stat: (Math.round(account?.balance / 10000) / 100).toString() + TZ,
    },
    {
      name: 'Total Transactions',
      stat: account?.numTransactions,
    },
    {
      name: 'Active Tokens',
      stat: account?.activeTokensCount,
    },
  ];
  return (
    <div>
      <AccountDomain />
      <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 overflow-hidden bg-white rounded-lg shadow sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-lg font-medium text-gray-900 bg-white">
            History
          </span>
        </div>
      </div>
      <div className="h-80">
        <HistoryChart />
      </div>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 text-lg font-medium text-gray-900 bg-white">
            Last 10 operations
          </span>
        </div>
      </div>
      <Operations />
    </div>
  );
};
