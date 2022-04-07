import Pair from "./Pair";

export default interface TokensResponse {
  schemaVersion: string;
  pairs: Pair[];
}