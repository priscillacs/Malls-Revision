import React, { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { View, TextInput, Logo, Button, FormErrorMessage } from "../components";
import { auth } from "../config/firebase";
import { useTogglePasswordVisibility } from "../hooks";
import { loginValidationSchema } from "../utils";
import * as Font from "expo-font";


export const LoginScreen = ({ navigation }) => {
  // const [loaded] = useFonts({
  //   DMSans_Regular: require("../assets/fonts/DMSans-Regular.ttf"),
  // });
  // state = {
  //   fontsLoaded: false,
  // };

  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setErrorState(error.message)
    );
  };
  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* LogoContainer: consits app logo and screen title */}
          <View style={styles.logoContainer}>
            {/* <Logo uri={Images.logo} /> */}
            <Text style={styles.screenTitle}>WELCOME TO MALLS!</Text>
          </View>
          <View style={styles.boximage}>
            <Image
              style={styles.image}
              source={require("../assets/startingPage.png")}
            />
          </View>
          <View style={styles.bottomcontainer}>
            <Text style={styles.middleTitle}>
              Get Started With your Journey
            </Text>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={loginValidationSchema}
              onSubmit={(values) => handleLogin(values)}
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
                  {/* Input fields */}
                  <TextInput
                    style={styles.inputBox}
                    name="email"
                    leftIconName="email"
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                  />
                  <FormErrorMessage
                    error={errors.email}
                    visible={touched.email}
                  />
                  <TextInput
                    name="password"
                    leftIconName="key-variant"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    rightIcon={rightIcon}
                    handlePasswordVisibility={handlePasswordVisibility}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <FormErrorMessage
                    error={errors.password}
                    visible={touched.password}
                  />
                  {/* Display Screen Error Mesages */}
                  {errorState !== "" ? (
                    <FormErrorMessage error={errorState} visible={true} />
                  ) : null}
                  {/* Login button */}
                  <Button style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                  </Button>
                </>
              )}
            </Formik>
            {/* Button to navigate to SignupScreen to create a new account */}

            <Button
              style={styles.borderlessButtonContainer}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.buttonText2}>Forgot Password</Text>
            </Button>
            <Text style={styles.bottomText}>
              Don't have an account?
              <Button
                style={styles.borderlessButtonContainer}
                // borderless
                onPress={() => navigation.navigate("Signup")}
              >
                <Text style={styles.buttonText2}>Register</Text>
              </Button>
            </Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6fffb",
  },
  boximage: {
    flex: 1,
    paddingBottom: 0,
  },
  image: {
    marginTop: 10,
    // resizeMode: "cover",
    height: 320,
    width: 400,
    marginBottom: 0,
  },
  bottomcontainer: {
    flex: 1,
    backgroundColor: "#436661",
    paddingLeft: 30,
    paddingRight: 30,
  },
  logoContainer: {
    alignItems: "center",
  },

  screenTitle: {
    // fontFamily: "DMSans_Regular",
    fontSize: 32,
    fontWeight: "700",
    color: "#436661",
    paddingTop: 20,
    paddingBottom: 10,
  },
  middleTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#e6fffb",
    paddingTop: 20,
    textAlign: "center",
  },
  button: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#e6fffb",
    padding: 10,
    marginLeft: 80,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#436661",
    fontWeight: "700",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    color: "#e6fffb",
  },

  bottomText: {
    fontSize: 15,
    color: "#e6fffb",
    fontWeight: "400",
    textAlign: "center",
  },
  buttonText2: {
    fontSize: 15,
    color: "#e6fffb",
    fontWeight: "900",
    textDecorationLine: "underline",
    textAlign: "center",
  },

  inputBox: {},
});
