import { PropsWithChildren, ReactElement } from 'react';

import { Header } from './header';

export function SiteLayout({
  children,
  title,
}: PropsWithChildren<{ title: string }>): ReactElement {
  return (
    <div className="min-h-full">
      <Header />
      <header className="bg-white shadow-sm">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            {title}
          </h1>
        </div>
      </header>
      <main>
        <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-4 sm:px-0">
            {children}
            {/* <div className="border-4 border-gray-200 border-dashed rounded-lg h-96" /> */}
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
