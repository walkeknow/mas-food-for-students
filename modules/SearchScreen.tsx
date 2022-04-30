import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  get, getDatabase,
  ref as dRef
} from "firebase/database";
import { getDownloadURL, getStorage, ref as sRef } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable, Text,
  TextInput, TouchableOpacity, View
} from "react-native";
import app from "../lib/db";
import { ItemCardTypes } from "../utils/types";
import styles from "./styles/SearchScreenStyles";

const ItemCard = ({ item }: ItemCardTypes) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <View style={styles.cardDescription}>
        <View style={styles.cardTopRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemName}>{item.distance}</Text>
        </View>
        <View style={styles.tagContainer}>
          <View style={[styles.tag, { backgroundColor: item.tagColor }]}>
            <Text style={styles.tagText}>{item.university}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SearchScreen = ({ navigation }: any) => {
  const [list, setFilteredList] = useState<Array<ItemCardTypes["item"]>>([]);
  const [mlist, setMasterList] = useState<Array<ItemCardTypes["item"]>>([]);

  const db = getDatabase(app);
  const reference_d = dRef(db, "food_listings/");

  const stor = getStorage(app, "gs://mas-food-for-s.appspot.com");

  async function getListings() {
    const snapshot = await get(reference_d);
    var item_arr: Array<ItemCardTypes["item"]> = [];

    if (snapshot) {
      snapshot.forEach(function (child) {
        item_arr.push(child.val());
      });

      item_arr.forEach(async function (item, index) {
        const ref_string = "id_" + item.id + "_image";
        const reference_s = sRef(stor, ref_string);

        try {
          item_arr[index].image = await getDownloadURL(reference_s);
        } catch (e) {
          const reference_ni = sRef(stor, "no_image")
          item_arr[index].image = await getDownloadURL(reference_ni);
        }

        const ref_string_un = "users_real/" + item.seller_id + "/name/";
        const reference_un = dRef(db, ref_string_un);
        const snapshot = await get(reference_un);

        item_arr[index].seller = snapshot.val();

        if (item_arr[index].image && snapshot) {
          setFilteredList((list) => {
            const tempList = [...list]
            tempList.push(item_arr[index]);
            tempList.sort((a, b) => (a.distance > b.distance ? 1 : -1));
            console.log(tempList)
            return tempList;
          });
          setMasterList((list) => {
            const tempList = [...list]
            tempList.push(item_arr[index]);
            tempList.sort((a, b) => (a.distance > b.distance ? 1 : -1));
            console.log(tempList)
            return tempList;
          });
        } else {
        }
      });
    } else {
    }
  }

  useEffect(() => {
    getListings();
  }, []);

  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <View style={styles.row}>
          <TextInput
            onChangeText={(text) => {
              setFilteredList(() => {
                const tempList = mlist.filter((item) =>
                  item.name.includes(text) || item.university.includes(text)
                );
                return tempList;
              });
            }}
            placeholder="Search"
            style={styles.searchBar}
          />
          <Pressable>
            <MaterialIcons name="search" size={18} />
          </Pressable>
        </View>
        <FlatList
          columnWrapperStyle={{ justifyContent: "space-between" }}
          contentContainerStyle={styles.flatlist}
          data={list}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.push("Listing", { item: item })}
            >
              <ItemCard item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default SearchScreen;
