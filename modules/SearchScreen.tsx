import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles/SearchScreenStyles";
import DummyLists from "../utils/DummyLists";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { ItemCardTypes } from "../utils/types"
import app from "../lib/db"
import { getDatabase, ref as dRef, get, onValue, DataSnapshot } from 'firebase/database';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { FAB } from 'react-native-elements';

const ItemCard = ({ item }: ItemCardTypes) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{uri: item.image}} />
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

  const db = getDatabase(app)
  const reference_d = dRef(db, 'food_listings/');

  const stor = getStorage(app, "gs://mas-food-for-s.appspot.com")

  async function getListings() {
    const snapshot = await get(reference_d)
    var item_arr : Array<ItemCardTypes["item"]> = []
    snapshot.forEach(function(child) {
      item_arr.push(child.val())
    })

    item_arr.forEach(async function(item, index) {
      const ref_string = "id_" + item.id + "_image"
      const reference_s = sRef(stor, ref_string)

      item_arr[index].image = await getDownloadURL(reference_s)

      const ref_string_un = "users_real/" + item.seller_id + "/name/"
      const reference_un = dRef(db, ref_string_un)
      const snapshot = await get(reference_un)

      item_arr[index].seller = snapshot.val()
    })

    item_arr.sort((a, b) => a.distance > b.distance ? 1 : -1)

    setFilteredList(item_arr)
    setMasterList(item_arr)
  }

  useEffect(() => {
    getListings()
  }, [])

  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <View style={styles.row}>
          <TextInput
            onChangeText={(text) => {
              setFilteredList(() => {
                const tempList = mlist.filter((item) =>
                  item.name.includes(text)
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
