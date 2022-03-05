import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import { useCrunchyInvestments } from 'api/investments/crunchy';
import { usePlentyInvestmentsInXTZ } from 'api/investments/plenty';
import { addressSearchAtom } from 'features/site-layout';
import { TZ } from 'shared/utils/tezos-sign';

import { CrunchyTable } from './crunchy';
import { PlentyTable } from './plenty';

const InvestmentsAccordion = () => {
  const [address] = useAtom(addressSearchAtom);

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

    // <div className="" id="accordionExample5">
    //   <div className="bg-white accordion-item bg-opacity-40">
    //     <h2 className="mb-0 accordion-header" id="headingOne5">
    //       <button
    //         className="relative flex items-center w-full px-5 py-4 text-base text-left text-gray-800 transition border-0 rounded-none accordion-button focus:outline-none"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#collapseOne5"
    //         aria-expanded="true"
    //         aria-controls="collapseOne5"
    //       >
    //         <div className="flex gap-4">
    //           Plenty:{' '}
    //           {withXTZ ? (
    //             <div className="text-main">{totalPlenty.toFixed(3) + TZ}</div>
    //           ) : (
    //             <div className="flex items-center">
    //               <ImSpinner2 className="animate-spin" />
    //             </div>
    //           )}
    //         </div>
    //       </button>
    //     </h2>
    //     <div
    //       id="collapseOne5"
    //       className="accordion-collapse collapse show"
    //       aria-labelledby="headingOne5"
    //     >
    //       <div className="accordion-body">{/* <PlentyTable /> */}</div>
    //     </div>
    //   </div>
    //   <div className="bg-white accordion-item bg-opacity-40">
    //     <h2 className="mb-0 accordion-header" id="headingTwo5">
    //       <button
    //         className="relative flex items-center w-full px-5 py-4 text-base text-left text-gray-800 transition bg-white border-0 rounded-none bg-opacity-40 accordion-button collapsed focus:outline-none"
    //         type="button"
    //         data-bs-toggle="collapse"
    //         data-bs-target="#collapseTwo5"
    //         aria-expanded="true"
    //         aria-controls="collapseTwo5"
    //       >
    //         <div className="flex gap-4">
    //           Crunchy:{' '}
    //           {farms ? (
    //             <div className="text-main">{totalCrunchy.toFixed(3) + TZ}</div>
    //           ) : (
    //             <div className="flex items-center">
    //               <ImSpinner2 className="animate-spin" />
    //             </div>
    //           )}
    //         </div>
    //       </button>
    //     </h2>
    //     <div
    //       id="collapseTwo5"
    //       className="accordion-collapse collapse"
    //       aria-labelledby="headingTwo5"
    //     >
    //       <div className="accordion-body">
    //         <CrunchyTable />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default InvestmentsAccordion;
