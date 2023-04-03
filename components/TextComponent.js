import styled from "styled-components/native";

const defaultTextStyles = `
  font-weight: 400;
  color: #E7F4F2;
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = `
    font-size: 20px;
`;

const hint = `
    font-size: 20px;
`;

const error = `
    color: red;
`;

const caption = `
    font-size: 17px;
    font-weight: 600;
`;

const subcaption = `
    font-size: 16px;
    font-weight: 500;
`;

const label = `
    font-size: 22px;
    font-weight: 700;
`;

export const Text = styled.Text`
  ${defaultTextStyles}
  ${({ variant }) => {
    switch (variant) {
      case "body":
        return body;
      case "hint":
        return hint;
      case "error":
        return error;
      case "caption":
        return caption;
      case "subcaption":
        return subcaption;
      case "label":
        return label;
      default:
        return body;
    }
  }}
`;

Text.defaultProps = {
  variant: "body",
};
