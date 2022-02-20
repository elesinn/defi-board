import { atom } from 'jotai';

export type IInvestmentBalances = {
  Plenty: Record<string, number>;
};
export const investmentBalancesAtom = atom<IInvestmentBalances>({
  Plenty: {},
});
