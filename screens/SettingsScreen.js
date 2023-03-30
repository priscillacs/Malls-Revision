import { update } from "firebase/database";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View, Switch } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
// import UpdatePassword from "./UpdatePasswordScreen";

export const SettingsScreen = ({ navigation }) => {
  // to use hook
  const { theme, updateTheme } = useTheme();

  const changeTheme = () => updateTheme(theme.themeMode);

  const [isEnabled, setIsEnabled] = useState(
    theme === "default" ? false : true
  );
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const updatePassword = () => {
    navigation.navigate("UpdatePassword");
  };
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>Settings</Text>
      <Button
        title="change theme"
        onPress={changeTheme}
        color={theme.nav.backgroundColor}
      />
      <Button title="Sign Out" onPress={handleLogout} />
      {/* <Switch 
        value = {isEnabled}
        onChange={handleOnChange}
        trackColor={{false:'#767577', true:'#81b0ff'}}
        thumbColor={theme==='default'? '#f5dd4b':'#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        
      /> */}
      <Button
        title="Update Password"
        onPress={updatePassword}
        color={theme.nav.backgroundColor}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    padding: 90,
  },
});
