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
  block: unknown;
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

export interface ITokenAggregateDaily {
  periodOpen: Date;
  periodClose: Date;
  t1poolOpen: number | null;
  t1poolClose: number;
  t1poolChange: number | null;
  t1priceOpen: number;
  t1priceClose: number;
  t1priceHigh: number;
  t1priceLow: number;
  t1priceChange: number;
  t1priceMa: number;
  t1volume: number;
  t1volumeMa: number;
  t2poolOpen: number | null;
  t2poolClose: number;
  t2poolChange: number | null;
  t2priceOpen: number;
  t2priceClose: number;
  t2priceHigh: number;
  t2priceLow: number;
  t2priceChange: number;
  t2priceMa: number;
  t2volume: number;
  t2volumeMa: number;
  lptsupplyOpen: number;
  lptsupplyClose: number;
  lptsupplyChange: number;
}
