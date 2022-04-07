import Pair from "./Pair";

export default interface SearchResponse {
  schemaVersion: string;
  pairs: Pair[];
}
