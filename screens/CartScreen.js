import React from "react";
import { Text, StyleSheet, View, Image, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FlatList } from "react-native";
import { setGlobalState, useGlobalState } from "../hooks/Global";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { useTheme } from "../contexts/ThemeProvider";
export const CartScreen = () => {
  const [cart] = useGlobalState("cart");
  // const { theme } = useTheme();
  const navigation = useNavigation();
  const mallrec = () => {
    navigation.navigate("MallRecommendation");
  };
  const ItemView = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `${item.storeDetails.image}` }}
        />
        <View style={{ flex: 1, flexDirection: "row", alignSelf: "center" }}>
          <Text style={styles.text}>{item.storeName}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            cart.splice(cart.indexOf(item), 1);
            const filteredCart = [...cart];
            setGlobalState("cart", filteredCart);
          }}
        >
          <Entypo
            style={{ marginTop: 20, marginRight: 10 }}
            name="circle-with-cross"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Results</Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.titleMatch}>Best Matches:</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setGlobalState("cart", []);
          }}
        >
          <Text
            style={{
              textAlign: "center",
              margin: 10,
              fontSize: 18,
              color: "#588D85",
              textDecorationLine: "underline",
            }}
          >
            Clear Cart
          </Text>
        </TouchableOpacity>
      </View>

      {Object.keys(cart).length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ItemView}
          />
          {/* <TouchableOpacity
            style={styles.go}
            onPress={() => {
              navigation.navigate("MallRecommendation", {
                storesToVisit: cart.map(({ storeName }) => storeName),
                console.log(storesToVisit)
              });
            }}
          > */}
          <TouchableOpacity
            style={styles.go}
            onPress={() => {
              const storesToVisit = cart.map(({ storeName }) => storeName);
              console.log(storesToVisit);
              navigation.navigate("MallRecommendation", { storesToVisit });
            }}
          >
            <Text
              style={{
                margin: 10,
                fontSize: 16,
                alignSelf: "center",
                color: "white",
              }}
            >
              Go!
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ fontSize: 16, alignSelf: "center", marginTop: 200 }}>
          Store Cart is Empty!!
        </Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#7fb4ac",
    justifyContent: "space-between",
    borderRadius: 150 / 2,
    margin: 5,
  },
  image: {
    alignSelf: "flex-start",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    margin: 5,
  },
  text: {
    fontSize: 16,
    borderRadius: 50,
    margin: 5,
  },

  go: {
    alignSelf: "center",
    backgroundColor: "#436661",
    height: 40,
    width: 100,
    borderRadius: 40 / 2,
    marginTop: 5,
    marginBottom: 100,
    // padding: 50,
  },
  header: {
    flexDirection: "row",
    padding: 10,
  },
  subHeader: {
    flexDirection: "row",
    padding: 10,
  },
  titleText: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#436661",
  },
  titleMatch: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#436661",
    marginLeft: 10,
    marginTop: 10,
  },
});
