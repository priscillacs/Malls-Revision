import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import style from "../css/UpdatePassword.css";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase";
import firebase from "firebase/app";
import "firebase/auth";

export const UpdatePasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [text, setText] = useState('');
  const [cfmText, setCfmText] = useState('')
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

  const handleNPPress = () => {
    if (text === cfmText) {
      updatePassword(auth.currentUser, cfmText)
      .catch(error => {
        Alert.alert('Password Too Short')
      })
    } else {
      Alert.alert('Password Did Not Match. Try Again.')
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>Update Password</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Enter Current Password"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
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
            onChangeText={newText => setText(newText)}
            defaultValue={''}
          />
          <TextInput
            style={{ height: 40 }}
            placeholder="Confirm New Password"
            onChangeText={newText => setCfmText(newText)}
            defaultValue={''}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={handleNPPress}>
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
