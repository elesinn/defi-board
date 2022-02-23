import { Popover } from '@headlessui/react';
import Image from 'next/image';

import { useXtzPriceForCurrency } from 'api/coingecko';
import { formatTezosBalanceInCurrency } from 'shared/utils/balance';

const Currencies = [
  'BTC',
  'ETH',
  'TRY',
  'INR',
  'SGD',
  'HKD',
  'KRW',
  'JPY',
  'CNY',
  'NOK',
  'SEK',
  'CHF',
  'GBP',
  'EUR',
  'AUD',
  'BRL',
  'MXN',
  'CAD',
  'RUB',
  'USD',
];

interface IProps {
  balance?: number;
}

export const CurrencySelector = ({ balance }: IProps) => {
  const { value, currency, setCurrency } = useXtzPriceForCurrency();

  return (
    <Popover className="z-1">
      <Popover.Button>
        {formatTezosBalanceInCurrency(balance, value, currency)}
      </Popover.Button>

      <Popover.Panel
        className="absolute z-10 p-2 m-0 leading-6 align-baseline border-0 rounded-lg bg-main-200 box-shadow"
        style={{ boxShadow: '0 2px 8px rgba(0,34,55,0.1)' }}
      >
        <div className="grid grid-cols-2 p-0 m-0 align-baseline border-0 sm:grid-cols-4">
          {Currencies.map((currency) => (
            <div
              className="flex items-center px-2 py-3 m-0 text-sm font-medium leading-5 text-gray-900 align-baseline border-0 rounded-lg cursor-pointer hover:bg-gray-200 hover:opacity-100"
              role="button"
              key={currency}
              onClick={() => {
                setCurrency(currency.toLowerCase());
              }}
            >
              <Image
                width={24}
                height={24}
                className="w-5 h-5 p-0 my-0 ml-0 mr-2 align-middle border-0 ring-2 ring-blue-500"
                src={`/assets/images/currencies/${currency}.svg`}
                alt={`${currency} Icon`}
              />
              {currency}
            </div>
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};
