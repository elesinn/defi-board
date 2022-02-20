import { useState } from 'react';

import { useAtom } from 'jotai';
import { ImSpinner2 } from 'react-icons/im';
import { useTimeout } from 'usehooks-ts';

import { TZ } from 'shared/utils/tezos-sign';

import { InvestmentsList } from '..';
import { investmentBalancesAtom } from '../model';

const InvestmentsAccordion = () => {
  const [isLoading, setLoading] = useState(true);
  const [balances] = useAtom(investmentBalancesAtom);
  const total = Object.values(balances.Plenty).reduce<number>(
    (acc, item) => acc + item,
    0,
  );

  const loaded = () => setLoading(false);
  // TODO: create main isLoaded flag
  useTimeout(loaded, 10 * 1000);

  return (
    <div className="accordion" id="accordionExample5">
      <div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header mb-0" id="headingOne5">
          <button
            className="
              accordion-button
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
            "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne5"
            aria-expanded="true"
            aria-controls="collapseOne5"
          >
            <div className="flex gap-4">
              Plenty{' '}
              <div>
                {Math.round(total * 100) / 100} {TZ}
              </div>
              {isLoading && (
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
          <div className="accordion-body py-4 px-5">
            <InvestmentsList />
          </div>
        </div>
      </div>
      <div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header mb-0" id="headingTwo5">
          <button
            className="
              accordion-button
              collapsed
              relative
              flex
              items-center
              w-full
              py-4
              px-5
              text-base text-gray-800 text-left
              bg-white
              border-0
              rounded-none
              transition
              focus:outline-none
            "
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
          <div className="accordion-body py-4 px-5">data</div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsAccordion;
