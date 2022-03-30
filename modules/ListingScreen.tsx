import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React from "react";
import styles from "./styles/ListingScreenStyles";
import DummyLists from "../utils/DummyLists";
import { StatusBar } from "expo-status-bar";
import Images from "../assets/placeholder";
import { MaterialIcons } from "@expo/vector-icons";

const ListingCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={item.image} />
      <View style={styles.cardDescription}>
        <View style={styles.cardTopName}>
          <Text style={styles.itemTopName}>{item.name}</Text>
        </View>
        <View style={styles.cardTopRow}>
          <Text style={styles.itemName}>Bought: {item.bought}</Text>
          <Text style={styles.itemName}>Expires: {item.expires}</Text>
        </View>
      </View>
      <View style={styles.listingDescription}>
        <Text>
          <Text style={[styles.itemNameBlack,{fontWeight: "bold"}]}>Seller: </Text>
          <Text style={styles.itemNameBlack}>{item.seller}</Text>
        </Text>
        <Text>
          <Text style={[styles.itemNameBlack,{fontWeight: "bold"}]}>Address: </Text>
          <Text style={styles.itemNameBlack}>{item.address}</Text>
        </Text>
        <Text>
          <Text style={[styles.itemNameBlack,{fontWeight: "bold"}]}>Available pickup times: </Text>
          <Text style={styles.itemNameBlack}>{item.pickup}</Text>
        </Text>
      </View>
    </View>
  );
};

const ListingScreen = ({ navigation, route }) => {
  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <ListingCard item={route.params.item} />
      </View>
      <Button title="Request" onPress={() => 
        Alert.alert('Request success!', 'You will be notified when ' + route.params.item.seller + ' approves!', [
          {
            text: 'Return Home',
            onPress: () => navigation.navigate("Root"),
            style: 'cancel'
          },
          { text: 'OK' }
        ])}></Button>
    </>
  );
};

export default ListingScreen;
