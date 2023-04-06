import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Modal, Alert, Image, Pressable } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import style from "../css/UpdatePassword.css";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";
import firebase from "firebase/app";
import "firebase/auth";

import { Formik } from "formik";
import * as Yup from "yup";
import {signupValidationSchema} from '../utils/update'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const UpdatePasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [nPModalVisible, setModalVisible] = useState(false);

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
  useTogglePasswordVisibility();

  const handleOPPress = () => {
    const cred = EmailAuthProvider.credential(auth.currentUser.email, text);
    reauthenticateWithCredential(auth.currentUser, cred)
      .then(() => {
        // User successfully reauthenticated.
        // default not visible for modal
        if (passwordVisibility===false)  {
          handlePasswordVisibility();
        }
        setModalVisible(true);
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
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <Text style={[styles.text, { color: theme.textColor }]}>Update Password</Text>
          <Image source={require('../assets/images/forgetPasswordBack.png')} style = {{ opacity:0.7, position: 'absolute', top:"17%", alignSelf:'center'}}/> 
          <View style={[style.box, { justifyContent: 'space-around' }]}>
              {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}> */}
                <TextInput
                  style={[style.boxLine1, { backgroundColor:theme.ui.inputBox, textAlign:'center' }]}
                  placeholder="Enter Current Password"
                  placeholderTextColor={theme.ui.input}
                  onChangeText={newText => setText(newText)}
                  // defaultValue={text}
                  value = {text}
                  autoCapitalize = "none"
                  autoCorrect={false}
                  textContentType="newPassword"
                  secureTextEntry={passwordVisibility}
                  enablesReturnKeyAutomatically
                />
                <Pressable onPress={handlePasswordVisibility}  style = {{position:'absolute', alignSelf:'flex-end', paddingRight:40, paddingTop:8}}>
                  <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                </Pressable>
              {/* </View> */}
              <View style = {{flexDirection: 'row', alignSelf:'center'}}>
                <TouchableOpacity
                  style={[style.confirmButton, { backgroundColor:theme.ui.primary, justifyContent:'space-evenly', alignItems:'center'}]}
                  onPress={handleOPPress}>
                  <Text style = {{color: theme.textColor}}> Confirm </Text>
                </TouchableOpacity>
              </View>
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
                <KeyboardAwareScrollView enableOnAndroid={true}>
                  <Text style={[styles.text, { color: theme.textColor }]}>New Password</Text>
                  <Image source={require('../assets/images/forgetPasswordBack.png')} style = {{ opacity:0.7, position: 'absolute', top:"20%", alignSelf:'center'}}/> 
                  <View style={[style.box, { justifyContent:'space-evenly'}] }>
                  {/* <View style = {{ flexDirection:'row', justifyContent:'center', alignItems:'center'}}> */}
                      <TextInput
                        style={ [style.boxLine1, { backgroundColor:theme.ui.inputBox, opacity:0.7, textAlign:'center', padding:10}] }
                        placeholder="Enter New Password"
                        placeholderTextColor={[theme.ui.input]}
                        onChangeText={handleChange('new_pw')}
                        value = {values.new_pw}
                        // defaultValue={''}
                        autoCapitalize = "none"
                        autoCorrect={false}
                        onBlur={() => setFieldTouched('new_pw')}
                        textContentType="newPassword"
                        secureTextEntry={passwordVisibility}
                        enablesReturnKeyAutomatically
                      />
                      <Pressable onPress={handlePasswordVisibility} style = {{position:'absolute', alignSelf:'flex-end', paddingRight:40, paddingTop:8}}>
                        <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
                      </Pressable>
                    {/* </View> */}
                    {touched.new_pw && errors.new_pw && (
                  <Text style = {{color: 'red', padding: 2, textAlign:'center'}}>{errors.new_pw}</Text>
                    )}

                    <TextInput
                      style={ [style.boxLine1, { backgroundColor:theme.ui.inputBox, opacity:0.7, textAlign:'center'}] }
                      placeholder="Confirm New Password"
                      placeholderTextColor={[theme.ui.input]}
                      onChangeText={handleChange('re_new_pw')}
                      // defaultValue={''}
                      value = {values.re_new_pw}  
                      autoCapitalize = "none"
                      autoCorrect={false}
                      onBlur={() => setFieldTouched('re_new_pw')}

                      textContentType="newPassword"
                      secureTextEntry={passwordVisibility}
                      enablesReturnKeyAutomatically
                    />
                    {touched.re_new_pw && errors.re_new_pw && (
                  <Text style = {{color: 'red', padding: 2, textAlign:'center', justifyContent:'flex-start'}} >{errors.re_new_pw}</Text>
                  )}

                    <View style={{ flexDirection: 'row', justifyContent:'space-evenly' }}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={[
                          style.confirmButton,
                          { backgroundColor: isValid? theme.ui.primary:'#FFFFFF', justifyContent:'space-evenly', alignItems:'center'},
                        ]}
                        disabled = {!isValid}>
                        <Text style = {{  color: theme.textColor}}>Confirm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('SettingsOption')}
                        // style = {{marginTop:80, marginRight:20}}
                        >
                        <Text style = {{color: theme.textColor, marginTop:5}}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  </KeyboardAwareScrollView>
                </View>
              </Modal>
            </KeyboardAwareScrollView>
          </View>
        
      )
      }
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
