import * as Yup from 'yup'

//schema to validate
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const signupValidationSchema = Yup.object().shape({
//   curr_pw: Yup.string()
//     .required("Input is required")
//     .matches(
//       passwordRegex,
//       "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number."
//     )
//     .label("current_password"),
  
    new_pw: Yup.string()
    .required("Input is required.")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number."
    )
    .label("Password"),
  
    re_new_pw: Yup.string()
    .oneOf([Yup.ref("new_pw")], "Confirm Password must match password.")
    .required("Input is required."),
});