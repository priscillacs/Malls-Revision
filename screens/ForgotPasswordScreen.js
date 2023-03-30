import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import { sendPasswordResetEmail } from "firebase/auth";

import { passwordResetSchema } from "../utils";
import { auth } from "../config/firebase";
import { View, TextInput, Button, FormErrorMessage } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export const ForgotPasswordScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const handleSendPasswordResetEmail = (values) => {
    const { email } = values;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("Success: Password Reset Email sent.");
        navigation.navigate("Login");
      })
      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.innerContainer}>
          <Text style={styles.screenTitle}>Reset your password</Text>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={passwordResetSchema}
            onSubmit={(values) => handleSendPasswordResetEmail(values)}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              handleBlur,
            }) => (
              <>
                {/* Email input field */}
                <TextInput
                  name="email"
                  leftIconName="email"
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
                {/* Display Screen Error Mesages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Password Reset Send Email  button */}
                <Button style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Send</Text>
                </Button>
              </>
            )}
          </Formik>
          {/* Button to navigate to Login screen */}
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"Go back to Login"}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6fffb",
    paddingHorizontal: 40,
  },
  innerContainer: {
    alignItems: "center",
    marginTop: 300,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#436661",
    paddingTop: 20,
  },
  button: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#c9e8e3",
    padding: 10,
    borderRadius: 20,
    borderColor: "#436661",
  },
  buttonText: {
    fontSize: 20,
    color: "#436661",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
