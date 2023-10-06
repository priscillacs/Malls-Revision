import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { Picker } from "@react-native-picker/picker";
import { TouchableHighlight } from "react-native-gesture-handler";
import { setGlobalState, useGlobalState } from "../hooks/Global";
import { Ionicons } from "@expo/vector-icons";
import storeData from "../data/stores.json";
import mallData from "../data/database.json";
import { useTheme } from "../contexts/ThemeProvider";
import * as Location from 'expo-location';

export const HomeScreen = () => {
  const [categorisedData, setCategorisedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [cart] = useGlobalState("cart");
  const [origin] = useGlobalState("origin");
  const { theme } = useTheme();
  useEffect(() => {
    getStores();
    return () => {};
  }, []);


  //For Get Location
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Over here the location that the system gets is: ", location);
    console.log("Latitude: ", location.coords.latitude);
    console.log("Longitude", location.coords.longitude);
    setGlobalState("origin", { latitude: location.coords.latitude, longitude: location.coords.longitude });
  };

  const getStores = () => {
    setCategorisedData(storeData);
    setFilteredData(storeData);
    setMasterData(storeData);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = categorisedData.filter((item) => {
        const itemData = item.storeName
          ? item.storeName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(categorisedData);
    }
    setTerm(text);
  };

  const sortCategory = (value) => {
    if (value == "All") {
      setCategorisedData(masterData);
      setFilteredData(masterData);
    } else {
      const newData = masterData.filter((item) => {
        var match = false;
        item.storeDetails.category.filter((type) => {
          if (type == value) match = true;
        });
        if (match == true) return true;
      });
      setCategorisedData(newData);
      setFilteredData(newData);
    }
    setCategory(value);
  };

  const ItemView = ({ item }) => {
    return (
      <View style={styles.store}>
        <TouchableHighlight
          onPress={() => {
            cart.indexOf(item) < 0
              ? setGlobalState("cart", [...cart, item])
              : null;
            getLocation();
          }}
        >
          <ImageBackground
            style={styles.image}
            source={{ uri: `${item.storeDetails.image}` }}
          >
            {cart.indexOf(item) > -1 ? (
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Ionicons name="checkmark-circle" size={24} color="#7fb4ac" />
              </View>
            ) : null}
          </ImageBackground>
        </TouchableHighlight>
        <Text style={[styles.text, { color: theme.textColor }]}>
          {item.storeName.toUpperCase()}
        </Text>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={{ height: 0 }} />;
  };
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 50 }}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.mallImage}
            source={require("../assets/mall.jpg")}
          />
          <Text style={[styles.imageText]}>Where do you want to go?</Text>
          <View style={styles.searchContainer}>
            <SearchBar
              term={term}
              onTermChange={(term) => searchFilter(term)}
            />
          </View>
        </View>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => sortCategory(itemValue)}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="All Categories" value="All" />
          <Picker.Item
            label="Amusement/Entertainment"
            value="Amusement/Entertainment"
          />
          <Picker.Item label="Arts & Crafts" value="Arts & Crafts" />
          <Picker.Item
            label="Bank & Money Changer"
            value="Bank & Money Changer"
          />
          <Picker.Item label="Books & Stationery" value="Books & Stationery" />
          <Picker.Item
            label="Children's Wear, Toys & Maternity"
            value="Children's Wear, Toys & Maternity"
          />
          <Picker.Item label="Department Stores" value="Department Stores" />
          <Picker.Item
            label="Electrical, Electronic, Camera & Telecommunication"
            value="Electrical, Electronic, Camera & Telecommunication"
          />
          <Picker.Item
            label="Fashion Wear & Accessories"
            value="Fashion Wear & Accessories"
          />
          <Picker.Item label="Food & Restaurants" value="Food & Restaurants" />
          <Picker.Item
            label="Furniture, Furnishings and Household"
            value="Furniture, Furnishings and Household"
          />
          <Picker.Item label="Gifts" value="Gifts" />
          <Picker.Item label="Hair & Beauty" value="Hair & Beauty" />
          <Picker.Item
            label="Jewellery & Watches"
            value="Jewellery & Watches"
          />
          <Picker.Item
            label="Leather Goods, Bags & Shoes"
            value="Leather Goods, Bags & Shoes"
          />
          <Picker.Item
            label="Music & Audio Visual"
            value="Music & Audio Visual"
          />
          <Picker.Item label="Optical" value="Optical" />
          <Picker.Item
            label="Pharmacy & Healthcare"
            value="Pharmacy & Healthcare"
          />
          <Picker.Item label="Schools & Offices" value="Schools & Offices" />
          <Picker.Item label="Services" value="Services" />
          <Picker.Item label="Sports & Leisure" value="Sports & Leisure" />
          <Picker.Item label="Supermarket" value="Supermarket" />
          <Picker.Item
            label="Toys & Collectibles"
            value="Toys & Collectibles"
          />
        </Picker>
        <FlatList
          data={filteredData}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
  },
  store: {
    marginTop: 10,
    flex: 1 / 3,
    alignItems: "center",
    paddingBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  picker: {
    backgroundColor: "#d9d9d9",
    marginLeft: 20,
    marginTop: 40,
    // marginRight: 170,
    width: "50%",
    height: 30,
    // borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    paddingTop: 30,
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    position: "relative",
    marginTop: 10,
  },
  mallImage: {
    width: 400,
    height: 250,
    borderRadius: 10,
  },
  imageText: {
    position: "absolute",
    top: "60%",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    zIndex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: "80%",
    width: "100%",
    paddingHorizontal: 15,
    zIndex: 2,
  },
});
