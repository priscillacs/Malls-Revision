import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeProvider";
import newdata from "../data/database.json";
import { setGlobalState, useGlobalState } from "../hooks/Global";

export function CarparkOrMallScreen({ route }) {
  const navigation = useNavigation();
  const resultMall = route.params.resultMall;
  const resultStores = route.params.resultStores;
  const [origin] = useGlobalState("origin");
  console.log("Origin at CarparkOrScreen is:", origin);
  const { theme } = useTheme();

  function findMallIndex(resultMall) {
    var i;
    for (i = 0; i < newdata.Malls.length; i++) {
      if (newdata.Malls[i].mallId === resultMall) break;
    }
    return i;
  }
  const mallIndex = findMallIndex(resultMall);

  function mallChoiceHandler() {
    console.log("Mall Clicked.");
    var destination = newdata.Malls[mallIndex].mallDetails.Location;
    navigation.navigate("Map", {
      resultMall: resultMall,
      resultStores: resultStores,
      origin: origin,
      destination: destination,
    });
  }

  function carparkChoiceHandler() {
    console.log("Carpark Clicked.");
    var destination = newdata.Malls[mallIndex].mallDetails.nearestCarparkLocation;
    navigation.navigate("Map", {
      resultMall: resultMall,
      resultStores: resultStores,
      origin: origin,
      destination: destination,
    });
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.back}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            style={{ color: theme.text.primary }}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image style={styles.mallImage} source={require("../assets/car.png")} />
      </View>
      <Text style={[styles.backText, { color: theme.text.primary }]}>
        {" "}
        Choose which destination you want to go:{" "}
      </Text>
      <View style={styles.carparkOrMallContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.ui.tertiary,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={carparkChoiceHandler}
        >
          <Text style={[styles.text, { color: theme.text.secondary }]}>
            Nearest Carpark
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: theme.ui.tertiary,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
          onPress={mallChoiceHandler}
        >
          <Text style={[styles.text, { color: theme.text.secondary }]}>
            Mall
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// export default CarparkOrMallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    paddingTop: 20,
    paddingBottom: 180,
  },
  text: {
    fontSize: 17,
    fontWeight: "bold",
    alignContent: "center",
  },
  optionContainer: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc", //purple
    color: "white", //text colour
  },
  back: {
    position: "absolute",
    top: 15,
    left: 5,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    fontSize: 18,
    marginLeft: 5,
    marginBottom: 20,
  },
  button: {
    padding: 20,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
    margin: 15,
  },
  mallImage: {
    marginTop: 200,
    width: 380,
    height: 180,
    borderRadius: 5,
    marginBottom: 10,
  },
});
