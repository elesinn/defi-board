export interface IOperation {
  type: Type;
  id: number;
  level: number;
  timestamp: Date;
  block: string;
  hash: string;
  counter: number;
  initiator?: Initiator;
  sender: ContractDelegate;
  nonce?: number;
  gasLimit: number;
  gasUsed: number;
  storageLimit?: number;
  storageUsed?: number;
  bakerFee: number;
  storageFee?: number;
  allocationFee?: number;
  target?: ContractDelegate;
  amount?: number;
  parameter?: Parameter;
  status: Status;
  hasInternals?: boolean;
  contractBalance?: number;
  originatedContract?: OriginatedContract;
  contractDelegate?: ContractDelegate;
  errors?: Error[];
  prevDelegate?: ContractDelegate;
  newDelegate?: ContractDelegate;
}

export interface ContractDelegate {
  alias?: string;
  address: string;
}

export interface Error {
  type: string;
}

export interface Initiator {
  address: any;
}

export interface OriginatedContract {
  kind: string;
  address: string;
  typeHash: number;
  codeHash: number;
}

export interface Parameter {
  entrypoint: string;
  value: ValueElement[] | boolean | PurpleValue | string;
}

export interface ValueElement {
  txs?: Tx[];
  from_?: string;
  balance?: string;
  request?: RequestElement;
  add_operator?: Operator;
  remove_operator?: Operator;
}

export interface Operator {
  owner: any;
  operator: string;
  token_id: string;
}

export interface RequestElement {
  owner: any;
  token_id: string;
}

export interface Tx {
  to_: string;
  amount: string;
  token_id: string;
}

export interface PurpleValue {
  callback?: string;
  requests?: RequestElement[];
  owner?: any;
  token_id?: string;
  token_amount?: string;
  token?: Token;
  amount?: string;
  shares?: Share[] | string;
  target?: any | null;
  currency?: Currency;
  editions?: string;
  expiry_time?: null;
  eventId?: string;
  maxSlippage?: string;
  expectedRatioBelow?: string;
  expectedRatioAboveEq?: string;
  price?: string;
  creator?: string;
  objkt_id?: string;
  royalties?: string;
  proxy?: null;
  ask_id?: string;
  address?: any;
  metadata?: Metadata;
  issuer_id?: string;
  iteration?: string;
  buyer?: any;
  receivers?: Receiver[];
  seller?: string;
  swap_id?: string;
  min_out?: string;
  receiver?: any;
  fa2?: string;
  artist?: string;
  contract?: string;
  request?: TezClass;
  value?: string;
  spender?: any;
  to?: string;
  from?: string;
  nat_0?: string;
  nat_1?: string;
  nat?: string;
  _to?: any;
  flash?: null;
  amount0Out?: string;
  amount1Out?: string;
  tokenIn?: TokenInClass;
  amountIn?: string;
  deadline?: Date;
  tokenOut?: TokenInClass;
  amountOutMin?: string;
  reserve0?: string;
  reserve1?: string;
  price_ts_last?: Date;
  total_liquidity?: string;
  fa2_address?: string;
  quantity?: string;
  minLqtMinted?: string;
  maxTokensDeposited?: string;
  minTokensBought?: string;
  min_tez?: string;
  min_tokens?: string;
  tokensSold?: string;
  minCashBought?: string;
  baker?: string;
  allows_settlement?: boolean;
  contract_address_callback?: string;
  bool?: boolean;
  int_0?: string;
  int_1?: string;
  mutez?: string;
  nat_2?: string;
  address_0?: any;
  address_1?: any;
  string?: string;
  timestamp?: Date;
  end?: null;
  data?: string;
  salt?: string;
  maker?: string;
  start?: null;
  taker?: null;
  data_type?: string;
  make_asset?: MakeAsset;
  take_asset?: TakeAsset;
  recipient?: any;
}

export interface Currency {
  tez: TezClass;
}

export interface TezClass {}

export interface MakeAsset {
  asset_type: MakeAssetAssetType;
  asset_value: string;
}

export interface MakeAssetAssetType {
  asset_data: string;
  asset_class: PurpleAssetClass;
}

export interface PurpleAssetClass {
  FA_2: string;
}

export interface Receiver {
  amount: string;
  address: string;
}

export interface Share {
  amount: string;
  recipient: string;
}

export interface TakeAsset {
  asset_type: TakeAssetAssetType;
  asset_value: string;
}

export interface TakeAssetAssetType {
  asset_data: string;
  asset_class: FluffyAssetClass;
}

export interface FluffyAssetClass {
  XTZ: TezClass;
}

export interface Token {
  address?: string;
  token_id: string;
  fa2_address?: string;
}

export interface TokenInClass {
  token_id: string;
  fa2_address: string;
}

export enum Status {
  Applied = 'applied',
  Backtracked = 'backtracked',
  Failed = 'failed',
  Skipped = 'skipped',
}

export enum Type {
  Delegation = 'delegation',
  Origination = 'origination',
  Transaction = 'transaction',
}
