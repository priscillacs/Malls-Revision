import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { HistoryInfoCard } from "../components/HistoryInfoCard";
import { Spacer } from "../components/Spacer";
import { HistoryDropdown } from "../components/HistoryDropdown";
import { db } from "../config/firebase";
import { ref, onValue } from "firebase/database";

export const HistoryScreen = () => {
  const [toDoData, setToDoData] = useState([]);

  useEffect(() => {
    const pastHistoryData = ref(db, "historyData");
    onValue(pastHistoryData, (snapshot) => {
      const result = snapshot.val();
      setToDoData(result);
    });
  }, []);

  const [sortOption, setSortOption] = useState("Most Recent");
  let sortedData = [...toDoData];

  if (sortOption === "Most Recent") {
    sortedData.sort((a, b) => new Date(b.date.replace(/-/g, "/")) - new Date(a.date.replace(/-/g, "/")));
  } else if (sortOption === "Least Recent") {
    sortedData.sort((a, b) => new Date(a.date.replace(/-/g, "/")) - new Date(b.date.replace(/-/g, "/")));
  } else if (sortOption === "A-Z") {
    sortedData.sort((a, b) => a.mall.localeCompare(b.mall));
  }

  return (
    <View style={{ backgroundColor: "#E7F4F2" }}>
      <Spacer position="top" size="large" />
      <DropdownAlignment>
        <HistoryDropdown
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      </DropdownAlignment>
      <Spacer position="" size="large">
        <FlatList
          data={sortedData}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="xlarge">
              <HistoryInfoCard history={item} />
            </Spacer>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingBottom: 180 }}
        />
      </Spacer>
    </View>
  );
};

const DropdownAlignment = styled.View`
  margin-right: 20px;
  flex-direction: row;
  justify-content: flex-end;
  z-index: 1;
  background-color: transparent;
`;
