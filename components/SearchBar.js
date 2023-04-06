import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeProvider";
const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  const { theme, updateTheme } = useTheme();
  return (
    <View
      style={[styles.backgroundStyle, { backgroundColor: theme.ui.tertiary }]}
    >
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.inputStyle]}
        placeholder="Search for a store"
        placeholderTextColor={theme.text.secondary}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
      <Feather
        style={[styles.iconStyle, { color: theme.text.secondary }]}
        name="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 15,
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    marginLeft: 20,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    color: "white",
  },
});

export default SearchBar;
