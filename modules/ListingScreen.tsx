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

type ItemCardTypes = {
  item: {
    name: string;
    image: ImageSourcePropType;
    distance: string;
    tagColor: string;
    university: string;
    address: string;
    pickup: string;
    bought: string;
    expires: string;
    seller: string;
  };
};

const ListingCard = ({ item }: ItemCardTypes) => {
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
  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <ListingCard item={route.params.item} />
      </View>
      <View style={styles.buttonbody}>
        <Button
          title="Request"
          onPress={() =>
            Alert.alert(
              "Request success!",
              "You will be notified when " +
                route.params.item.seller +
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
      </View>
    </>
  );
};

export default ListingScreen;
