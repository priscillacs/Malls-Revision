import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Spacer } from "../components/Spacer";
import { Text } from "../components/TextComponent";

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

  return (
    <HistoryCard elevation={5}>
      <HistoryCardCover key={mall} source={{ uri: photo }} />
      <Info>
        <Text style={{ marginBottom: 5 }}> {date} </Text>
        <Text>{mall}</Text>
        <Section>
          <Spacer>
            {stores.map((store) => {
              return <Stores>{store}</Stores>;
            })}
          </Spacer>
          <SectionEnd>
            <Spacer>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.underline}>Go Again</Text>
              </TouchableOpacity>
            </Spacer>
          </SectionEnd>
        </Section>
      </Info>
    </HistoryCard>
  );
};
