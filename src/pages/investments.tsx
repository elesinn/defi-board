import { InvestmentsList } from 'features/investments';
import { SiteLayout } from 'features/site-layout';

const Index = () => (
  <SiteLayout title="Investments">
    <InvestmentsList />
  </SiteLayout>
);

export default Index;
