import { useAtom } from 'jotai'

import { useAddressQuery } from 'api/account'
import { addressSearchAtom } from 'features/site-layout'

export const Dashboard = () => {
  const [address] = useAtom(addressSearchAtom)
  const { data: account } = useAddressQuery(address)

  if (!account) {
    return null
  }

  const stats = [
    {
      name: 'Balance',
      stat: account?.balance / 1000000,
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
      {/* <h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3> */}
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
