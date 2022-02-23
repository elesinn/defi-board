import { ResponsivePie } from '@nivo/pie';
import _ from 'lodash';

import { TZ } from 'shared/utils/tezos-sign';

const TokensDonut = ({ data }: { data: any }) => {
  const dataSortedByBalance = _.orderBy(data, 'balanceinTzx', 'desc').filter(
    (d) => d.balanceinTzx > 0,
  );

  const dataToDisplay = dataSortedByBalance.slice(0, 5).map((d) => ({
    id: d.symbol,
    value: d.balanceinTzx,
  }));

  const otherData = dataSortedByBalance
    .slice(6, dataSortedByBalance.length - 1)
    .reduce((acc, data) => {
      acc += Number(data.balanceinTzx) || 0;
      return acc;
    }, 0);
  const otherDataToDisplay =
    otherData > 0 ? { id: 'Other Tokens', value: otherData } : undefined;

  return (
    <ResponsivePie
      data={
        otherDataToDisplay
          ? [...dataToDisplay, otherDataToDisplay]
          : dataToDisplay
      }
      fit
      colors={{ scheme: 'pastel1' }}
      animate={true}
      activeOuterRadiusOffset={8}
      innerRadius={0.6}
      sortByValue
      padAngle={0.5}
      margin={{ bottom: 80, left: 80, right: 80, top: 80 }}
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

export default TokensDonut;
