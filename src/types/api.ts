import { OrderBookDeltaArray } from "./common";

export type GetCandleDataRequest_Resolution =
  | "1m"
  | "5m"
  | "15m"
  | "30m"
  | "1h"
  | "4h"
  | "12h"
  | "1d"
  | "1w";
export type GetCandleDataRequest_Symbol = string;
export type GetCandleDataRequest_TickType = "spot" | "mark" | "trade";

export type GetCandleDataResponse_Candle = {
  time: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};
export type GetCandleDataResponse = {
  candles: GetCandleDataResponse_Candle[];
  more_candles: boolean;
};

export type GetOrderBookResponse = {
  asks: OrderBookDeltaArray;
  bids: OrderBookDeltaArray;
  feed: string;
  numLevels?: number;
  product_id: string;
};
