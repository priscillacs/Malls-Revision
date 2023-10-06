// import * as Yup from "yup";

// export const loginValidationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(8).label("Password"),
// });

// export const signupValidationSchema = Yup.object().shape({
//   email: Yup.string().required().email().label("Email"),
//   password: Yup.string().required().min(8).label("Password"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password")], "Confirm Password must match password.")
//     .required("Confirm Password is required."),
// });

// export const passwordResetSchema = Yup.object().shape({
//   email: Yup.string()
//     .required("Please enter a registered email")
//     .label("Email")
//     .email("Enter a valid email"),
// });
import * as Yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number with minimum 8 characters."
    )
    .label("Password"),
});

export const signupValidationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string()
    .required()
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number with minimum 8 characters."
    )
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm Password must match password.")
    .required("Confirm Password is required."),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter a registered email")
    .label("Email")
    .email("Enter a valid email"),
});
