import { InvestmentsList } from 'features/investments';
import { SiteLayout } from 'features/site-layout';
import { TokensList } from 'features/tokens/ui';

const Index = ({ courses }: any) => {
  console.log({ courses });

  return (
    <SiteLayout title="Investments">
      <h2 className="text-xl font-semibold text-gray-900">
        <span className="text-purple-800">Plenty</span> investments
      </h2>
      <span className="text-gray-500 text-m">
        (only active Farms is displayed)
      </span>
      <InvestmentsList />
      <TokensList />
    </SiteLayout>
  );
};

export default Index;
