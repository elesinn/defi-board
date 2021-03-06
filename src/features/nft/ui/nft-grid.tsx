import React from 'react';

import { useAtom } from 'jotai';
import Image from 'next/image';
import { useVirtual } from 'react-virtual';

import { useTokensBalances } from 'api/tokens';
import { tezosAccountAtom } from 'features/auth';
export const NFTGrid = () => {
  const [userAddress] = useAtom(tezosAccountAtom);
  const { data: tokensBalances } = useTokensBalances({ userAddress });
  const nfts = tokensBalances?.filter((b) => b.artifact_uri);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const gridSize = nfts?.length ? Math.ceil(nfts?.length / 3) : 10;
  const rowVirtualizer = useVirtual({
    size: gridSize,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
  });
  return (
    <div ref={parentRef} className="">
      <div
        style={{
          height: `${rowVirtualizer.totalSize}px`,
          position: 'relative',
        }}
      >
        {rowVirtualizer.virtualItems.map((item) => (
          <ul
            key={item.key}
            role="list"
            className="grid grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 xl:gap-x-8"
          >
            {nfts?.slice(item.index * 3, item.index * 3 + 3).map((file) => (
              <li key={file.id} className="relative flex flex-col">
                <div className=" min-h-[300px] relative flex items-center object-fill object-center w-full h-full overflow-hidden bg-white bg-opacity-40 rounded-lg group aspect-w-10 aspect-h-7 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
                  {file?.formats &&
                  file.formats[0]?.mimeType?.includes('video') ? (
                    <video
                      src={file.formats[0].uri.replace(
                        'ipfs://',
                        'https://ipfs.io/ipfs/',
                      )}
                      controls
                    />
                  ) : (
                    <Image
                      loading="lazy"
                      src={
                        file?.display_uri?.replace(
                          'ipfs://',
                          'https://ipfs.io/ipfs/',
                        ) ||
                        file?.artifact_uri?.replace(
                          'ipfs://',
                          'https://ipfs.io/ipfs/',
                        ) ||
                        ''
                      }
                      layout="fill"
                      objectFit="contain"
                      alt=""
                      className="object-cover pointer-events-none group-hover:opacity-75 "
                    />
                  )}
                </div>
                <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
                  {file.name}
                </p>
                <p className="block text-sm font-medium text-gray-500 pointer-events-none">
                  {file.contract?.alias}
                </p>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
