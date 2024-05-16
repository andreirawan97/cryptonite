import { TData } from "react-native-wagmi-charts";
import { GetCandleDataResponse_Candle } from "../types/api";
import { OrderBookDeltaArray, OrderBookHash } from "../types/common";

export function roundNumber(num: number): number {
  // return Number(num.toFixed(2));
  return Math.round(num * 100) / 100;
}

export function getSpreadAmount(bids: number[][], asks: number[][]): number {
  if (!bids.length || !asks.length) {
    return 0;
  }

  const highestBid = Math.max.apply(
    Math,
    bids.map((bid) => bid[0])
  );
  const lowestAsk = Math.min.apply(
    Math,
    asks.map((ask) => ask[0])
  );
  return roundNumber(Math.abs(lowestAsk - highestBid));
}

export function parseFromResponseToCandleData(
  responseData: GetCandleDataResponse_Candle[]
): TData {
  return responseData.map((candle) => {
    const { close, high, low, open, time } = candle;

    return {
      timestamp: time,
      open: Number(open),
      close: Number(close),
      high: Number(high),
      low: Number(low),
    };
  });
}

export function mapDeltaArrayToHash(
  deltaArray: OrderBookDeltaArray
): OrderBookHash {
  let orderBookHash: OrderBookHash = new Map();
  let prevOrderBookHashId: string = "";

  deltaArray.forEach((delta, i) => {
    const price = delta[0];
    const size = roundNumber(delta[1]);
    const orderBookHashId = price;

    if (i === 0) {
      orderBookHash.set(`${orderBookHashId}`, {
        price,
        size,
        total: roundNumber(size),
      });
    } else {
      const prevOrderBookHash = orderBookHash.get(`${prevOrderBookHashId}`);

      orderBookHash.set(`${orderBookHashId}`, {
        price,
        size,
        total: roundNumber((prevOrderBookHash?.total ?? 0) + size),
      });
    }

    prevOrderBookHashId = String(price);
  });

  return orderBookHash;
}

export function generateUniqueDeltaArray(
  deltaArray: OrderBookDeltaArray,
  orderType: "asks" | "bids",
  maxDeltaArrayLength?: number
): OrderBookDeltaArray {
  let uniqueDeltaArray: OrderBookDeltaArray = [];
  const deltaArrayMap: Record<string, number> = {};

  deltaArray.forEach((delta, i) => {
    const price = delta[0];
    const size = roundNumber(delta[1]);

    if (deltaArrayMap[`${price}`]) {
      deltaArrayMap[`${price}`] += size;
    } else {
      deltaArrayMap[`${price}`] = size;
    }
  });

  uniqueDeltaArray = Object.keys(deltaArrayMap).map((mapKey) => [
    Number(mapKey),
    deltaArrayMap[`${mapKey}`],
  ]);

  if (!!maxDeltaArrayLength) {
    while (uniqueDeltaArray.length !== maxDeltaArrayLength) {
      uniqueDeltaArray.pop();
    }
  }

  const sortedDeltaArray = uniqueDeltaArray.sort(
    (a: number[], b: number[]) => a[0] - b[0]
  );

  return sortedDeltaArray;
}

// export function mergeOrderBookHash(
//   firstOrderBookHash: OrderBookHash,
//   secondOrderBookHash: OrderBookHash
// ): OrderBookHash {
//   let mergedOrderBookHash: OrderBookHash = firstOrderBookHash;

//   Object.keys(secondOrderBookHash).forEach((orderBookHashItemId, i) => {
//     // If object already exist in the first hash, combine the total
//     if (mergedOrderBookHash[`${orderBookHashItemId}`]) {
//       mergedOrderBookHash[`${orderBookHashItemId}`] = {
//         ...mergedOrderBookHash[`${orderBookHashItemId}`],
//         total:
//           Number(mergedOrderBookHash[`${orderBookHashItemId}`]) +
//           Number(secondOrderBookHash[`${orderBookHashItemId}`]),
//       };
//     }
//   });

//   return mergedOrderBookHash;
// }
