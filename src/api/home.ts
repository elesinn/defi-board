import useSWR from 'swr';

export type IHome = {
  accountsData: {
    activeAccounts: number;
    fundedAccounts: number;
    publicAccounts: number;
    totalAccounts: number;
    totalContracts: number;
  };
  cycleData: {
    cycle: number;
    endTime: string; // '2022-02-21T23:48:30Z';
    firstLevel: number;
    lastLevel: number;
    level: number;
    progress: number;
    startTime: string; //'2022-02-19T02:43:50Z';
    timestamp: string; //'2022-02-21T18:30:30Z';
  };
  dailyData: {
    accounts: number;
    accountsDiff: number;
    calls: number;
    callsDiff: number;
    txs: number;
    txsDiff: number;
    volume: number;
    volumeDiff: number;
  };
  governanceData: {
    epoch: number;
    epochEndTime: string; //'2022-03-30T23:17:00Z';
    epochStartTime: string; //'2022-01-17T23:15:50Z';
    period: string; //'testing';
    periodEndTime: string; //'2022-03-02T12:36:30Z';
    proposal: string; //'Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A';
    protocol: string; //'Ithaca 2';
  };
  marketData: {
    circulatingSupply: number;
    totalSupply: number;
  };
  priceChart: {
    date: string; //'2022-01-23T12:00:00Z';
    value: number;
  }[];

  stakingData: {
    avgRoi: number;
    bakers: number;
    inflation: number;
    stakingPercentage: number;
    totalStaking: number;
  };
  txsData: {
    burned: number;
    burnedDiff: number;
    calls: number;
    callsDiff: number;
    fees: number;
    feesDiff: number;
    txs: number;
    txsDiff: number;
    volume: number;
    volumeDiff: number;
  };
};

export const useHomeData = () => {
  return useSWR<IHome>('home?quote=usd');
};
