import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CandlestickScreen, OrderBookScreen } from "../screens";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Candlestick" component={CandlestickScreen} />
        <Tab.Screen name="Order Book" component={OrderBookScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
