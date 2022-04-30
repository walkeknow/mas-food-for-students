import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Button,
  Image,
  ImageSourcePropType,
  Text,
  View
} from "react-native";
import styles from "./styles/ListingScreenStyles";
import { ItemCardTypes } from "../utils/types";

const ListingCard = ({ item }: ItemCardTypes) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{uri: item.image}} />
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
          <Text style={[styles.itemNameBlack, { fontWeight: "bold" }]}>
            Seller:{" "}
          </Text>
          <Text style={styles.itemNameBlack}>{item.seller}</Text>
        </Text>
        <Text>
          <Text style={[styles.itemNameBlack, { fontWeight: "bold" }]}>
            Address:{" "}
          </Text>
          <Text style={styles.itemNameBlack}>{item.address}</Text>
        </Text>
        <Text>
          <Text style={[styles.itemNameBlack, { fontWeight: "bold" }]}>
            Available pickup times:
          </Text>
          <Text style={styles.itemNameBlack}>{item.pickup}</Text>
        </Text>
      </View>
    </View>
  );
};

const ListingScreen = ({ navigation, route }: any) => {
  const item = route.params.item

  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <ListingCard item={item} />
      </View>
      <Button
        title="Request"
        onPress={() =>
          Alert.alert(
            "Request success!",
            "You will be notified when " +
              item.seller +
              " approves!",
            [
              {
                text: "Return Home",
                onPress: () => navigation.navigate("Root"),
                style: "cancel",
              },
              { text: "OK" },
            ]
          )
        }
      ></Button>
    </>
  );
};

export default ListingScreen;
