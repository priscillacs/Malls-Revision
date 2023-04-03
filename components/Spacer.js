//spacer helps with consistency in styling
import React from "react";
import styled, { useTheme } from "styled-components/native";

//this is referring to the 1,2,3 in the array of sizes
//16px, 32px, 64px, HENCE no need to write px anymore
const sizeVariant = {
  small: 1,
  medium: 2,
  large: 3,
};

const positionVariant = {
  top: "marginTop",
  left: "marginLeft",
  right: "marginRight",
  bottom: "marginBottom",
};

const space = ["0px", "4px", "8px", "16px", "32px", "64px"];

//$ makes it a string
const getVariant = (position, size) => {
  const sizeIndex = sizeVariant[size];
  const property = positionVariant[position];
  const value = space[sizeIndex];

  return `${property}:${value}`;
};

const SpacerView = styled.View`
  ${({ variant }) => variant};
`;

//must import React when using normal components
//getVariant ahead of time - not dynamic (so it can work in Android)
export const Spacer = ({ position, size, children }) => {
  const theme = useTheme();
  const variant = getVariant(position, size, theme);
  return <SpacerView variant={variant}>{children}</SpacerView>;
};

//setting defaults
Spacer.defaultProps = {
  position: "top",
  size: "small",
};
