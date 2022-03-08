import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useTezos } from '..';

export const useAuthRedirect = () => {
  const { account, loading } = useTezos();
  const { pathname, push } = useRouter();

  useEffect(() => {
    if (!loading && !account && pathname !== '/') {
      push('/');
    }
    if (!loading && account && pathname === '/') {
      push('/dashboard');
    }
  }, [pathname, account, loading, push]);
};
