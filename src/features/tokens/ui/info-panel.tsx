import { ResponsiveContainer, BarChart, Bar, XAxis } from 'recharts';

import { useXtzPriceForCurrency } from 'api/coingecko';
import { formatTezosBalanceInCurrency } from 'shared/utils/balance';
import { TZ } from 'shared/utils/tezos-sign';

type Props = {
  data: { value: number; id: string }[];
};

export const TokensInfoPanel = ({ data }: Props) => {
  const { value, currency } = useXtzPriceForCurrency();
  const total = data.reduce<number>((acc, item) => acc + item.value, 0);
  const formattedTotal = Math.round(total * 100) / 100;
  return (
    <div className="flex flex-col gap-2">
      <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg shadow bg-main-500">
        <dt className="text-sm font-medium text-white">Total</dt>
        <dd className="mt-1 text-3xl font-semibold text-green-400 truncate">
          {formattedTotal}
          {TZ}
          <div className="text-xs text-green-400">
            {formatTezosBalanceInCurrency(
              formattedTotal,
              value,
              currency,
              true,
            )}
          </div>
        </dd>
      </dl>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="id"
              orientation="bottom"
              stroke="#4a5568"
              axisLine={false}
              tickLine={false}
            />
            <Bar
              dataKey="value"
              fill="#7C76EB"
              label={{
                position: 'top',
                formatter: (balance: any) =>
                  formatTezosBalanceInCurrency(balance, value, currency, true),
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
