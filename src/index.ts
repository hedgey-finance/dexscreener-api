import axios from "axios";
import PairsResponse from "./types/PairsResponse";
import PairNotFoundError from "./errors/PairNotFoundError";
import TokensResponse from "./types/TokensResponse";
import SearchResponse from "./types/SearchResponse";

export const baseUri = "https://api.dexscreener.io/latest/dex/";

export const getPairInformationByChain = async (
  chainId: string,
  pairAddress: string
): Promise<PairsResponse> => {
  const url = `${baseUri}pairs/${chainId}/${pairAddress}`;
  const response = await axios.get<PairsResponse>(url);
  const pairsResponse = response.data;
  if (!pairsResponse.pair) {
    throw new PairNotFoundError(pairAddress);
  }
  return pairsResponse;
};

export const getPairsMatchingBaseTokenAddress = async (tokenAddress: string): Promise<TokensResponse> => {
  const url = `${baseUri}tokens/${tokenAddress}`;
  const response = await axios.get<TokensResponse>(url);
  const tokensResponse = response.data;
  if (!tokensResponse.pairs) {
    tokensResponse.pairs = [];
  }
  return tokensResponse;
}

export const searchPairsMatchingQuery = async (query: string): Promise<SearchResponse> => {
  const url = `${baseUri}search/?q=${query}`;
  const response = await axios.get<SearchResponse>(url);
  return response.data;
}

export const getAveragePrice = async (tokenAddress: string): Promise<number | undefined> => {
  try {
    const tokensResponse = await getPairsMatchingBaseTokenAddress(tokenAddress);
    const usdPrices = tokensResponse.pairs
      .filter((pair)=> pair.priceUsd)
      .map((pair) => Number(pair.priceUsd as string));
    
    if (usdPrices.length === 0) return 0;

    return usdPrices.reduce((previousValue, currentValue) => (previousValue + currentValue), 0) / usdPrices.length;
  } catch (err) {
    if (err instanceof Error) console.error(`An error occurred retrieving the average usd price for token: ${tokenAddress}, ${err.message}`);
  }
}