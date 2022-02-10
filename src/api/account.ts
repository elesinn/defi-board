import { useQuery } from 'react-query'

import { QueryType, tzApi } from 'api'

export type IAccount = {
  activeTokensCount: number
  address: string
  balance: number
  counter: number
  firstActivity: number
  firstActivityTime: string
  lastActivity: number
  lastActivityTime: string
  numActivations: number
  numContracts: number
  numDelegations: number
  numMigrations: number
  numOriginations: number
  numRegisterConstants: number
  numReveals: number
  numTransactions: number
  revealed: boolean
  tokenBalancesCount: number
  tokenTransfersCount: number
  type: string
}

export const useAddressQuery = (address: string) => {
  return useQuery([QueryType.ADDRESS, address], () =>
    tzApi.get(`accounts/${address}`).json<IAccount>(), {enabled: !!address}
  )
}
