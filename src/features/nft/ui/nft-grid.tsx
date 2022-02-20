import { useAtom } from 'jotai';

import { useTokensBalances } from 'api/tokens';
import { addressSearchAtom } from 'features/site-layout';

export const NFTGrid = () => {
  const [userAddress] = useAtom(addressSearchAtom);
  const { data: tokensBalances } = useTokensBalances({ userAddress });
  const nfts = tokensBalances?.filter((b) => b.artifact_uri);
  console.log(nfts);

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {nfts?.map((file) => (
        <li key={file.id} className="relative">
          <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
            <img
              placeholder=""
              src={
                file?.artifact_uri?.replace(
                  'ipfs://',
                  'https://ipfs.fleek.co/ipfs/',
                ) || ''
              }
              alt=""
              className="object-cover pointer-events-none group-hover:opacity-75"
            />
          </div>
          <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {file.name}
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            {file.contract?.alias}
          </p>
        </li>
      ))}
    </ul>
  );
  // return (
  //   <div>
  //     {nfts?.map((item) => (
  //       <img
  //         // alt={item.description || 'NFT'}
  //         src={
  // item?.artifact_uri?.replace(
  //   'ipfs://',
  //   'https://ipfs.fleek.co/ipfs/',
  // ) || ''
  //         }
  //         key={item.id}
  //       />
  //     ))}
  //   </div>
  // );
};
