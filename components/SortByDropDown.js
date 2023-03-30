import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const SortByDropdown = ({ sortOption, setSortOption }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSortOption = (option) => {
    setSortOption(option);
    setDropdownVisible(false);
  };

  const dropdownOptions = [
    { label: "Default", value: "Default" },
    { label: "Distance", value: "Distance" },
    { label: "Car Park Availability", value: "Carpark" },
  ];

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 4,
          paddingVertical: 5,
          paddingHorizontal: 20,
          marginRight: 10,
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={{ marginRight: 5 }}>Sort By - {sortOption} </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#ccc" />
      </TouchableOpacity>
      {dropdownVisible && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            position: "absolute",
            top: 50,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          {dropdownOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={{ paddingVertical: 5 }}
              onPress={() => handleSortOption(option.value)}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
export default SortByDropdown;
