import useSWR from 'swr';

import { ITokenBalance } from './types';

export const useTokensBalances = ({ userAddress }: { userAddress: string }) => {
  //TODO: work with limit and offset
  return useSWR<ITokenBalance[]>(
    `tokens/balances?account=${userAddress}&sort.desc=balance&offset=0&limit=100&select=balance,token.id%20as%20id,token.contract%20as%20contract,token.tokenId%20as%20token_id,token.metadata.artifactUri%20as%20artifact_uri,token.metadata.creators%20as%20creators,token.metadata.decimals%20as%20decimals,token.metadata.description%20as%20description,token.metadata.displayUri%20as%20display_uri,token.metadata.formats%20as%20formats,token.metadata.isBooleanAmount%20as%20is_boolean_amount,token.metadata.name%20as%20name,token.metadata.shouldPreferSymbol%20as%20should_prefer_symbol,token.metadata.symbol%20as%20symbol,token.metadata.thumbnailUri%20as%20thumbnail_uri`,
  );
};
