import useSWR from 'swr';

import { investmentData } from './investmentsData';
import { IInvestment } from './types';

export const useInvestment = ({
  userAddress,
  investmentKey,
}: {
  userAddress: string;
  investmentKey: keyof typeof investmentData;
}) => {
  const inv = investmentData[investmentKey];
  return useSWR<IInvestment>(
    `contracts/${inv.address}/bigmaps/balances/keys/${userAddress}`,
  );
};
