import useSWR from 'swr';

import { tzToolsApi } from '../index';
import { Contract, IPrices } from './types';

export const useTokensInfo = () => {
  const { data: info } = useSWR<IPrices>('prices', (resource) =>
    tzToolsApi.get(resource).json(),
  );

  const normalizedInfo = info?.contracts.reduce<Record<string, Contract>>(
    (acc, contract) => {
      acc[contract.symbol as string] = contract;
      return acc;
    },
    {},
  );

  if (normalizedInfo) {
    Object.defineProperty(normalizedInfo, 'XTZ', {
      value: { decimals: 18, currentPrice: 1 },
    });

    // (normalizedInfo.XTZ as any).decimals = 18;
    // (normalizedInfo.XTZ as any).currentPrice = 1;
  }

  return { data: normalizedInfo };
};
