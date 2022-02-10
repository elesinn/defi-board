import ky from 'ky'

export enum QueryType {
  ADDRESS = 'ADDRESS',
}
export const tzApi = ky.extend({
  prefixUrl: 'https://api.tzkt.io/v1/',
})
