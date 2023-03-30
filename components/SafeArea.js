import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

//StatusBar.currentHeight does not work in iOS, it uses SafeAreaView
//IF StatusBar.currentHeight has a value,
//add margin-top w StatusBar.currentHeight px
//$ allows to reference variable from outside eg. StatusBar which is imported
export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;
