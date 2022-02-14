import { Block } from '@tezos-dappetizer/indexer';

export interface IPrices {
  contracts: Contract[];
  block: unknown;
  timestamp: Date;
  found: string;
  xtzusdValue: number;
}

export interface Contract {
  symbol?: string;
  tokenAddress: string;
  decimals?: number;
  name?: string;
  shouldPreferSymbol?: boolean | string;
  factoryIndex: number;
  address: string;
  ratio: number;
  tezPool: number;
  tokenPool: number;
  currentPrice: number;
  lastPrice: number;
  buyPrice: number;
  sellPrice: number;
  precision: number;
  type: Type;
  bakerValidator: string;
  currentCandidate?: string;
  currentDelegated?: string;
  lastUpdateTime: Date;
  lastVeto: Date;
  periodFinish: Date;
  reward: number;
  rewardPaid: number;
  rewardPerSec: number;
  totalReward: number;
  totalSupply?: number;
  qptTokenSupply: number;
  totalVotes: number;
  usdValue: number;
  pairs: Pair[];
  tags?: string;
  websiteLink?: string;
  telegramLink?: string;
  twitterLink?: string;
  discordLink?: string;
  thumbnailUri?: string;
  timestamp: Date;
  block: Block;
  tokenId?: number;
  description?: string;
}

export interface Pair {
  address: string;
  dex: Dex | string;
  symbols: string;
  tvl: number;
  lptSupply: number;
  sides: Side[];
}

export enum Dex {
  LiquidityBaking = 'Liquidity Baking',
  Plenty = 'Plenty',
  Quipuswap = 'Quipuswap',
}

export interface Side {
  symbol?: string;
  pool: number;
  price: number;
  usdvalue?: number;
  dayClose?: number;
  weekClose?: number;
  monthClose?: number;
  tokenType?: Type;
  tokenAddress?: string;
  tokenId?: number;
}

export enum Type {
  Fa12 = 'fa1.2',
  Fa2 = 'fa2',
  Xtz = 'XTZ',
}
