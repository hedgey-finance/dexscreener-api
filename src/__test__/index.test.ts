import {
  getAveragePrice,
  getPairInformationByChain,
  getPairsMatchingBaseTokenAddress,
  searchPairsMatchingQuery,
} from "../index";

const CONSTANTS = {
  BSC: "bsc",
  PAIR: "0x7213a321F1855CF1779f42c0CD85d3D95291D34C",
  TOKEN: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
  QUERY: "WBNB USDC",
};

describe("DEX API", () => {
  it("should return pair information by chain", async () => {
    const pairsResponse = await getPairInformationByChain(
      CONSTANTS.BSC,
      CONSTANTS.PAIR
    );
    expect(pairsResponse.schemaVersion).toBe("1.0.0");
    expect(pairsResponse.pair.chainId).toBe(CONSTANTS.BSC);
    expect(pairsResponse.pair.pairAddress).toBe(CONSTANTS.PAIR);
  });

  it("should return pairs matching token address", async () => {
    const tokensResponse = await getPairsMatchingBaseTokenAddress(
      CONSTANTS.TOKEN
    );
    expect(tokensResponse.schemaVersion).toBe("1.0.0");
    expect(tokensResponse.pairs.length).toBeGreaterThan(0);
  });

  it("should search for pairs a query", async () => {
    const searchResponse = await searchPairsMatchingQuery(CONSTANTS.QUERY);
    expect(searchResponse.schemaVersion).toBe("1.0.0");
    expect(searchResponse.pairs.length).toBeGreaterThan(0);
  });

  it("should return the average price of a token", async () => {
    const averagePrice = await getAveragePrice(
      "0xb2e2650dfdb7b2dec4a4455a375ffbfd926ce5fc"
    );
    expect(averagePrice).toBeLessThan(1);
  });
});
