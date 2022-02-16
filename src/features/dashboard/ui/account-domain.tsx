import { useAtom } from 'jotai';

import { useAccountDomain } from 'api/account';
import { addressSearchAtom } from 'features/site-layout';

export const AccountDomain = () => {
  const [address] = useAtom(addressSearchAtom);
  const { data } = useAccountDomain(address);

  if (!data) {
    return <h1>{address}</h1>;
  }

  if (data.length > 1) {
    return (
      <h1>
        Domains:{' '}
        <a
          href={`https://app.tezos.domains/address/${address}`}
          target={'_blank'}
          rel="noreferrer"
          className="text-blue-500"
        >
          {data.map((i) => i.name).join(', ')}
        </a>
      </h1>
    );
  }
  if (data.length === 1) {
    return (
      <h1>
        Domain:{' '}
        <a
          href={`https://app.tezos.domains/address/${address}`}
          target={'_blank'}
          rel="noreferrer"
          className="text-blue-500"
        >
          {data[0]?.name}
        </a>
      </h1>
    );
  }
  return <h1>{address}</h1>;
};

export default AccountDomain;
