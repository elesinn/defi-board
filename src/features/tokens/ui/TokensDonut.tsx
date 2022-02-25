import { ResponsivePie } from '@nivo/pie';

import { TZ } from 'shared/utils/tezos-sign';

type Props = {
  data: { value: number; id: string }[];
};
const TokensDonut = ({ data }: Props) => {
  return (
    <ResponsivePie
      data={data}
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
