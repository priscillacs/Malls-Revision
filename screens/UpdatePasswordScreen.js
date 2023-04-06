import React from "react";
import { Alert, View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import style from "../css/UpdatePassword.css";
import { auth } from "../config/firebase";

import { useTogglePasswordVisibility } from "../hooks";
// import { reauthenticateWithCredential } from "firebase/auth";

import { Formik } from "formik";
import * as Yup from "yup";

//schema to validate
const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const signupValidationSchema = Yup.object().shape({
  curr_pw: Yup.string()
    .required("Input is required")
    .matches(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number."
    )
    .label("current_password"),
  
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


//code starts here
// -----------
export const UpdatePasswordScreen = () => {
  const { theme } = useTheme();

  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();
  
    const handleUpdatePassword = (values) => {
      //user authentication and change password
      const user = auth().currentUser;
      var credential= auth().EmailAuthProvider.credential(
        user.email, 
        values.curr_pw
    );

      // var validPW = false;
      reauthenticateWithCredential(credential).then(function() {
        // User re-authenticated.
        // validPW = true;
        auth().currentUser.updatePassword(values.new_pw);
        navigation.goBack();

      }).catch(function(error) {
        // An error happened.
        Alert.alert("Wrong password!")
      });
  }


  return (
    <Formik initialValues={{
      curr_pw: '',
      new_pw:'',
      re_new_pw: ''
    }} 
    validationSchema={signupValidationSchema}
    onSubmit={values => handleUpdatePassword(values)}
    >
      {({values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid}) =>(

      
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>Update</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>Password</Text>
      <View style={[style.box, { backgroundColor: theme.textColor, justifyContent: 'center' }]}>
        <View>
          <TextInput placeholder = "Enter Current Password"
            placeholderTextColor={"#808080"}
            value = {values.curr_pw}
            autoCapitalize = {false}
            onChangeText={handleChange('curr_pw')}
            onBlur={() => setFieldTouched('curr_pw')}
            style = {[{ color: theme.updatePasswordText }]}
          />
          {touched.curr_pw && errors.curr_pw && (
              <Text style = {{color: 'red'}}>{errors.curr_pw}</Text>
          )}
        </View>
        <View>
          <TextInput placeholder = "Enter New Password"
            placeholderTextColor={"#808080"}
            value = {values.new_pw}
            autoCapitalize = {false}
            onChangeText={handleChange('new_pw')}
            onBlur={() => setFieldTouched('new_pw')}
            style = {[{ color: theme.updatePasswordText}]}
          />
          {touched.new_pw && errors.new_pw && (
              <Text style = {{color: 'red'}}>{errors.new_pw}</Text>
          )}
        </View>
        <View>
          <TextInput placeholder = "Confirm New Password"
            placeholderTextColor={"#808080"}
            value = {values.re_new_pw}  
            autoCapitalize = {false}
            onChangeText={handleChange('re_new_pw')}
            onBlur={() => setFieldTouched('re_new_pw')}
            style = {[{ color: theme.updatePasswordText }]}
          />
          {touched.re_new_pw && errors.re_new_pw && (
              <Text style = {{color: 'red'}} >{errors.re_new_pw}</Text>
          )}
        </View>
        
        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            style.confirmButton,
            { backgroundColor: isValid? '#FFFFFF':theme.backgroundColor},
          ]}
          disabled = {!isValid}
        >
          <Text style={[style.confirm, { color: theme.textColor }]}>
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 30,
  },
})
