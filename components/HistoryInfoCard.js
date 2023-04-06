import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/TextComponent";
import { useNavigation } from "@react-navigation/native";
const styles = StyleSheet.create({
  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" },
});

import {
  HistoryCard,
  HistoryCardCover,
  Stores,
  Info,
  Section,
  SectionEnd,
} from "./history-info-card.styles";

//RMB TO SET HISTORY AS AN EMPTY OBJECT otherwise it'll be undefined & break
export const HistoryInfoCard = ({ history = {} }) => {
  //setting this as default
  const {
    date = "2023-02-04 10:21:15",
    mall = "Some Mall",
    photo = "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    stores = ["Store A", "Store B", "Store C"],
  } = history;

  const navigation = useNavigation();

  const onPressGoAgain = () => {
    navigation.navigate("CarparkOrMall", {
      resultMall: mall,
      resultStores: stores,
    });
  };
  return (
    <HistoryCard elevation={5}>
      <HistoryCardCover key={mall} source={{ uri: photo }} />
      <Info>
        <Text variant="subcaption" style={{ marginBottom: 5 }}>
          {" "}
          {date}{" "}
        </Text>
        <Text style={{ textTransform: "uppercase" }} variant="label">
          {mall}
        </Text>
        <Section>
          <Spacer>
            {stores.map((store) => {
              return <Stores>{store}</Stores>;
            })}
          </Spacer>
          <SectionEnd>
            <Spacer position="top" size="large">
              <TouchableOpacity onPress={onPressGoAgain}>
                <Text variant="caption" style={styles.underline}>
                  Go Again
                </Text>
              </TouchableOpacity>
            </Spacer>
          </SectionEnd>
        </Section>
      </Info>
    </HistoryCard>
  );
};
