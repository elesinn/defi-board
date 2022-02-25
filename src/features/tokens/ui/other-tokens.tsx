import { useXtzPriceForCurrency } from 'api/coingecko';
import { formatTezosBalanceInCurrency } from 'shared/utils/balance';
import { TZ } from 'shared/utils/tezos-sign';

type Props = {
  otherSum: number;
};

export const OtherTokensInfoPanel = ({ otherSum }: Props) => {
  const { value, currency } = useXtzPriceForCurrency();
  return (
    <div className="flex flex-wrap rounded-lg shadow bg-main-200 ">
      <dl className="flex flex-col px-4 py-5 overflow-hidden rounded-lg ">
        <dt className="text-sm font-medium text-gray-600">Other</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900 truncate">
          {otherSum}
          {TZ}
          <div className="text-xs text-gray-700">
            {formatTezosBalanceInCurrency(otherSum, value, currency, true)}
          </div>
        </dd>
      </dl>
    </div>
  );
};
