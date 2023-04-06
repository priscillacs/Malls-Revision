import { update } from "firebase/database";
import React, { useContext, useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
} from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
// import UpdatePassword from "./UpdatePasswordScreen";

export const SettingsScreen = ({ navigation }) => {
  // to use hook
  const { theme, updateTheme } = useTheme();
  const changeTheme = () => updateTheme(theme.themeMode);
  const [modalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text.primary }]}>
        Settings
      </Text>
      <View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.ui.tertiary }]}
          onPress={changeTheme}
        >
          <Text style={[styles.text, { color: theme.text.secondary }]}>
            Change Theme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.ui.tertiary }]}
          onPress={() => navigation.navigate("UpdatePassword")}
        >
          <Text style={[styles.text, { color: theme.text.secondary }]}>
            Update Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.ui.tertiary }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.text, { color: theme.text.secondary }]}>
            Log Out
          </Text>
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
          <View
            style={[styles.modal, { backgroundColor: theme.ui.quaternary }]}
          >
            <Text style={[styles.text, { color: theme.text.secondary }]}>
              Are you sure?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={handleLogout}
              >
                <Text style={[styles.text, { color: theme.text.error }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.text, { color: theme.text.secondary }]}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
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
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    padding: 90,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
  },
  button: {
    padding: 20,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    margin: 15,
  },
  modal: {
    borderRadius: 25,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "62%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  modalButton: {
    flex: 1,
    paddingHorizontal: 10,
    margin: 8,
    marginTop: 12,
  },
});
