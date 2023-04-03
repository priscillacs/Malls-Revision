import styled from "styled-components/native";

const defaultTextStyles = `
  font-family: LeagueSpartan_300Light;
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
    font-size: 18px;
    font-weight: 700;
`;

const subcaption = `
    font-size: 16px;
    font-weight: 700;
`;

const label = `
    font-family: VastShadow_400Regular;
    font-size: 20px;
    font-weight: 500;
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

// //declared on top
// const variants = {
//     body,
//     label,
//     caption,
//     subcaption,
//     error,
//     hint,
//   };

// //export Text that takes the Text component that styled-components have exported
// //has 2 dynamic properties
// //second line is destructuring on LHS
// //if a text doesn't have a variant at all, it will allocate defaultTextStyles
// //in [variant], it will take one of the variants, eg. "label"
// export const Text = styled.Text`
//   ${({ theme }) => defaultTextStyles(theme)}
//   ${({ variant, theme }) => variants[variant](theme)}
// `;

// //will run body by default
// Text.defaultProps = {
//   variant: "body",
// };
