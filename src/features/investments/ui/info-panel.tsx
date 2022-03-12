import { useXtzPriceForCurrency } from 'api/coingecko';
import { formatTezosBalanceInCurrency } from 'shared/utils/balance';
import { TZ } from 'shared/utils/tezos-sign';

type Props = {
  data: { value: number; id: string }[];
};

export const InvestmentInfoPanel = ({ data }: Props) => {
  const { value, currency } = useXtzPriceForCurrency();
  const total = data.reduce<number>((acc, item) => acc + item.value, 0);
  const formattedTotal = Math.round(total * 100) / 100;

  return (
    <div className="grid grid-cols-2 bg-white divide-x rounded-lg shadow md:grid-cols-3 bg-opacity-40">
    <dl className="flex flex-col px-4 py-5 overflow-hidden  bg-main-500 rounded-l-lg">
      <dt className="text-sm font-medium text-white ">Total</dt>
        <dd className="mt-1 text-3xl font-semibold text-green-400 truncate">
          {formattedTotal}  
          {TZ}
          <div className="text-xs text-green-300">
            {formatTezosBalanceInCurrency(
              formattedTotal,
              value,
              currency,
              true,
            )}
          </div>
        </dd>
    </dl>
    {data.map((item) => {
        const balance = Math.round(item.value * 100) / 100;
        return (
          <dl
            className="flex flex-col px-4 py-5 overflow-hidden"
            key={item.id}
          >
            <dt className="text-sm font-medium text-gray-600">{item.id}</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
              {balance}
              {TZ}
              <div className="text-xs text-gray-700">
                {formatTezosBalanceInCurrency(balance, value, currency, true)}
              </div>
            </dd>
          </dl>
        );
      })}
  </div>
  )
 
};
