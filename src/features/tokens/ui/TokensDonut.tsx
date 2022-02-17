import { Pie } from '@nivo/pie';
import _ from 'lodash';

export const TokensDonut = ({ data }: { data: any }) => {
  const dataSortedByBalance = _.orderBy(data, 'balanceinTzx', 'desc');

  const dataToDisplay = dataSortedByBalance.slice(0, 10).map((d) => ({
    id: d.symbol,
    value: d.balanceinTzx?.toFixed(3),
  }));

  const otherData = dataSortedByBalance
    .slice(11, dataSortedByBalance.length - 1)
    .reduce((acc, data) => {
      acc += data.balanceinTzx || 0;
      return acc;
    }, 0);

  return (
    <Pie
      width={500}
      height={300}
      data={[
        ...dataToDisplay,
        { id: 'Other Tokens', value: otherData.toFixed(3) },
      ]}
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
    />
  );
};