import { View, Text, StyleSheet } from "react-native";
import {
  CandlestickChart as CandlestickChartRaw,
  TData,
} from "react-native-wagmi-charts";

type Props = {
  data: TData;
};

export default function CandlestickChart(props: Props) {
  const { data } = props;

  const onCurrentXChange = (value: number) => {
    // console.log(value);
  };

  return (
    <CandlestickChartRaw.Provider data={data}>
      <CandlestickChartRaw>
        <CandlestickChartRaw.Candles />
        <CandlestickChartRaw.Crosshair onCurrentXChange={onCurrentXChange}>
          <CandlestickChartRaw.Tooltip />
        </CandlestickChartRaw.Crosshair>
      </CandlestickChartRaw>

      <View
        style={{
          marginLeft: 12,
        }}
      >
        <CandlestickChartRaw.DatetimeText
          style={{
            marginBottom: 6,
          }}
          options={{
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          }}
        />

        <View style={styles.priceTextContainer}>
          <Text style={styles.priceLabel}>Open</Text>
          <CandlestickChartRaw.PriceText type="open" />
        </View>
        <View style={styles.priceTextContainer}>
          <Text style={styles.priceLabel}>Close</Text>
          <CandlestickChartRaw.PriceText type="close" />
        </View>
        <View style={styles.priceTextContainer}>
          <Text style={styles.priceLabel}>High</Text>
          <CandlestickChartRaw.PriceText type="high" />
        </View>
        <View style={styles.priceTextContainer}>
          <Text style={styles.priceLabel}>Low</Text>
          <CandlestickChartRaw.PriceText type="low" />
        </View>
      </View>
    </CandlestickChartRaw.Provider>
  );
}

const styles = StyleSheet.create({
  priceTextContainer: {
    flexDirection: "row",
  },
  priceLabel: {
    marginRight: 8,
    fontWeight: "bold",
    width: 40,
  },
});
