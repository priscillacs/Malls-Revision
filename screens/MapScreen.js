import { useState, useLayoutEffect, useEffect } from "react";
import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { getDistance } from "geolib";
// import { useRef } from 'react'; // For google map camera
// import app from '../../app.config.js';
import newdata from "../data/database.json";
import DoneButton from "../components/DoneButton";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeProvider";
export const MapScreen = ({ route }) => {
  const { theme } = useTheme();

  const navigation = useNavigation();
  const api_key = Constants.manifest.extra.apiKeyGoogle;
  const resultMall = route.params.resultMall;
  const resultStores = route.params.resultStores;
  const origin = route.params.origin;
  const destination = route.params.destination;

  const rlat =
    Math.round(((origin.latitude + destination.latitude) / 2) * 1000) / 1000;
  const rlng =
    Math.round(((origin.longitude + destination.longitude) / 2) * 1000) / 1000;

  const distance = getDistance(
    { latitude: origin.latitude, longitude: origin.longitude },
    { latitude: destination.latitude, longitude: destination.longitude }
  );
  const LATITUDE_DELTA = distance / 111000;
  const LONGITUDE_DELTA = LATITUDE_DELTA * (9 / 16) * 2;

  const region = {
    latitude: rlat, //location.latitude
    longitude: rlng, //location.longitude
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  // // For Done button to navigate to Result Screen
  function headerButtonPressHandler() {
    navigation.navigate("Result", {
      resultMall: resultMall,
      resultStores: resultStores,
    });
  }

  return (
    <View style={[styles.container]}>
      <View style={[styles.header, { backgroundColor: theme.background }]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            style={{ color: theme.text.primary }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={headerButtonPressHandler}
        >
          <MaterialIcons
            name="done-outline"
            size={24}
            style={{ color: theme.text.primary }}
          />
          <Text style={[styles.buttonText, { color: theme.text.primary }]}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={region}
        provider={PROVIDER_GOOGLE}
      >
        <Marker title="Origin" coordinate={origin} identifier="origin" />
        <Marker
          title="Destination"
          coordinate={destination}
          identifier="destination"
        />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={api_key}
          strokeWidth={6}
          strokeColor={"purple"}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 5,
  },
  map: {
    flex: 1,
  },
});
