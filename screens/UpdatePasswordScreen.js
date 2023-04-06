import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import style from "../css/UpdatePassword.css";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";
import firebase from "firebase/app";
import "firebase/auth";

import { Formik } from "formik";
import * as Yup from "yup";
import {signupValidationSchema} from '../utils/update'

export const UpdatePasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [nPModalVisible, setModalVisible] = useState(false);

  const handleOPPress = () => {
    const cred = EmailAuthProvider.credential(auth.currentUser.email, text);
    reauthenticateWithCredential(auth.currentUser, cred)
      .then(() => {
        // User successfully reauthenticated.
        setModalVisible(true)
      })
      .catch(error => {
        Alert.alert('Wrong Password.');
      });
  };

  const handleNPPress = (values) => {
    const {new_pw, re_new_pw} = values;
    updatePassword(auth.currentUser, new_pw)
    .then(() => {
      // User successfully reauthenticated.
      Alert.alert('Password changed successfully.');
      navigation.goBack();
    })
    .catch(error => {
      Alert.alert('Please try again later.');
    });
  };

  return (
    <Formik initialValues={{
      new_pw:'',
      re_new_pw: ''
    }} 
    validationSchema={signupValidationSchema}
    onSubmit={values => handleNPPress(values)}
    >
      {({values, errors, touched, handleChange, setFieldTouched, handleSubmit, isValid}) =>(


      <View style={[
        styles.container,
        { backgroundColor: theme.backgroundColor }]}
      >
        <Text style={[styles.text, { color: theme.textColor }]}>Update Password</Text>
        <View style={[style.box, { backgroundColor: theme.textColor, justifyContent: 'center' }]}>
            <TextInput
              style={{ height: 40 }}
              placeholder="Enter Current Password"
              onChangeText={newText => setText(newText)}
              defaultValue={text}
              autoCapitalize = {false}
            />

            <View>
              <TouchableOpacity
                onPress={handleOPPress}>
                <Text>Confirm</Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="slide"
              visible={nPModalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}
            >
              <View style={[
                styles.container,
                { backgroundColor: theme.backgroundColor }]}
              >
                <Text style={[styles.text, { color: theme.textColor }]}>New Password</Text>
                <TextInput
                  style={{ height: 40 }}
                  placeholder="Enter New Password"
                  onChangeText={handleChange('new_pw')}
                  value = {values.new_pw}
                  // defaultValue={''}
                  autoCapitalize = {false}
                  onBlur={() => setFieldTouched('new_pw')}
                />
                {touched.new_pw && errors.new_pw && (
              <Text style = {{color: 'red'}}>{errors.new_pw}</Text>
                )}

                <TextInput
                  style={{ color: theme.updatePasswordText, height: 40 }}
                  placeholder="Confirm New Password"
                  onChangeText={handleChange('re_new_pw')}
                  // defaultValue={''}
                  value = {values.re_new_pw}  
                  autoCapitalize = {false}
                  onBlur={() => setFieldTouched('re_new_pw')}
                />
                {touched.re_new_pw && errors.re_new_pw && (
              <Text style = {{color: 'red'}} >{errors.re_new_pw}</Text>
              )}

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                      style.confirmButton,
                      { backgroundColor: isValid? theme.backgroundColor:'#FFFFFF'},
                    ]}
                    disabled = {!isValid}>
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SettingsOption')}>
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
    paddingTop: 120,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 30,
  },
});
