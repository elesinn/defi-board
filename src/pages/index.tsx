import { Dashboard } from 'features/dashboard'
import { SiteLayout } from 'features/site-layout'

const Index = () => (
  <SiteLayout title="Dashboard">
    <Dashboard />
    <div className="h-5" />
  </SiteLayout>
)

export default Index
