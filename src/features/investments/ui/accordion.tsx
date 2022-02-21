import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';

import { usePlentyInvestmentsInXTZ } from 'api/investments';
import { addressSearchAtom } from 'features/site-layout';
import { TZ } from 'shared/utils/tezos-sign';

import { InvestmentTable } from './investments-table';

const InvestmentsAccordion = () => {
  const [address] = useAtom(addressSearchAtom);

  const { data: withXTZ } = usePlentyInvestmentsInXTZ(address);
  const totalInvestments =
    withXTZ?.reduce<number>((acc, item) => acc + (item?.XTZBalance || 0), 0) ||
    0;

  return (
    <div className="accordion" id="accordionExample5">
      <div className="bg-white border border-gray-200 accordion-item">
        <h2 className="mb-0 accordion-header" id="headingOne5">
          <button
            className="relative flex items-center w-full px-5 py-4 text-base text-left text-gray-800 transition bg-white border-0 rounded-none accordion-button focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne5"
            aria-expanded="true"
            aria-controls="collapseOne5"
          >
            <div className="flex gap-4">
              Plenty:{' '}
              {withXTZ ? (
                <div className="text-main">
                  {totalInvestments.toFixed(3) + TZ}
                </div>
              ) : (
                <div className="flex items-center">
                  <ImSpinner2 className="animate-spin" />
                </div>
              )}
            </div>
          </button>
        </h2>
        <div
          id="collapseOne5"
          className="accordion-collapse collapse show"
          aria-labelledby="headingOne5"
        >
          <div className="accordion-body">
            <InvestmentTable />
          </div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 accordion-item">
        <h2 className="mb-0 accordion-header" id="headingTwo5">
          <button
            className="relative flex items-center w-full px-5 py-4 text-base text-left text-gray-800 transition bg-white border-0 rounded-none accordion-button collapsed focus:outline-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo5"
            aria-expanded="false"
            aria-controls="collapseTwo5"
          >
            QuipuSwap
          </button>
        </h2>
        <div
          id="collapseTwo5"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo5"
        >
          <div className="accordion-body">data</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsAccordion;
