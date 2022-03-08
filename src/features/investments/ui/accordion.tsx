import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import { tezosAccountAtom } from 'features/auth';
import { TZ } from 'shared/utils/tezos-sign';

import { CrunchyTable } from './crunchy';
import { PlentyTable } from './plenty';

const InvestmentsAccordion = () => {
  const [address] = useAtom(tezosAccountAtom);

  const { data: withXTZ } = usePlentyInvestmentsInXTZ(address);
  const { farms } = useCrunchyInvestments(address);

  const totalCrunchy = farms?.reduce((acc, farm) => {
    acc +=
      Number(farm.stakedAmount) / Math.pow(10, Number(farm.poolToken.decimals));
    return acc;
  }, 0);

  const totalPlenty =
    withXTZ?.reduce<number>((acc, item) => acc + (item?.XTZBalance || 0), 0) ||
    0;

  return (
    <div className="flex flex-col gap-2">
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="bg-white rounded-lg bg-opacity-40">
            <Disclosure.Button className="relative flex items-center justify-between w-full px-5 py-4 text-base leading-6 text-left text-gray-900 transition cursor-pointer focus:outline-none">
              <div className="inline-flex text-lg text-gray-900 truncate cursor-pointer">
                <span className="mr-2 font-sans text-sm font-medium leading-6 text-gray-900 cursor-pointer ">
                  <img
                    alt="plenty"
                    width={24}
                    height={24}
                    src="https://raw.githubusercontent.com/Plenty-DeFi/Plenty-Logo/main/PlentyTokenIcon.png"
                  />
                </span>

                <div className="font-bold">Plenty</div>
              </div>
              <div className="flex items-center gap-2 leading-6 text-right text-gray-900 cursor-pointer">
                {withXTZ ? (
                  <div className="font-semibold text-main">
                    {totalPlenty.toFixed(3) + TZ}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ImSpinner2 className="animate-spin" />
                  </div>
                )}
                <ChevronUpIcon
                  className={`${
                    !open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-gray-600`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel>
              <div className="overflow-hidden">
                <div className="sm:p-6">
                  <PlentyTable />
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
      <Disclosure defaultOpen>
        {({ open }) => (
          <div className="bg-white rounded-lg bg-opacity-40">
            <Disclosure.Button className="relative flex items-center justify-between w-full px-5 py-4 text-base leading-6 text-left text-gray-900 transition cursor-pointer focus:outline-none">
              <div className="inline-flex text-lg text-gray-900 truncate cursor-pointer">
                <span className="mr-2 font-sans text-sm font-medium leading-6 text-gray-900 cursor-pointer ">
                  <img
                    alt="crunchy"
                    width={24}
                    height={24}
                    src="https://ipfs.io/ipfs/bafybeienhhbxz53n3gtg7stjou2zs3lmhupahwovv2kxwh5uass3bc5xzq"
                  />
                </span>

                <div className="font-bold">Crunchy</div>
              </div>
              <div className="flex gap-2 leading-6 text-right text-gray-900 cursor-pointer">
                {farms ? (
                  <div className="font-semibold text-main">
                    {totalCrunchy.toFixed(3) + TZ}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <ImSpinner2 className="animate-spin" />
                  </div>
                )}
                <ChevronUpIcon
                  className={`${
                    !open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-gray-600`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel>
              <div className="overflow-hidden">
                <div className="sm:p-6">
                  <CrunchyTable />
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default InvestmentsAccordion;
