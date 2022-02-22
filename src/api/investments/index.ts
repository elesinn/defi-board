import useSWR from 'swr';

import { InvestmentKey, PlentyFarms } from './plenty/config';
import { IInvestment } from './types';

export const useInvestment = ({
  userAddress,
  investmentKey,
}: {
  userAddress: string;
  investmentKey: InvestmentKey;
}) => {
  const inv = PlentyFarms[investmentKey];
  return useSWR<IInvestment>(
    inv
      ? `contracts/${inv.CONTRACT}/bigmaps/balances/keys/${userAddress}`
      : null,
  );
};
