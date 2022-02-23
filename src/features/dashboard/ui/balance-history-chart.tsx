import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import {
  ResponsiveContainer,
  AreaChart,
  YAxis,
  Area,
  Tooltip,
  XAxis,
} from 'recharts';

import { useBalanceHistory } from 'api/account/account';
import { addressSearchAtom } from 'features/site-layout';
import { formatTezosBalance } from 'shared/utils/balance';

const BalanceHistoryChart = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data: history } = useBalanceHistory(address);
  const data = history?.map((item) => ({
    date: dayjs(item.timestamp).valueOf(),
    value: item.balance,
  }));
  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
        <YAxis
          domain={[
            (dataMin: number) => dataMin * 0.95,
            (dataMax: number) => dataMax * 1.05,
          ]}
          hide
        />
        <Tooltip
          formatter={(value: number) => formatTezosBalance(value)}
          labelFormatter={(value: number) => dayjs(value).format('YYYY-MM-DD')}
        />
        <XAxis
          tickFormatter={(value) => dayjs(value).format('YYYY-MM-DD')}
          dataKey={'date'}
          scale="time"
          type="number"
          domain={['auto', 'auto']}
        />
        <Area
          type="monotone"
          dataKey="value"
          animationDuration={3000}
          strokeWidth={2}
          stroke={'#7C76EB'}
          fillOpacity={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default BalanceHistoryChart;
