
import * as Yup from "yup";

const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const loginValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number."
    )
    .label("Password"),
});

export const signupValidationSchema = Yup.object().shape({
    current_password: Yup.string()
      .required("Input is required")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number."
      )
      .label("current_password"),
    
    password: Yup.string()
      .required("Input is required.")
      .matches(
        passwordRegex,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number."
      )
      .label("Password"),
    
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Confirm Password must match password.")
      .required("Confirm Password is required."),

  });
