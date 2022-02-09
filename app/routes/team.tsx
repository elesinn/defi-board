import { useLoaderData } from 'remix';
import Contacts from '~/components/Contacts';
import SiteLayout from '~/components/SiteLayout';
import Stats from '~/components/Stats';
import Table from '~/components/Table';

export default function Index() {
  // let data = useLoaderData<IndexData>();

  return (
    <SiteLayout title="Team">
      <Contacts />
    </SiteLayout>
  );
}
