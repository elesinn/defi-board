import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import {
  ResponsiveContainer,
  AreaChart,
  YAxis,
  Area,
  XAxis,
  Tooltip,
} from 'recharts';

import { useXtzMarketChart } from 'api/coingecko';

const daysButtons = [
  {
    value: 1,
    title: '24h',
  },
  {
    value: 7,
    title: 'Week',
  },
  {
    value: 30,
    title: '30d',
  },
  {
    value: 90,
    title: '90d',
  },
];

export const TezosPriceChart = () => {
  const { data: historical, currencyAtom, daysAtom } = useXtzMarketChart();
  const [currency] = useAtom(currencyAtom);
  const [days, setDays] = useAtom(daysAtom);

  const tezosPrizesData = historical?.prices?.map(([timestamp, value]) => ({
    Price: value,
    date: dayjs(timestamp).valueOf(),
  }));
  return (
    <div className="flex flex-col gap-3 w-full h-[300px]">
      <ResponsiveContainer height="100%" width="100%">
        <AreaChart data={tezosPrizesData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="25%" stopColor="#7C76EB" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7C76EB" stopOpacity={0} />
            </linearGradient>
          </defs>
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
            formatter={(value: number) => {
              if (['btc', 'eth'].find((item) => item === currency)) {
                return value.toFixed(12) + ` ${currency.toUpperCase()}`;
              }
              return (
                Math.round(value * 100) / 100 + ` ${currency.toUpperCase()}`
              );
            }}
            labelFormatter={(value: number) =>
              days < 30 ? (
                <div className="flex gap-1">
                  {dayjs(value).format('YYYY-MM-DD')}
                  <div className="font-semibold">
                    {dayjs(value).format('HH:mm')}
                  </div>
                </div>
              ) : (
                dayjs(value).format('YYYY-MM-DD')
              )
            }
          />
          <Area
            type="monotone"
            dataKey="Price"
            dot={false}
            animationDuration={2000}
            strokeWidth={2}
            isAnimationActive
            animateNewValues
            stroke={'#7C76EB'}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex justify-between gap-2">
        {daysButtons.map((item) => (
          <div
            key={item.value}
            className={classNames(
              'px-4 py-1 rounded-3xl cursor-pointer font-semibold shadow',
              days === item.value
                ? 'bg-main-500 text-white'
                : 'bg-white bg-opacity-40',
            )}
            onClick={() => setDays(item.value)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};
