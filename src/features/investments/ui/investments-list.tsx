import { InvestmentKey, PlentyFarms } from 'api/investments/plenty/config';

import { InvestmentItem } from './item';

export const InvestmentsList = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
    >
      {Object.keys(PlentyFarms)
        .map((key) => (
          <InvestmentItem investmentKey={key as InvestmentKey} key={key} />
        ))
        .filter(Boolean)}
    </ul>
  );
};
