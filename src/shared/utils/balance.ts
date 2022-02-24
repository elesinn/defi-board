import { TZ } from './tezos-sign';

export const formatTezosBalance = (balance?: number) =>
  balance ? Math.round(balance / 10000) / 100 : 0;

export const formatTezosBalanceWithSign = (balance?: number) =>
  formatTezosBalance(balance) + TZ;

export const formatTezosBalanceInCurrency = (
  tzBalance = 0,
  value: number,
  currecny: string,
  alreadyInTzx = false,
) =>
  `${currecny.toUpperCase()} ${(
    (!alreadyInTzx ? formatTezosBalance(tzBalance) : tzBalance) * value
  ).toFixed(3)}`;
