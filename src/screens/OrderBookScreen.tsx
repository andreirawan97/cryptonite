import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Divider, Spinner } from "@gluestack-ui/themed";

import { GetOrderBookResponse } from "../types/api";
import {
  generateUniqueDeltaArray,
  getSpreadAmount,
  mapDeltaArrayToHash,
} from "../utils/common";
import { OrderBookDeltaArray, OrderBookHash } from "../types/common";
import { OrderBookTable } from "../components";
import Modal from "../components/Modal";

export default function OrderBookScreen() {
  const MAXIMUM_ORDER = 25;

  const [isConnecting, setConnecting] = useState(true);

  const [bids, setBids] = useState<OrderBookDeltaArray>([]);
  const [bidsHash, setBidsHash] = useState<OrderBookHash>(new Map());
  const [asks, setAsks] = useState<OrderBookDeltaArray>([]);
  const [asksHash, setAsksHash] = useState<OrderBookHash>(new Map());

  /**
   *
   * Logic:
   * 1. Make bids and asks state number[][]
   * 2. On new data, make a new var called _bids or _asks and call generateUniqueDeltaArray (it will automatically filter max data)
   * 3. Set _bids or _asks to bids or asks state
   *
   */

  const processMessage = (event: { data: string }) => {
    const response = JSON.parse(event.data) as GetOrderBookResponse;

    if (!!response.asks || !!response.bids) {
      if (!!response.bids.length) {
        const _bids = bids;
        _bids.push(...response.bids);

        const newBids = generateUniqueDeltaArray(_bids, "bids", MAXIMUM_ORDER);
        const newBidsHash = mapDeltaArrayToHash(newBids);

        setBids(newBids);
        setBidsHash(newBidsHash);
      }
      if (!!response.asks.length) {
        const _asks = asks;
        _asks.push(...response.asks);

        const newAsks = generateUniqueDeltaArray(_asks, "asks", MAXIMUM_ORDER);
        const newAsksHash = mapDeltaArrayToHash(newAsks);

        setAsks(newAsks);
        setAsksHash(newAsksHash);
      }
    }
  };

  useEffect(() => {
    const subscribeMessage = {
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: ["PF_BNBUSD"],
    };
    const ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage));
      setConnecting(false);
    };
    ws.onmessage = (event) => {
      processMessage(event);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 12,
        paddingTop: 12,
      }}
      contentInset={{
        bottom: 24,
      }}
    >
      <Text style={styles.title}>PF_BNBUSD</Text>

      <OrderBookTable hash={bidsHash} orderType="bids" />

      <Divider
        style={{
          marginVertical: 6,
        }}
      />
      <View style={{ alignItems: "center" }}>
        <Text>Spread: {getSpreadAmount(bids, asks)}</Text>
      </View>
      <Divider
        style={{
          marginVertical: 6,
        }}
      />

      <OrderBookTable hash={asksHash} orderType="asks" />

      <Modal
        isOpen={isConnecting}
        BodyElement={
          <View
            style={{ marginTop: 24, marginBottom: 12, alignItems: "center" }}
          >
            <Spinner size={"large"} style={{ marginBottom: 6 }} />
            <Text>Connecting...</Text>
          </View>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: "bold",
  },
});
