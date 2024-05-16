import { OrderBookDeltaArray, OrderBookHash } from "../../types/common";
import {
  generateUniqueDeltaArray,
  getSpreadAmount,
  mapDeltaArrayToHash,
} from "../common";

it("should return correct Order Book Hash", () => {
  const deltaArray: OrderBookDeltaArray = [
    [576.42, 0],
    [577.68, 0.75],
    [578.67, 12.51],
  ];
  const expectedOrderBookHash: OrderBookHash = new Map()
    .set("576.42", {
      price: 576.42,
      size: 0,
      total: 0,
    })
    .set("577.68", {
      price: 577.68,
      size: 0.75,
      total: 0.75,
    })
    .set("578.67", {
      price: 578.67,
      size: 12.51,
      total: 13.26,
    });

  const orderBookHash = mapDeltaArrayToHash(deltaArray);

  expect(orderBookHash).toEqual(expectedOrderBookHash);
});

it("should return unique Order Book Delta Array", () => {
  const deltaArray: OrderBookDeltaArray = [
    [0, 1],
    [0, 1],
    [1, 10],
  ];
  const expectedDeltaArray: OrderBookDeltaArray = [
    [0, 2],
    [1, 10],
  ];

  const uniqueDeltaArray = generateUniqueDeltaArray(deltaArray, "asks");

  expect(uniqueDeltaArray).toEqual(expectedDeltaArray);
});

it("should return unique Order Book Delta Array with Max 25 data", () => {
  const deltaArray: OrderBookDeltaArray = [];
  const expectedDeltaArray: OrderBookDeltaArray = [];

  for (let i = 0; i < 30; i++) {
    deltaArray.push([i, i]);

    if (i < 25) {
      expectedDeltaArray.push([i, i]);
    }
  }

  const uniqueDeltaArray = generateUniqueDeltaArray(deltaArray, "asks", 25);

  expect(uniqueDeltaArray).toEqual(expectedDeltaArray);
});

it("should return 0 for empty array args in getSpreadAmount", () => {
  const bids: number[][] = [];
  const asks: number[][] = [];

  expect(getSpreadAmount(bids, asks)).toEqual(0);
});
