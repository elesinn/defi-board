import useSWR from 'swr'

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

export type IBalance = {
  balance: number
  level: number
  timestamp: string // "2019-09-05T22:15:04Z"
}

export const useAddress = (address: string) => {
  return useSWR(address ? [QueryType.Address, address] : null, () => tzApi.get(`accounts/${address}`).json<IAccount>())
}

export const useOperations = (address: string) => {
  return useSWR(
    address ? [QueryType.Operations, address] : null,
    () => tzApi.get(`accounts/${address}/operations`).json<IOperation[]>()
  )
}

export const useBalanceHistory = (address: string) => {
  return useSWR(
    address ? [QueryType.BalanceHistory, address] : null,
    () => tzApi.get(`accounts/${address}/balance_history`).json<IBalance[]>()
  )
}
