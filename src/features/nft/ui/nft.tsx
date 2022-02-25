import { NftInfoPanel } from './info-panel';
import { NFTGrid } from './nft-grid';

export const NFTS = () => {
  return (
    <div className="flex flex-col gap-2">
      <NftInfoPanel />
      <NFTGrid />
    </div>
  );
};
