import { useAtom } from 'jotai'

import { useAddressQuery } from 'api/account'
import { addressSearchAtom } from 'features/site-layout'

import Operations from './operaions-table'

export const Dashboard = () => {
  const [address] = useAtom(addressSearchAtom)
  const { data: account } = useAddressQuery(address)
  if (!account) {
    return null
  }

  const stats = [
    {
      name: 'Balance',
      stat: Math.round(account?.balance / 10000) / 100,
    },
    {
      name: 'Total Transactions',
      stat: account?.numTransactions,
    },
    {
      name: 'Active Tokens',
      stat: account?.activeTokensCount,
    },
  ]
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
      <div className="relative py-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <span className="px-3 bg-white text-lg font-medium text-gray-900">Last 10 operations</span>
        </div>
      </div>
      <Operations />
    </div>
  )
}
