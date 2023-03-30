import { useState, useLayoutEffect, useEffect } from "react";
import { Button, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import MapViewDirections from "react-native-maps-directions";
// import { useRef } from 'react'; // For google map camera
// import app from '../../app.config.js';
import newdata from "../data/database.json";
import DoneButton from "../components/DoneButton";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

function findMallIndex(resultMall) {
  var i;
  for (i = 0; i < newdata.Malls.length; i++) {
    if (newdata.Malls[i].mallId === resultMall) break;
  }
  return i;
}

export const MapScreen = ({ route }) => {
  const [currentLocation, setCurrentLocation] = useState({});
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const api_key = Constants.manifest.extra.apiKeyGoogle;
  const choice = route.params.choice;
  const resultMall = route.params.resultMall;
  const resultStores = route.params.resultStores;

  const region = {
    latitude: 1.35, //location.latitude
    longitude: 103.68, //location.longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // const mapRef = useRef(null);

  // For verifying user permission on location
  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }

    return true;
  }

  // For locating user location
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync(); // original is const location
    console.log("Over here the location that the system gets is: ", location);
    console.log("Latitude: ", location.coords.latitude);
    console.log("Longitude", location.coords.longitude);
    setCurrentLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  // Call getLocationHandler() after the component has mounted
  useEffect(() => {
    getLocationHandler();
  }, []);

  console.log("What is the currentLocation? : ", currentLocation);
  const sample_location = { latitude: 1.2966426, longitude: 103.7763939 };
  // const origin = currentLocation ? {latitude: currentLocation.lat, longitude: currentLocation.lng} : sample_location;
  const origin = sample_location;
  console.log("Origin point is: " + origin.latitude + ", " + origin.longitude);
  var destination = { latitude: 1.3397443, longitude: 103.7067297 };
  const mallIndex = findMallIndex(resultMall);
  if (choice === "mall") {
    destination = newdata.Malls[mallIndex].mallDetails.Location;
  } else {
    destination = newdata.Malls[mallIndex].mallDetails.nearestCarparkLocation;
  }

  // For Done button to navigate to Result Screen
  function headerButtonPressHandler() {
    navigation.navigate("ResultScreen", {
      resultMall: resultMall,
      resultStores: resultStores,
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DoneButton
          name="done-outline"
          size={24}
          color="black"
          onPress={headerButtonPressHandler}
        />
      ),
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region} // need to adjust camera angle
      provider={PROVIDER_GOOGLE}
      onMapReady={getLocationHandler}
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
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
