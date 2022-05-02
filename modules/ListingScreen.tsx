import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Button,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import styles from "./styles/ListingScreenStyles";
import { ItemCardTypes } from "../utils/types";
import AppButton from "../components/AppButton";
import { useAppSelector } from "../redux/hooks";
import { get, getDatabase, ref, set } from "firebase/database";
import app from "../lib/db";

const ListingCard = ({ item }: ItemCardTypes) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
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
  const item = route.params.item;
  const refresh = route.params.refresh;

  const { uid } = useAppSelector(
    (store) => store.uid
  );

  const db = getDatabase(app)
  const reference_u = ref(db, "users_real/" + uid)
  const reference_r = ref(db, "requests/received/" + item.seller_id + "/id_" + item.id + "/" + uid)
  const reference_s = ref(db, "requests/sent/" + uid + "/pending/" + item.seller_id + "/id_" + item.id)

  async function handleRequest() {
    const snapshot = await get(reference_u);
    const data = snapshot.val();

    set(reference_r, {
      requester: data.name,
      requester_id: uid,
      email: data.email,
      item_info: item,
    })

    const reference_seller = ref(db, "users_real/" + item.seller_id)
    const snapshot_seller = await get(reference_seller)
    const data_seller = snapshot_seller.val()

    set(reference_s, {
      state: "Pending",
      email: data_seller.email,
      item_info: item,
    })

    Alert.alert(
      "Request success!",
      "You will be notified when " + item.seller + " approves!",
      [
        {
          text: "Return Home",
          onPress: async () => {
            await refresh()
            navigation.navigate("Tabs", { screen: "Search" });
          },
          style: "cancel",
        },
        { 
          text: "OK", 
          onPress: async () => {
            await refresh()
          },
        },
      ]
    )
  }

  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <ListingCard item={item} />
        <AppButton
          style={styles.button}
          disabled={uid === (item.seller_id + 1)}
          onPress={async () => await handleRequest()}
        >
          Request
        </AppButton>
      </View>
    </>
  );
};

export default ListingScreen;
