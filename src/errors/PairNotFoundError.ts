class PairNotFoundError extends Error {
  constructor(pair: string) {
    super(`The pair ${pair} was not found`);
  }
}

export default PairNotFoundError;
