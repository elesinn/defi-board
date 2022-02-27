import { PropsWithChildren, ReactElement } from 'react';
import { Fragment, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { HomeIcon, XIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlinePicture } from 'react-icons/ai';
import { GiTwoCoins, GiMoneyStack } from 'react-icons/gi';

import { TezosInfoColumn } from 'features/tezos-info';

import { Header } from './header';

const navigation = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Investments',
    href: '/investments',
    icon: GiMoneyStack,
  },
  {
    name: 'Tokens',
    href: '/tokens',
    icon: GiTwoCoins,
  },
  {
    name: 'NFT',
    href: '/nft',
    icon: AiOutlinePicture,
  },
];

export function SiteLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>): ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-main-200">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 pt-2 -mr-12">
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="w-6 h-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex items-center flex-shrink-0 px-4">
                  <Image
                    className="w-auto h-8"
                    src="/assets/images/logo.svg"
                    alt="Tez.watch"
                    width={200}
                    height={60}
                  />
                </div>
                <div className="flex-1 h-0 mt-5 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            pathname === item.href
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group rounded-md py-2 px-2 flex items-center text-base font-medium',
                          )}
                        >
                          <item.icon
                            className={classNames(
                              pathname === item.href
                                ? 'text-gray-500'
                                : 'text-gray-400 group-hover:text-gray-500',
                              'mr-4 flex-shrink-0 h-6 w-6',
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="z-10 hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow pt-1 overflow-y-auto bg-main-500 rounded-r-2xl">
            <div className="flex items-center flex-shrink-0 px-4 ">
              <Image
                className="w-auto h-8"
                src="/assets/images/logo.svg"
                alt="Tez.watch"
                width={200}
                height={60}
              />
            </div>
            <div className="flex flex-col flex-grow mt-5">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        pathname === item.href
                          ? 'bg-main-200 text-gray-900'
                          : 'text-gray-100 hover:bg-gray-50 hover:text-gray-900',
                        'group rounded-md py-2 px-2 flex items-center text-sm font-medium',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          pathname === item.href
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="relative z-0 flex flex-1 h-screen min-h-screen overflow-hidden md:pl-64">
          <div className="flex flex-col flex-1 w-screen max-w-full md:auto lg:auto">
            <Header openSidebar={setSidebarOpen} />
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none">
              {/* Start main area*/}
              <div className="py-6">
                <div className="px-4 sm:px-6 md:px-0">
                  <h1 className="text-2xl font-semibold text-gray-900 md:px-8 xl:px-8">
                    {title}
                  </h1>
                </div>
                <div className="px-4 sm:px-6 md:px-8 xl:px-8">{children}</div>
              </div>
              {/* End main area */}
            </main>
          </div>
          <aside className="relative flex-shrink-0 hidden overflow-y-auto border-l xl:flex xl:flex-col w-96 border-main-500">
            {/* Start secondary column (hidden on smaller screens) */}
            <div className="absolute inset-0 px-4 py-6 sm:px-6 lg:px-8">
              <TezosInfoColumn />
              {/* <div className="h-full border-2 border-gray-200 border-dashed rounded-lg" /> */}
            </div>
            {/* End secondary column */}
          </aside>
        </div>
      </div>
    </>
  );
}
