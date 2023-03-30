import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  RecommendationScreen,
  CarparkOrMallScreen,
  MapScreen,
  ResultScreen,
} from "../screens";
import { TabNavigator } from "./TabNavigator";
// import { RecommendationStack } from "./RecommendationStack";
const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen
        name="MallRecommendation"
        component={RecommendationScreen}
      />
      <Stack.Screen name="CarparkOrMall" component={CarparkOrMallScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
      {/* <Stack.Screen name="Result" component={ResultScreen} /> */}
    </Stack.Navigator>
  );
};
