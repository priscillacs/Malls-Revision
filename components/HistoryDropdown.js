import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export const HistoryDropdown = ({ sortOption, setSortOption }) => {
  const handleSortOption = (option) => {
    setSortOption(option);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("Most Recent");
  const [items, setItems] = useState([
    { label: "Most Recent", value: "Most Recent" },
    { label: "Least Recent", value: "Least Recent" },
    { label: "A-Z", value: "A-Z" },
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={handleSortOption}
      //to change the dropdown box style
      dropDownContainerStyle={{
        backgroundColor: "white",
      }}
      // to style the selected item style
      selectedItemContainerStyle={{
        backgroundColor: "#C9E8E3",
      }}
      containerStyle={{ width: 200 }}
    />
  );
};
