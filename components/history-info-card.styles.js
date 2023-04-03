import styled from "styled-components/native";
import { Card } from "react-native-paper";

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
  position: relative;
  z-index: 1;
`;

export const HistoryCard = styled(Card)`
  background-color: #7FB4AC;
  position: relative;
  z-index: 1;
`;

export const HistoryCardCover = styled(Card.Cover)`
  padding: 16px;
  background-color: #7FB4AC;
  position: relative;
  z-index: 1;
`;

export const Info = styled.View`
  padding: 16px;
  position: relative;
  z-index: 1;
`;

export const Stores = styled.Text`
  font-family: LeagueSpartan_300Light;
  font-size: 18px;
  color: #C9E8E3;
  padding-top: 4px;
  position: relative;
  z-index: 1;
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  padding-top: 32px;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
