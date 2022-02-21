import { Fragment, ReactElement } from 'react';
import { useEffect } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';

import { useAccount, useAccountDomain } from 'api/account/account';
import { useTezos } from 'features/beacon/useTezos';
import { formatTezosBalance } from 'shared/utils/balance';

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
    <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200">
      <button
        type="button"
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => openSidebar(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="flex justify-between flex-1 px-4 md:px-0">
        <div className="flex flex-1">
          <form className="flex w-full md:ml-0" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 border-transparent focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
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
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <div
                  className="px-3 py-2 text-sm font-medium text-black truncate bg-gray-100 rounded-md"
                  title={account}
                >
                  <div className="flex gap-2 ">
                    <div>{formatTezosBalance(accountData?.balance)}</div>
                    <div className="border-r" />
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
              <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          active ? 'bg-gray-100' : '',
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
                          active ? 'bg-gray-100' : '',
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
