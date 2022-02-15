export interface ITokenBalance {
  balance: string;
  id: number;
  contract: Contract;
  token_id: string;
  artifact_uri: null | string;
  creators: string[] | null;
  decimals: null | string;
  description: null | string;
  display_uri: null | string;
  formats: Format[] | null;
  is_boolean_amount: boolean | null;
  name: null | string;
  should_prefer_symbol: boolean | null;
  symbol: null | string;
  thumbnail_uri: null | string;
}

export interface Contract {
  alias: string;
  address: string;
}

export interface Format {
  uri: string;
  mimeType: string;
}
