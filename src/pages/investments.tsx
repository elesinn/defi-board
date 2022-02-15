import { InvestmentsList } from 'features/investments';
import { SiteLayout } from 'features/site-layout';
import { TokensList } from 'features/tokens/ui';

const Index = () => (
  <SiteLayout title="Investments">
    <InvestmentsList />
    <TokensList />
  </SiteLayout>
);

export default Index;
