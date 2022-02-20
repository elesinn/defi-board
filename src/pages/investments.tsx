import { InvestmentsList } from 'features/investments';
import InvestmentsAccordion from 'features/investments/ui/accordion';
import { SiteLayout } from 'features/site-layout';

const Index = () => (
  <SiteLayout title="Investments">
    <h2 className="text-xl font-semibold text-gray-900">
      <span className="text-purple-800">Plenty</span> investments
    </h2>
    <span className="text-gray-500 text-m">
      (only active Farms is displayed)
    </span>
    <InvestmentsAccordion />
    <InvestmentsList />
  </SiteLayout>
);

export default Index;
