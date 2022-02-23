import dayjs from 'dayjs';
import {
  ResponsiveContainer,
  AreaChart,
  YAxis,
  Area,
  XAxis,
  Tooltip,
} from 'recharts';

import { useHomeData } from 'api/home';

export const TezosPriceChart = () => {
  const { data } = useHomeData();

  const tezosPrizesData = data?.priceChart.map((item) => ({
    Price: Math.round(item.value * 100) / 100,
    date: dayjs(item.date).valueOf(),
  }));
  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart
        data={tezosPrizesData}
        margin={{ top: 0, right: 8, left: 16, bottom: 0 }}
      >
        <YAxis
          domain={[
            (dataMin: number) => dataMin * 0.95,
            (dataMax: number) => dataMax * 1.05,
          ]}
          hide
        />
        <XAxis
          tickFormatter={(value) => dayjs(value).format('YYYY-MM-DD')}
          dataKey={'date'}
          scale="time"
          type="number"
          domain={['auto', 'auto']}
          hide
        />
        <Tooltip
          label=""
          formatter={(value: number) => value + 'USD'}
          labelFormatter={(value: number) => dayjs(value).format('YYYY-MM-DD')}
        />
        <Area
          type="monotone"
          dataKey="Price"
          dot={false}
          animationDuration={3000}
          strokeWidth={2}
          stroke={'#9e62fd'}
          // stroke={gain ? '#16a43a' : '#dc2626'}
          fillOpacity={0}
          fill={'#9e62fd'}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
