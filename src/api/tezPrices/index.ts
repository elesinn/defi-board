import { useMemo } from 'react';

import useSWR from 'swr';

import { tzToolsApi } from '../index';
import { Contract, IPrices, ITokenAggregateDaily } from './types';

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

export const useTokenAggregateDaily = (token?: Contract) => {
  const { data } = useSWR<ITokenAggregateDaily[]>(
    token
      ? token.type === 'fa1.2'
        ? `${token.tokenAddress}/pools/${token.address}/aggregate_daily`
        : `${token.tokenAddress}_${token.tokenId}/pools/${token.address}/aggregate_daily`
      : null,
    (resource) => tzToolsApi.get(resource).json(),
  );

  const tokenDailyStat =
    data && token
      ? {
          priceIncreace:
            //@ts-ignore
            data[data.length - 2].t1priceMa < token.currentPrice,
          difference: (() => {
            //@ts-ignore
            const priceBefore = data[data.length - 2].t1priceMa;
            const currentPrice = token.currentPrice;
            const difference =
              (priceBefore - currentPrice) / ((priceBefore + currentPrice) / 2);
            return Math.abs(difference * 100);
          })(),
        }
      : {};

  const chartData =
    data && token
      ? [...data.slice(-30)].map((stat) => ({
          timestamp: stat.periodOpen,
          price: +stat.t1priceOpen,
        }))
      : [];

  const tokensWeeklyStat = useMemo(() => {
    if (!data || !token) return;

    const firstDayData = data[data.length - 8];
    if (!firstDayData) {
      return undefined;
    }

    return {
      increase: firstDayData.t1priceMa < token.currentPrice,
      difference: (() => {
        const priceBefore = firstDayData.t1priceMa;
        const currentPrice = token.currentPrice;
        const difference =
          (priceBefore - currentPrice) / ((priceBefore + currentPrice) / 2);
        return Math.abs(difference * 100);
      })(),
    };
  }, [data, token]);

  return {
    tokenDailyStat,
    chartData,
    tokensWeeklyStat,
  };
};
