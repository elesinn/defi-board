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

  return { data: normalizedInfo };
};
