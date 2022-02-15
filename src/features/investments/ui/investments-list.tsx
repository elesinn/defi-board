import { investmentData, InvestmentKey } from 'api/investments/investmentsData';

import { InvestmentItem } from './item';

export const InvestmentsList = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
    >
      {Object.keys(investmentData).map((key) => (
        <InvestmentItem investmentKey={key as InvestmentKey} key={key} />
      ))}
    </ul>
  );
};
