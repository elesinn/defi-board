import { ResponsivePie } from '@nivo/pie';

import { TZ } from 'shared/utils/tezos-sign';

export const InvestmentsDonut = ({
  data,
}: {
  data: { id: string | number; value: number }[];
}) => {
  // const dataSortedByBalance = _.orderBy(data, 'balanceinTzx', 'desc').filter(
  //   (d) => d.balanceinTzx > 0,
  // );

  // const dataToDisplay = dataSortedByBalance.slice(0, 10).map((d) => ({
  //   id: d.symbol,
  //   value: d.balanceinTzx,
  // }));

  // const otherData = dataSortedByBalance
  //   .slice(11, dataSortedByBalance.length - 1)
  //   .reduce((acc, data) => {
  //     acc += data.balanceinTzx || 0;
  //     return acc;
  //   }, 0);
  // const otherDataToDisplay =
  //   otherData > 0 ? { id: 'Other Tokens', value: otherData } : undefined;

  return (
    <ResponsivePie
      colors={{ scheme: 'pastel1' }}
      data={data}
      animate={true}
      activeOuterRadiusOffset={8}
      innerRadius={0.6}
      padAngle={0.5}
      margin={{ bottom: 10, left: 80, right: 80, top: 10 }}
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
    />
  );
};
