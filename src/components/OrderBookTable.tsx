import { StyleSheet, View, Text } from "react-native";
import { useMemo } from "react";

import { OrderBookHash, OrderBookHash_Item } from "../types/common";

type Props = {
  orderType: "bids" | "asks";
  hash: OrderBookHash;
};

export default function OrderBookTable(props: Props) {
  const { hash, orderType } = props;

  const title = useMemo(() => {
    return orderType === "bids" ? "Bids" : "Asks";
  }, [orderType]);

  const hashArray: OrderBookHash_Item[] = Array.from(hash, ([_, value]) => ({
    ...value,
  })).sort((a: OrderBookHash_Item, b: OrderBookHash_Item) =>
    orderType === "asks" ? a.price - b.price : b.price - a.price
  );

  const currentTotal = !!hashArray.length
    ? orderType === "bids"
      ? hashArray[0].total
      : hashArray[hashArray.length - 1].total
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        <View style={styles.priceContainer}>
          <Text style={{ fontWeight: "bold" }}>Price</Text>
        </View>
        <View style={styles.sizeContainer}>
          <Text style={{ fontWeight: "bold" }}>Size</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={{ fontWeight: "bold" }}>Total</Text>
        </View>
      </View>

      {hashArray.map((orderBookHashItem, i) => (
        <View style={styles.row} key={i}>
          {/* The bar */}
          <View
            style={{
              position: "absolute",
              //   width:
              //     orderType === "bids"
              //       ? `${
              //           ((currentTotal - orderBookHashItem.total) /
              //             currentTotal) *
              //           100
              //         }%`
              //       : `${(orderBookHashItem.total / currentTotal) * 100}%`,
              width: `${(orderBookHashItem.total / currentTotal) * 100}%`,
              height: "100%",
              left: 0,
              top: 0,
              right: 0,
              backgroundColor: orderType === "asks" ? "#ffcbd1" : "#b1deb5",
            }}
          ></View>

          {/* The content */}
          <View style={styles.priceContainer}>
            <Text>{orderBookHashItem.price}</Text>
          </View>
          <View style={styles.sizeContainer}>
            <Text>{orderBookHashItem.size}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text>{orderBookHashItem.total}</Text>
          </View>
        </View>
      ))}

      {/* {Object.keys(hash).map((hashId, i) => (
        <View style={styles.row} key={i}>
          <View style={styles.priceContainer}>
            <Text>{hash[`${hashId}`].price}</Text>
          </View>
          <View style={styles.sizeContainer}>
            <Text>{hash[`${hashId}`].size}</Text>
          </View>
          <View style={styles.totalContainer}>
            <Text>{hash[`${hashId}`].total}</Text>
          </View>
        </View>
      ))} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  priceContainer: {
    flex: 1,
  },
  sizeContainer: {
    flex: 1,
  },
  totalContainer: {
    flex: 1,
  },
});
