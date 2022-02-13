import { ResponsiveLine } from '@nivo/line';
import { useAtom } from 'jotai';

import { useBalanceHistory } from 'api/account';
import { addressSearchAtom } from 'features/site-layout';

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

  // 2019-09-05T22:15:04Z
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{ type: 'point' }}
      xScale={{
        // type: 'linear',
        min: 'auto',
        max: 'auto',
        // stacked: true,
        // reverse: false,
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%SZ',
        useUTC: false,
        precision: 'second',
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Date',
        legendOffset: 36,
        legendPosition: 'middle',
        format: '%Y-%m-%dT%H:%M:%SZ',
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
