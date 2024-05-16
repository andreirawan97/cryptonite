import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TData } from "react-native-wagmi-charts";
import { Divider, Spinner } from "@gluestack-ui/themed";

import { CandlestickChart } from "../components";
import {
  GetCandleDataRequest_Resolution,
  GetCandleDataRequest_Symbol,
  GetCandleDataRequest_TickType,
  GetCandleDataResponse,
} from "../types/api";
import { parseFromResponseToCandleData } from "../utils/common";
import { Select } from "../core-ui";
import { SelectItem } from "../core-ui/Select";
import Modal from "../components/Modal";

export default function HomeScreen() {
  const TICK_TYPE_SELECT_ITEMS: GetCandleDataRequest_TickType[] = [
    "mark",
    "spot",
    "trade",
  ];
  const RESOLUTION_SELECT_ITEMS: SelectItem[] = [
    {
      value: "1m",
      label: "1m",
    },
    {
      value: "5m",
      label: "5m",
    },
    {
      value: "15m",
      label: "15m",
    },
    {
      value: "30m",
      label: "30m",
    },
    {
      value: "1h",
      label: "1h",
    },
    {
      value: "4h",
      label: "4h",
    },
    {
      value: "12h",
      label: "12h",
    },
    {
      value: "1d",
      label: "1d",
    },
    {
      value: "1w",
      label: "1w",
    },
  ];
  const SYMBOL_SELECT_ITEMS: GetCandleDataRequest_Symbol[] = [];

  const [tickType, setTickType] =
    useState<GetCandleDataRequest_TickType>("spot");
  const [resolution, setResolution] =
    useState<GetCandleDataRequest_Resolution>("1m");
  const [symbol, setSymbol] =
    useState<GetCandleDataRequest_Symbol>("PF_BNBUSD");

  const [candleData, setCandleData] = useState<TData>([]);
  const [isFetchingCandleData, setFetchingCandleData] = useState(true);

  async function fetchCandleData() {
    const URL = `https://www.cryptofacilities.com/api/charts/v1/${tickType}/${symbol}/${resolution}`;

    setFetchingCandleData(true);

    const response = await fetch(URL);
    const json: GetCandleDataResponse = await response.json();

    const _candleData = parseFromResponseToCandleData(json.candles);
    setCandleData(_candleData);
    setFetchingCandleData(false);
  }

  useEffect(() => {
    fetchCandleData();
  }, [tickType, resolution, symbol]);

  const onResolutionValueChange = (value: string) => {
    setResolution(value as GetCandleDataRequest_Resolution);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>{symbol}</Text>
          <Text style={styles.tickType}>/ {tickType}</Text>
        </View>

        <Select
          items={RESOLUTION_SELECT_ITEMS}
          defaultValue={resolution}
          onValueChange={onResolutionValueChange}
          containerStyle={styles.resolutionContainer}
        />
      </View>

      <CandlestickChart data={candleData} />

      <Modal
        isOpen={isFetchingCandleData}
        BodyElement={
          <View
            style={{ marginTop: 24, marginBottom: 12, alignItems: "center" }}
          >
            <Spinner size={"large"} style={{ marginBottom: 6 }} />
            <Text>Getting Candlestick Data</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  configContainer: {
    paddingHorizontal: 12,
  },
  resolutionContainer: {
    width: 100,
  },
  divider: {
    marginVertical: 24,
  },
  title: {
    fontSize: 18,
    marginVertical: 12,
    fontWeight: "bold",
  },
  tickType: {
    fontSize: 18,
    marginLeft: 6,
  },
});
