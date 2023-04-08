import { update } from "firebase/database";
import React, { useContext, useState } from "react";
import { Button, StyleSheet, Text, View, Switch, TouchableOpacity, Modal, Image } from "react-native";
import { Button, StyleSheet, Text, View, Switch, TouchableOpacity, Modal, Image, Pressable } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import { signOut } from "firebase/auth";
import { EmailAuthProvider, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useTogglePasswordVisibility } from "../hooks/useTogglePasswordVisibility";
import { MaterialCommunityIcons } from '@expo/vector-icons';



//logo
import {Ionicons} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Formik } from "formik";
import { TextInput } from "react-native-paper";

// import UpdatePassword from "./UpdatePasswordScreen";

export const SettingsScreen = ({ navigation }) => {
  // to use hook
  const { theme, updateTheme } = useTheme();

  const [text, setText] = useState("");
  const changeTheme = () => updateTheme(theme.themeMode);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDAVisible, setModalDAVisible] = useState(false);
  const handleDA = () => {
    const cred = EmailAuthProvider.credential(auth.currentUser.email, text);
    reauthenticateWithCredential(auth.currentUser, cred)
      .then(() => {
        auth.currentUser.delete;
      })
      .catch((error) => {
        Alert.alert("Wrong Password.");
      });
  };
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  // const [isEnabled, setIsEnabled] = useState(
  //   theme === "default" ? false : true
  // );

  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };


  return (
    <View style={[styles.container, { backgroundColor: theme.background}]}>
      <View style = {{flexDirection:'row', alignItems:'center'}}>
        <Ionicons name="settings-sharp" size={50} color={theme.text.primary} style = {{marginRight:10, marginTop:40}} />
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name="settings-sharp" size={50} color={theme.text.primary} style={{ marginRight: 10, marginTop: 40 }} />
        <Text style={[styles.title, { color: theme.text.primary }]}>Settings</Text>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.ui.tertiary, flexDirection:'row', justifyContent:'center', alignItems:'center'  }]}
          style={[styles.button, { backgroundColor: theme.ui.tertiary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
          onPress={changeTheme}>
          <Ionicons name="color-palette" size={30} color={theme.quaternary} style = {{flexDirection: 'column', alignSelf:'flex-start', marginRight:40}} />
          <Ionicons name="color-palette" size={30} color={theme.quaternary} style={{ flexDirection: 'column', alignSelf: 'flex-start', marginRight: 40 }} />
          <Text style={[styles.text, { color: theme.text.secondary }]}>Change Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.ui.tertiary, flexDirection:'row', justifyContent:'center', alignItems:'center' }]}
          style={[styles.button, { backgroundColor: theme.ui.tertiary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
          onPress={() => navigation.navigate('UpdatePassword')}>
          <Ionicons name="md-key" size={30} color={theme.quaternary} style = {{flexDirection: 'column', alignSelf:'flex-start', marginRight:30}}/>
          <Ionicons name="md-key" size={30} color={theme.quaternary} style={{ flexDirection: 'column', alignSelf: 'flex-start', marginRight: 30 }} />
          <Text style={[styles.text, { color: theme.text.secondary }]}>Update Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.ui.quaternary, flexDirection:'row', justifyContent:'center', alignItems:'center' }]}
          style={[styles.button, { backgroundColor: theme.ui.quaternary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
          onPress={() => setModalVisible(true)}>
          {/* <Image source={require('../assets/images/settings_ThemeKey.png')} style = {{flexDirection: 'column', alignSelf:'flex-start'}}/>  */}
          <Text style={[styles.text, { color: theme.text.secondary }]}>Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.ui.quaternary, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }]}
          onPress={() => setModalDAVisible(true)}>
          {/* <Image source={require('../assets/images/settings_ThemeKey.png')} style = {{flexDirection: 'column', alignSelf:'flex-start'}}/>  */}
          <Text style={[styles.text, { color: theme.text.error }]}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[styles.modalContainer]}>
          <View style={[styles.modal, { backgroundColor: theme.ui.quaternary }]}>
            <Text style={[styles.text, { color: theme.text.secondary }]}>Are you sure?</Text>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={handleLogout}>
                <Text style={[styles.text, { color: theme.text.error }]}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={[styles.text, { color: theme.text.secondary }]}>Close</Text>
              </TouchableOpacity>

              
            </View>
          </View>
        </View>
      </Modal>
    </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalDAVisible}
        onRequestClose={() => {
          setModalDAVisible(false);
        }}
      >
        <View style={[styles.modalContainer]}>
          <View style={[styles.modal, { backgroundColor: theme.ui.quaternary }]}>
            <Text style={[styles.text, { color: theme.text.secondary, padding: 3 }]}>Enter Password</Text>
            <View>
              <TextInput  
                style= {{backgroundColor: theme.ui.inputBox, height: 40, borderRadius: 10, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                placeholder="Enter Current Password"
                placeholderTextColor={theme.ui.input}
                onChangeText={newText => setText(newText)}
                value={text}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="newPassword"
                secureTextEntry={passwordVisibility}
                enablesReturnKeyAutomatically
              />
              <Pressable onPress={handlePasswordVisibility} style={{ position: 'absolute', alignSelf: 'flex-end', paddingRight: 6, paddingTop: 10 }}>
                <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={handleDA}>
                <Text style={[styles.text, { color: theme.text.error }]}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => setModalDAVisible(false)}>
                <Text style={[styles.text, { color: theme.text.secondary }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: 90,
    paddingBottom: 50
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    alignContent: 'center'
  },
  button: {
    padding: 20,
    paddingHorizontal: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    margin: 15,
  },
  modal: {
    borderRadius: 25,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '62%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  modalButton: {
    flex: 1,
    paddingHorizontal: 10,
    margin: 8,
    marginTop: 12,
  }
});
