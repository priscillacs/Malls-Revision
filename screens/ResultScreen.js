import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../config/firebase";
import { ref, set, onValue } from "firebase/database";

import { useTheme } from "../contexts/ThemeProvider";
import newdata from "../data/database.json";

const StoreItem = ({ storeName, imageUrl, unitNumber, contact }) => (
  <View style={styles.storeItem}>
    <View style={styles.innerContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{storeName}</Text>
      <Text style={styles.title}>{unitNumber}</Text>
      <Text style={styles.title}>{contact}</Text>
    </View>
  </View>
);

function renderStoreItem({ item }) {
  return (
    <StoreItem
      storeName={item.storeName}
      imageUrl={item.imageStore}
      unitNumber={item.unitNumber}
      contact={item.contact_number}
    />
  );
}

function findMallIndex(resultMall) {
  var i;
  for (i = 0; i < newdata.Malls.length; i++) {
    if (newdata.Malls[i].mallId === resultMall) break;
  }
  return i;
}

function findStoreIndex(resultStore, storesInMall) {
  var i;
  for (i = 0; i < storesInMall.length; i++) {
    if (storesInMall[i].storeName === resultStore) break;
  }
  return i;
}

function addNewHistoryData(data, mallImage, resultMall, resultStores) {
  const dummy1 = data.length;
  var today = new Date();
  var time =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0") +
    " " +
    today.getHours() +
    ":" +
    today.getMinutes() +
    ":" +
    today.getSeconds();

  console.log("Here the dummy1 length is: ", dummy1);
  set(ref(db, "historyData/" + dummy1), {
    date: time,
    mall: resultMall,
    photo: mallImage,
    stores: resultStores,
  });
  console.log("Here addNewHistory function is carried out.");
  return;
}

export function ResultScreen({ route }) {
  const navigation = useNavigation();
  const [buttonPressed, setButtonPressed] = useState(false);
  const resultMall = route.params.resultMall;
  const resultStores = route.params.resultStores;
  console.log("result mall: ", resultMall);
  console.log("result stores: ", resultStores);
  const [toDoData, setToDoData] = useState([]);

  useEffect(() => {
    const pastHistoryData = ref(db, "historyData");
    onValue(pastHistoryData, (snapshot) => {
      const result = snapshot.val();
      setToDoData(result);
    });
  }, []);

  console.log("The ToDoData here is: ", toDoData);

  const mallIndex = findMallIndex(resultMall);
  const mallImage = newdata.Malls[mallIndex].mallDetails.mallImage;
  const storesInMall = newdata.Malls[mallIndex].stores;

  var dummy = [];
  var storeIndex;
  for (let x = 0; x < resultStores.length; x++) {
    storeIndex = findStoreIndex(resultStores[x], storesInMall);
    dummy.push(storesInMall[storeIndex]);
  }
  const DATA = dummy;

  const { theme } = useTheme();
  function buttonPressHandler() {
    console.log("Button is pressed! First time");
    addNewHistoryData(toDoData, mallImage, resultMall, resultStores);
    navigation.navigate("Home");
  }

  const toggleIsSubmitted = () => {
    setButtonPressed((value) => !value);
  };

  useEffect(() => {
    if (buttonPressed === true) {
      buttonPressHandler();
    }
  }, [buttonPressed]);

  return (
    <>
      {/* <FlatList
          data={DATA}
          renderItem={renderStoreItem}
          // keyExtractor={(item) => item.id}
        />
        <View>
          <Button
            style={styles.button}
            title="DONE"
            onPress={toggleIsSubmitted}
          />
        </View> */}

      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              style={{ color: theme.text.primary }}
            />
          </TouchableOpacity>
          {/* <Text style={styles.headerText}>Back</Text> */}
        </View>
        <View style={styles.header}>
          <Text style={[styles.titleText, { color: theme.text.primary }]}>
            Matched Stores
          </Text>
        </View>
        <FlatList
          data={DATA}
          renderItem={renderStoreItem}
          // keyExtractor={(item) => item.id}
        />
        {/* <View>
          <Button
            style={styles.button}
            title="DONE"
            onPress={toggleIsSubmitted}
          />
        </View> */}

        <TouchableOpacity style={styles.button} onPress={toggleIsSubmitted}>
          <Text
            style={{
              margin: 10,
              fontSize: 16,
              alignSelf: "center",
              color: "white",
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

// export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingTop: 30,
    // marginLeft: 10,
  },
  back: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    marginLeft: 20,
    // padding: 10,
  },
  storeItem: {
    flex: 1,
    margin: 16,
    height: 200,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 10,
  },
  // header: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 10,
  //   paddingTop: 40,
  //   paddingBottom: 10,
  //   marginTop: 10,
  // },
  headerText: {
    fontSize: 20,
    // fontWeight: "bold",
    // fontWeight: "bold",
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: "100%",
    height: 100,
  },
  button: {
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    marginTop: 25,
    alignContent: "center",
    paddingLeft: 30,
    marginBottom: 8,
  },
  titleText: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#436661",
    height: 40,
    width: 250,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
