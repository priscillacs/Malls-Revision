import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  HomeScreen,
  RecommendationScreen,
  CarparkOrMallScreen,
  CartScreen,
} from "../screens";
import { TabNavigator } from "./TabNavigator";
const Stack = createStackNavigator();

export const RecommendationStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="MallRecommendation"
        component={RecommendationScreen}
      />
      <Stack.Screen name="CarparkOrMall" component={CarparkOrMallScreen} />
    </Stack.Navigator>
  );
};
