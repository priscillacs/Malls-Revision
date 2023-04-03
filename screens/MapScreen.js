import { useState, useLayoutEffect, useEffect } from "react";
import { Button, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
  // const [locationPermissionInformation, requestPermission] =
  //   useForegroundPermissions();
  const navigation = useNavigation();
  const api_key = Constants.manifest.extra.apiKeyGoogle;
  const choice = route.params.choice;
  const resultMall = route.params.resultMall;
  const resultStores = route.params.resultStores;

  const region = {
    latitude: 1.318, //location.latitude
    longitude: 103.72, //location.longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0221,
  };

  // const mapRef = useRef(null);

  // For verifying user permission on location
  // async function verifyPermissions() {
  //   if (
  //     locationPermissionInformation.status === PermissionStatus.UNDETERMINED
  //   ) {
  //     const permissionResponse = await requestPermission();

  //     return permissionResponse.granted;
  //   }

  //   if (locationPermissionInformation.status === PermissionStatus.DENIED) {
  //     Alert.alert(
  //       "Insufficient Permissions!",
  //       "You need to grant location permissions to use this app."
  //     );
  //     return false;
  //   }

  //   return true;
  // }

  // For locating user location
  // async function getLocationHandler() {
  //   // const hasPermission = await verifyPermissions();

  //   // if (!hasPermission) {
  //   //   return;
  //   // }

  //   const location = await getCurrentPositionAsync(); // original is const location
  //   console.log("Over here the location that the system gets is: ", location);
  //   console.log("Latitude: ", location.coords.latitude);
  //   console.log("Longitude", location.coords.longitude);
  //   setCurrentLocation({
  //     lat: location.coords.latitude,
  //     lng: location.coords.longitude,
  //   });
  // }

  // Call getLocationHandler() after the component has mounted
  // useEffect(() => {
  //   getLocationHandler();
  // }, []);

  // console.log("What is the currentLocation? : ", currentLocation);
  // const sample_location = { latitude: 1.2966426, longitude: 103.7763939 };
  // // const origin = currentLocation
  // //   ? { latitude: currentLocation.lat, longitude: currentLocation.lng }
  // //   : sample_location;
  // const origin = sample_location;
  // console.log("Origin point is: " + origin.latitude + ", " + origin.longitude);
  // var destination = { latitude: 1.3397443, longitude: 103.7067297 };
  // const mallIndex = findMallIndex(resultMall);
  // if (choice === "mall") {
  //   destination = newdata.Malls[mallIndex].mallDetails.Location;
  // } else {
  //   destination = newdata.Malls[mallIndex].mallDetails.nearestCarparkLocation;
  // }

  // // For Done button to navigate to Result Screen
  function headerButtonPressHandler() {
    navigation.navigate("Result", {
      resultMall: resultMall,
      resultStores: resultStores,
    });
  }

  // return (
  //   <MapView
  //     style={styles.map}
  //     initialRegion={region} // need to adjust camera angle
  //     provider={PROVIDER_GOOGLE}
  //     onMapReady={getLocationHandler}
  //   >
  //     <Marker title="Origin" coordinate={origin} identifier="origin" />
  //     <Marker
  //       title="Destination"
  //       coordinate={destination}
  //       identifier="destination"
  //     />
  //     <MapViewDirections
  //       origin={origin}
  //       destination={destination}
  //       apikey={api_key}
  //       strokeWidth={6}
  //       strokeColor={"purple"}
  //     />
  //   </MapView>
  // );

  var origin = { latitude: 1.2966426, longitude: 103.7763939 };
  var destination = { latitude: 1.3397443, longitude: 103.7067297 };

  // const [markers, setMarkers] = useState([]);

  // useEffect(() => {
  //   // fetch marker data from newdata and add them to the markers array
  //   const origin = { latitude: 1.2966426, longitude: 103.7763939 };
  //   const destination = { latitude: 1.3397443, longitude: 103.7067297 };
  //   const newMarkers = [origin, destination];
  //   setMarkers(newMarkers);
  // }, []);

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.back}>
  //       <View style={styles.buttonsContainer}>
  //         <TouchableOpacity
  //           onPress={() => navigation.goBack()}
  //           style={styles.backButton}
  //         >
  //           <MaterialIcons name="arrow-back" size={24} color="black" />
  //           <Text style={styles.backText}> Back </Text>
  //         </TouchableOpacity>

  //         <TouchableOpacity
  //           onPress={() => navigation.goBack()}
  //           style={styles.doneButton}
  //         >
  //           <MaterialIcons name="done-outline" size={24} color="black" />
  //           <Text style={styles.backText}> Done </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //     <MapView
  //       style={styles.map}
  //       initialRegion={region}
  //       onLongPress={headerButtonPressHandler}
  //     >
  //       <Marker title="Origin" coordinate={origin} identifier="origin" />
  //       <Marker
  //         title="Destination"
  //         coordinate={destination}
  //         identifier="destination"
  //       />
  //       <MapViewDirections
  //         origin={origin}
  //         destination={destination}
  //         apikey={api_key}
  //         strokeWidth={6}
  //         strokeColor={"purple"}
  //       />
  //     </MapView>
  //   </View>
  // );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
          <Text style={styles.buttonText}>Left</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={headerButtonPressHandler}
        >
          <MaterialIcons name="done-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Right</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  button: {
    marginTop: 10,
    flexDirection: "row",
    padding: 16,
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
