import ky from 'ky'

export enum QueryType {
  Address = 'address',
  Operations = 'Operations',
  BalanceHistory = 'BalanceHistory',
}

export const tzApi = ky.extend({
  prefixUrl: 'https://api.tzkt.io/v1/',
})
