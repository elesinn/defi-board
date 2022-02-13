import useSWR from 'swr';

import { investmentData } from './investmentsData';

export const useInvestment = ({
  userAddress,
  investmentKey,
}: {
  userAddress: string;
  investmentKey: keyof typeof investmentData;
}) => {
  const inv = investmentData[investmentKey];
  return useSWR(
    `contracts/${inv.address}/bigmaps/balances/keys/${userAddress}`,
  );
};
