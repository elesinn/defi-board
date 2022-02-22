import BigNumber from 'bignumber.js';
import useSwr from 'swr';

import { useTokensInfo } from 'api/tezPrices';

import { Config } from './config';
import { calcMultiplier, estimatePendingRewards } from './utils';

export interface ICrunchyFarm {
  id: number;
  active: boolean;
  hash: string;
  key: string;
  value: Value;
  firstLevel: number;
  lastLevel: number;
  updates: number;
}

export interface Value {
  owner: string;
  bonuses: Bonus[];
  endTime: string; //Date
  poolToken: Token;
  startTime: string; //Date
  rewardPaid: string;
  poolBalance: string;
  rewardToken: Token;
  lockDuration: string;
  rewardPerSec: string;
  rewardSupply: string;
  lastRewardTime: string; //Date
  accRewardPerShare: string;
}

export interface Bonus {
  endTime: string; //Date
  multiplier: string;
}

export interface Token {
  address: string;
  tokenId: string;
  tokenType: any;
}

const useCrunchyFarmsDataFromContract = () => {
  return useSwr<ICrunchyFarm[]>(
    `contracts/${Config.CRUNCHY_CONTRACT}/bigmaps/farms/keys?limit=1000`,
  );
};

export interface ICrunchyUserFarm {
  id: number;
  active: boolean;
  hash: string;
  key: ICrunchyUserFarmKey;
  value: ICrunchyUserFarmValue;
  firstLevel: number;
  lastLevel: number;
  updates: number;
}

export interface ICrunchyUserFarmKey {
  nat: string;
  address: string;
}

export interface ICrunchyUserFarmValue {
  amount: string;
  rewardDebt: string;
  lockEndTime: Date;
}
const useCrunchyFarmsDataForUser = (address: string) => {
  return useSwr<ICrunchyUserFarm[]>(
    `contracts/${Config.CRUNCHY_CONTRACT}/bigmaps/ledger/keys?limit=1000&key.address=${address}&active=true`,
  );
};

export const useCrunchyInvestments = (userAddress: string) => {
  const { data: userFarmsData } = useCrunchyFarmsDataForUser(userAddress);
  const { data: farmsData } = useCrunchyFarmsDataFromContract();
  const { data: prices } = useTokensInfo();
  if (!userFarmsData || !farmsData || !prices) return { farms: undefined };

  let userFarms: any[] = [];
  userFarmsData.forEach((userRecord) => {
    let poolToken;

    if (Number(userRecord.value.amount) <= 0) {
      return;
    }

    const farm = farmsData.find((f) => {
      return f.key == userRecord.key.nat;
    });

    let poolTokenMeta = Object.values(prices).find(
      (priceInfo) =>
        priceInfo.tokenAddress === farm?.value.poolToken.address &&
        priceInfo.tokenId === Number(farm?.value.poolToken.tokenId),
    );

    if (!poolTokenMeta) {
      poolTokenMeta = Object.values(prices).find(
        (priceInfo) => priceInfo.address === farm?.value.poolToken.address,
      );
    }

    const rewardTokenMeta = Object.values(prices).find(
      (priceInfo) =>
        (priceInfo.tokenAddress === farm?.value.rewardToken.address &&
          priceInfo.tokenId == Number(farm?.value.rewardToken.tokenId)) ||
        priceInfo.tokenAddress === farm?.value.rewardToken.address ||
        priceInfo.address === farm?.value.rewardToken.address,
    );

    if (rewardTokenMeta) {
      rewardTokenMeta.tokenAddress = farm?.value.rewardToken.address || '';
      rewardTokenMeta.tokenId = Number(farm?.value.rewardToken.tokenId);
    }

    const isQuipuLp = poolTokenMeta?.address === farm?.value.poolToken.address;

    if (isQuipuLp) {
      poolToken = {
        ...poolTokenMeta,
        isQuipuLp,
        decimals: 6,
        tokenId: farm?.value.poolToken.tokenId,
        realTokenAddress: poolTokenMeta?.tokenAddress,
        realTokenId: poolTokenMeta?.tokenId,
        thumbnailUri:
          poolTokenMeta?.thumbnailUri?.replace(
            'ipfs://',
            'https://ipfs.fleek.co/ipfs/',
          ) || '',
      };
    } else {
      poolToken = {
        ...poolTokenMeta,
        isQuipuLp,
        address: poolTokenMeta?.tokenAddress,
        thumbnailUri:
          poolTokenMeta?.thumbnailUri?.replace(
            'ipfs://',
            'https://ipfs.fleek.co/ipfs/',
          ) || '',
      };
    }

    const rewardToken = {
      ...rewardTokenMeta,
      address: rewardTokenMeta?.tokenAddress,
      thumbnailUri:
        rewardTokenMeta?.thumbnailUri?.replace(
          'ipfs://',
          'https://ipfs.fleek.co/ipfs/',
        ) || '',
    };

    const userFarm = {
      ...userRecord,
      poolToken: poolToken,
      stakedAmount: userRecord.value.amount,
      rewardToken: rewardToken,
      rewardDebt: userRecord.value.rewardDebt,
      rewardPendingRaw: estimatePendingRewards(
        userRecord,
        farm?.value,
        new BigNumber(calcMultiplier(farm?.value)),
      ),
    };

    //@ts-ignore
    userFarm.rewardPending = userFarm.rewardPendingRaw.dividedBy(
      new BigNumber(Math.pow(10, userFarm.rewardToken.decimals || 0)),
    );

    if (poolToken.isQuipuLp) {
      //@ts-ignore
      userFarm.stakedValue = BigNumber(userFarm.stakedAmount)
        .div(new BigNumber(10).pow(6))
        .times(new BigNumber(poolToken.tezPool || 0))
        .div(new BigNumber(poolToken.qptTokenSupply || 0))
        .times(new BigNumber(2));
    } else {
      //@ts-ignore
      userFarm.stakedValue = new BigNumber(userFarm.stakedAmount)
        .div(new BigNumber(10).pow(poolToken.decimals || 0))
        .times(new BigNumber(poolToken.currentPrice || 0));
    }

    if (rewardTokenMeta && rewardTokenMeta.currentPrice) {
      //@ts-ignore
      userFarm.rewardValue = userFarm.rewardPending.times(
        rewardTokenMeta.currentPrice,
      );
    } else {
      //@ts-ignore
      userFarm.rewardValue = new BigNumber(0);
    }

    userFarms.push(userFarm);
  });

  return { farms: userFarms };
};
