import { Pie } from '@nivo/pie';
import { useAtom } from 'jotai';
import ky from 'ky';
import _ from 'lodash';
import useSwr from 'swr';

import { tezosAccountAtom } from 'features/beacon/useTezos';
import { TZ } from 'shared/utils/tezos-sign';

export const TokensDonut = ({ data }: { data: any }) => {
  const [account] = useAtom(tezosAccountAtom);

  // const { data: balance } = useSwr('/api/date', (path) => ky.get(path).json());
  const { data: balance } = useSwr('/api/balance', (path) =>
    ky
      .post(path, {
        body: JSON.stringify({ id: account }),
        headers: { 'Content-Type': 'application/json' },
      })
      .json(),
  );

  console.log({ balance });

  // const body = { title, content };
  // await fetch('/api/post', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(body),
  // });

  const dataSortedByBalance = _.orderBy(data, 'balanceinTzx', 'desc').filter(
    (d) => d.balanceinTzx > 0,
  );

  const dataToDisplay = dataSortedByBalance.slice(0, 10).map((d) => ({
    id: d.symbol,
    value: d.balanceinTzx,
  }));

  const otherData = dataSortedByBalance
    .slice(11, dataSortedByBalance.length - 1)
    .reduce((acc, data) => {
      acc += data.balanceinTzx || 0;
      return acc;
    }, 0);
  const otherDataToDisplay =
    otherData > 0 ? { id: 'Other Tokens', value: otherData } : undefined;

  return (
    <Pie
      width={500}
      height={300}
      data={
        otherDataToDisplay
          ? [...dataToDisplay, otherDataToDisplay]
          : dataToDisplay
      }
      animate={true}
      activeOuterRadiusOffset={8}
      innerRadius={0.6}
      padAngle={0.5}
      cornerRadius={5}
      arcLinkLabelsColor={{
        from: 'color',
      }}
      arcLinkLabelsThickness={3}
      arcLinkLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 1.2]],
      }}
      valueFormat={(value) =>
        `${Number(value).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })} ${TZ}`
      }
      // colors={[
      //   '#ffadad',
      //   '#ffd6a5',
      //   '#fdffb6',
      //   '#caffbf',
      //   '#9bf6ff',
      //   '#a0c4ff',
      //   '#bdb2ff',
      //   '#ffc6ff',
      //   '#e0e010',
      //   '#5a5a20',
      //   '#f7f78d',
      // ]}
    />
  );
};
