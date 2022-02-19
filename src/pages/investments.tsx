import { InvestmentsList } from 'features/investments';
import { SiteLayout } from 'features/site-layout';

const Index = () => (
  <SiteLayout title="Investments">
    <h2 className="text-xl font-semibold text-gray-900">Plenty investments</h2>
    <span className="text-gray-500 text-m">
      (only active Farms is displayed)
    </span>
    <InvestmentsList />
  </SiteLayout>
);

export default Index;
