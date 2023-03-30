import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar";
import SettingsNavigator from "./SettingsNavigator";

import { HomeScreen, CartScreen, HistoryScreen } from "../screens";

const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ icon: "home" }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        initialParams={{ icon: "bars" }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        initialParams={{ icon: "retweet" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        initialParams={{ icon: "setting" }}
      />
    </Tab.Navigator>
  );
};
