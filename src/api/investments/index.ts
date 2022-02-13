import useSWR from 'swr';

import { QueryType, tzApi } from 'api';

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
  return useSWR(
    userAddress ? [QueryType.Investments, userAddress, investmentKey] : null,
    () => {
      return tzApi
        .get(`contracts/${inv.address}/bigmaps/balances/keys/${userAddress}`)
        .json<IInvestment>();
    },
  );
};
