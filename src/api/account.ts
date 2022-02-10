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

export type IOperation = {
  baker?: {
    address: string
    alias: string
  }
  bakerRewards: number
  block: string
  hash: string
  id: number
  level: number
  revealedLevel: number
  sender?: {
    address: string
    alias: string
  }
  timestamp: string
  type: string
}

export const useAddressQuery = (address: string) => {
  return useQuery([QueryType.Address, address], () => tzApi.get(`accounts/${address}`).json<IAccount>(), {
    enabled: !!address,
  })
}

export const useOperationsQuery = (address: string) => {
  return useQuery(
    [QueryType.Operations, address],
    () => tzApi.get(`accounts/${address}/operations`).json<IOperation[]>(),
    {
      enabled: !!address,
    },
  )
}
