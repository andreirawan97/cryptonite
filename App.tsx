import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TData } from "react-native-wagmi-charts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

import MainNavigator from "./src/routes/MainNavigator";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar />
        <SafeAreaView style={{ flex: 1 }}>
          <MainNavigator />
        </SafeAreaView>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
