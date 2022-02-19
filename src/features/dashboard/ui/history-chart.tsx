import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';

import { useBalanceHistory } from 'api/account';
import { addressSearchAtom } from 'features/site-layout';
import { TZ } from 'shared/utils/tezos-sign';

export const HistoryChart = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data: history } = useBalanceHistory(address);

  if (!history) {
    return null;
  }

  const data = [
    {
      id: 'XTZ',
      data: history?.map((item) => ({
        x: item.timestamp,
        y: Math.round(item.balance / 10000) / 100,
      })),
    },
  ];

  return (
    <ResponsiveLine
      data={data}
      tooltip={(value) => {
        return (
          <div className="block p-4 rounded-lg shadow-lg bg-white max-w-sm">
            {dayjs(value.point.data.x).format('YYYY-MM-DD HH:mm')} &mdash;{' '}
            {value.point.data.y}
            {TZ}
          </div>
        );
      }}
      enableGridX={false}
      enableGridY={false}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{ type: 'linear', nice: true, clamp: true }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%SZ',
        nice: true,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
        format: (value: Date) => {
          return dayjs(value).format('YYYY-MM-DD');
        },
      }}
      axisLeft={{
        // orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Balance',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .45)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
