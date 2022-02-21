import { useEffect, useMemo } from 'react';

import { gql, request } from 'graphql-request';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import { tzktApi } from 'api';

import { IOperation } from './types';

export type IAccount = {
  activeTokensCount: number;
  address: string;
  balance: number;
  counter: number;
  firstActivity: number;
  firstActivityTime: string;
  lastActivity: number;
  lastActivityTime: string;
  numActivations: number;
  numContracts: number;
  numDelegations: number;
  numMigrations: number;
  numOriginations: number;
  numRegisterConstants: number;
  numReveals: number;
  numTransactions: number;
  revealed: boolean;
  tokenBalancesCount: number;
  tokenTransfersCount: number;
  type: string;
};

export type IBalance = {
  balance: number;
  level: number;
  timestamp: string; // "2019-09-05T22:15:04Z"
};

export const useAccount = (address: string) => {
  return useSWR<IAccount>(`accounts/${address}`);
};

export const useOperations = (address: string) => {
  return useSWR<IOperation[]>(`accounts/${address}/operations`);
};

export const useBalanceHistory = (address: string) => {
  return useSWR<IBalance[]>(`accounts/${address}/balance_history`);
};

export const useAccountDomain = (address: string) => {
  const query = gql`{
    domains(where: { address: { in: ["${address}"] } }) {
      items {
        address
        owner
        name
        level
      }
    }
  }`;
  return useSWR<
    { address: string; level: number; name: string; owner: string }[]
  >(query, async () => {
    const res = await request('https://api.tezos.domains/graphql', query);
    return res?.domains?.items;
  });
};

export const useAllOperationsListByType = (address: string, type: string) => {
  const { data, size, setSize } = useSWRInfinite<IOperation[]>(
    (pageIndex: number, previousPageData: any) => {
      if (pageIndex === 0)
        return `accounts/${address}/operations?limit=1000&type=${type}`;

      return `accounts/${address}/operations?limit=1000&type=${type}&lastId=${
        previousPageData[previousPageData.length - 1].id
      }`;
    },
    (resource) => tzktApi.get(resource).json(),
  );

  const isReachingEnd = useMemo(() => {
    if (!data) return;
    const isEmpty = data && data[0] && data[0].length === 0;
    const lastItem = data[data.length - 1];
    return isEmpty || (data && lastItem && lastItem.length < 1000);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    if (!isReachingEnd && isReachingEnd !== undefined) {
      setSize(size + 1);
    }
  }, [data, isReachingEnd]);

  return {
    data:
      isReachingEnd && data
        ? new Array<IOperation>().concat(...data)
        : undefined,
  };
};

const getFeesInfo = (operations: IOperation[]) => {
  const operationsCount = operations.length;

  const fees = operations.reduce(
    (acc, operation) => {
      acc.bakerFee += operation.bakerFee || 0;
      acc.allocationFee += operation.allocationFee || 0;
      acc.storageFee += operation.storageFee || 0;
      acc.storageUsed += operation.storageUsed || 0;
      acc.gasUsed += operation.gasUsed || 0;
      return acc;
    },
    {
      allocationFee: 0,
      bakerFee: 0,
      gasUsed: 0,
      storageFee: 0,
      storageUsed: 0,
    },
  );

  const averageFees = {
    allocationFeeAverage: fees.allocationFee / operationsCount,
    bakerFeeFeeAverage: fees.bakerFee / operationsCount,
    gasUsedAverage: fees.gasUsed / operationsCount,
    storageFeeAverage: fees.storageFee / operationsCount,
    storageUsedAverage: fees.storageUsed / operationsCount,
  };

  return { fees, averageFees, operationsCount };
};

export const useOperationsInfo = (address: string) => {
  const { data: delegationData } = useAllOperationsListByType(
    address,
    'delegation',
  );
  const { data: originationData } = useAllOperationsListByType(
    address,
    'origination',
  );
  const { data: transactionData } = useAllOperationsListByType(
    address,
    'transaction',
  );

  if (!delegationData || !originationData || !transactionData) {
    return;
  }

  const delegationFees = getFeesInfo(delegationData);
  const originationFees = getFeesInfo(originationData);
  const transactionFees = getFeesInfo(transactionData);

  const operationsInfo = {
    allocationFee:
      delegationFees.fees.allocationFee +
      originationFees.fees.allocationFee +
      transactionFees.fees.allocationFee,
    bakerFee:
      delegationFees.fees.bakerFee +
      originationFees.fees.bakerFee +
      transactionFees.fees.bakerFee,
    gasUsed:
      delegationFees.fees.gasUsed +
      originationFees.fees.gasUsed +
      transactionFees.fees.gasUsed,
    storageFee:
      delegationFees.fees.storageFee +
      originationFees.fees.storageFee +
      transactionFees.fees.storageFee,
    storageUsed:
      delegationFees.fees.storageUsed +
      originationFees.fees.storageUsed +
      transactionFees.fees.storageUsed,
    operationCount:
      delegationFees.operationsCount +
      originationFees.operationsCount +
      transactionFees.operationsCount,
  };

  return operationsInfo;
};
