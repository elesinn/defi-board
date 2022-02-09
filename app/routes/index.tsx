import type { MetaFunction, LoaderFunction } from 'remix';
import { useLoaderData, json, Link } from 'remix';

import StarterKit from '~/components/StarterKit';
import Stats from '~/components/Stats';
import Table from '~/components/Table';
import SiteLayout from '../components/SiteLayout';

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  topPages: Array<{ name: string; to: string; isPrimary?: boolean }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: 'Remix Docs',
        url: 'https://remix.run/docs',
      },
      {
        name: 'React Router Docs',
        url: 'https://reactrouter.com/docs',
      },
      {
        name: 'Remix Discord',
        url: 'https://discord.gg/VBePs6d',
      },
    ],
    topPages: [
      //   {
      //     to: "/gallery",
      //     name: "Browse Components (Coming soon)"
      //   },
      {
        to: '/auth',
        name: 'See Supabase in action',
        isPrimary: true,
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: 'Remix Starter Kit',
    description: 'Welcome to Remix Starter Kit',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <SiteLayout title="Dashboard">
      <Stats />
      <div className="h-5" />
      <Table />
    </SiteLayout>
  );
}
