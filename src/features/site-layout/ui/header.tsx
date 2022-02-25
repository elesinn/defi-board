import { Fragment, ReactElement } from 'react';
import { useEffect } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import { useAccount, useAccountDomain } from 'api/account/account';
import { useTezos } from 'features/beacon/useTezos';
import { CurrencySelector } from 'features/currency/ui/currency-selector';
import { formatTezosBalanceWithSign } from 'shared/utils/balance';

function truncateMiddle(word: string) {
  const tooLongChars = 20; // arbitrary

  if (word.length < tooLongChars) {
    return word;
  }

  const ellipsis = '...';
  const charsOnEitherSide = Math.floor(tooLongChars / 2) - ellipsis.length;

  return (
    word.slice(0, charsOnEitherSide) + ellipsis + word.slice(-charsOnEitherSide)
  );
}

export const userAddressAtom = atom('tz1Qji1NnEPj4Cxa9s2WEoWi9U9KM6a9gdDL');

export function Header({
  openSidebar,
}: {
  openSidebar: (value: boolean) => void;
}): ReactElement {
  const [address, setAddress] = useAtom(userAddressAtom);
  const { data } = useAccountDomain(address);
  const { data: accountData } = useAccount(address);

  const { connect, account, disconnect } = useTezos();

  useEffect(() => {
    account && setAddress(account);
  }, [account, setAddress]);

  return (
    <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 md:px-8 xl:px-8">
      <button
        type="button"
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => openSidebar(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="flex justify-between flex-1 px-4 md:px-0">
        <div className="flex items-center flex-1">
          <form className="w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-600 focus-within:text-main-500">
              <div className="absolute inset-y-0 flex items-center pointer-events-none left-3">
                <SearchIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full py-2 pr-3 text-gray-900 placeholder-gray-500 border-transparent rounded-lg pl-9 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm bg-main-200"
                placeholder="Tezos Address"
                type="search"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="search"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center ml-4 md:ml-6">
          {/* Profile dropdown */}
          <div
            className="px-3 py-2 text-sm font-medium text-black truncate rounded-md bg-main-200"
            title={account}
          >
            <div className="flex gap-2 ">
              <div>
                {accountData?.balance ? (
                  <CurrencySelector balance={accountData.balance} />
                ) : (
                  <ImSpinner2 className="animate-spin" />
                )}
              </div>
              <div className="border-r" />
              <div>{formatTezosBalanceWithSign(accountData?.balance)}</div>
            </div>
          </div>
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <div
                  className="px-3 py-2 text-sm font-medium text-black truncate rounded-md bg-main-200"
                  title={account}
                >
                  <div className="flex gap-2 ">
                    {data?.at(0)?.name || truncateMiddle(account) || 'Sync'}
                  </div>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right rounded-md shadow-lg bg-main-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {/* {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700',
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))} */}
                {account ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-main-200' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                        onClick={disconnect}
                      >
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-main-200' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        )}
                        onClick={connect}
                      >
                        Connect Wallet
                      </button>
                    )}
                  </Menu.Item>
                )}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
