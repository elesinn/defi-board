import React, { useMemo } from 'react';

import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';

import { useTokenAggregateDaily } from 'api/tezPrices';
import { Contract } from 'api/tezPrices/types';

interface DataFormat {
  date: number;
  value: number;
}

const PriceChangeChart = ({ token }: { token?: Contract }) => {
  const { chartData } = useTokenAggregateDaily(token);
  const lastData = chartData[chartData.length - 1];

  const gain =
    chartData[0] && lastData ? chartData[0].price < lastData.price : false;

  const data = useMemo(() => {
    let tmpData: DataFormat[] = [];
    chartData.forEach((d) => {
      tmpData.push({ date: new Date(d.timestamp).getTime(), value: d.price });
    });
    return tmpData;
  }, [chartData]);

  return (
    <>
      {token && (
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 8, left: 16, bottom: 0 }}
          >
            <YAxis
              domain={[
                (dataMin: number) => dataMin * 0.95,
                (dataMax: number) => dataMax * 1.05,
              ]}
              hide
            />
            <Area
              type="monotone"
              dataKey="value"
              dot={false}
              animationDuration={3000}
              strokeWidth={2}
              stroke={gain ? '#16a43a' : '#dc2626'}
              fillOpacity={1}
              fill={`url(#${gain ? 'gain' : 'loss'})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default PriceChangeChart;
