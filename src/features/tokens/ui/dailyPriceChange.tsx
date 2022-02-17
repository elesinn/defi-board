import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/outline';
import classNames from 'classnames';

import { useTokenAggregateDaily } from 'api/tezPrices';
import { Contract } from 'api/tezPrices/types';

export const DailyPriceChange = ({ token }: { token?: Contract }) => {
  const { tokensDailyStats } = useTokenAggregateDaily(token);
  if (!tokensDailyStats?.difference || !(tokensDailyStats?.difference > 0))
    return null;

  return (
    <div
      className={classNames(
        tokensDailyStats.priceIncreace ? 'text-green-600' : 'text-red-600',
        'ml-2 flex items-baseline text-sm font-semibold',
      )}
    >
      {tokensDailyStats.priceIncreace ? (
        <ArrowSmUpIcon
          className="self-center flex-shrink-0 w-5 h-5 text-green-500"
          aria-hidden="true"
        />
      ) : (
        <ArrowSmDownIcon
          className="self-center flex-shrink-0 w-5 h-5 text-red-500"
          aria-hidden="true"
        />
      )}
      <span className="sr-only">
        {tokensDailyStats.priceIncreace ? 'Increased' : 'Decreased'} by
      </span>
      {tokensDailyStats.difference > 0
        ? tokensDailyStats.difference?.toFixed(2)
        : 0}
      %
    </div>
  );
};
