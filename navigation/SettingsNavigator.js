import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { UpdatePasswordScreen } from "../screens/UpdatePasswordScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

import { useTheme } from "../contexts/ThemeProvider";

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator screenOptions={{ headerTransparent: true, title: "" }}>
      <Stack.Screen name="SettingsOption" component={SettingsScreen} />
      <Stack.Screen name="UpdatePassword" component={UpdatePasswordScreen} 
        options={{
          headerTintColor: theme.textColor
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SettingsNavigator;
