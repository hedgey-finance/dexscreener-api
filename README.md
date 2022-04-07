# dexscreener-api

dexscreener-api is a typescript wrapper around the **DEX screener** API. [dex screener api](https://docs.dexscreener.com/) this API is currently in beta and the wrapper may stop working at any time.

## Installation

npm install dexscreener-api

## Usage

```typescript
Get pair information by chain
const pairsResponse = await getPairInformationByChain("bsc", "0x7213a321F1855CF1779f42c0CD85d3D95291D34C");

Get pairs matching base token address
const tokensResponse = await getPairsMatchingBaseTokenAddress("0x2170Ed0880ac9A755fd29B2688956BD959F933F8");

Search for pairs matching query
const searchResponse = await searchPairsMatchingQuery("WBNB USDC");
```

## Contributing
Pull requests are welcome.

Please make sure to update tests as appropriate.