import { TZ } from './tezos-sign';

export const formatTezosBalance = (balance?: number) =>
  balance ? (Math.round(balance / 10000) / 100).toString() + TZ : 0 + TZ;
