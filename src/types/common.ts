export type OrderBookDeltaArray = number[][];

export type OrderBookHash_Item = {
  price: number;
  size: number;
  total: number;
};
export type OrderBookHash = Map<string, OrderBookHash_Item>;
