import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  font-weight: ${theme.fontWeights.regular};
  color: ${theme.colors.text.secondary};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const hint = (theme) => `
    font-size: ${theme.fontSizes.body};
`;

const error = (theme) => `
    color: ${theme.colors.text.error};
`;

const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const subcaption = (theme) => `
    font-size: ${theme.fontSizes.subcaption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = (theme) => `
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

//declared on top
const variants = {
  body,
  label,
  caption,
  subcaption,
  error,
  hint,
};

//export Text that takes the Text component that styled-components have exported
//has 2 dynamic properties
//second line is destructuring on LHS
//if a text doesn't have a variant at all, it will allocate defaultTextStyles
//in [variant], it will take one of the variants, eg. "label"
export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

//will run body by default
Text.defaultProps = {
  variant: "body",
};
