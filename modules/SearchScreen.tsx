import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { get, getDatabase, ref as dRef, set } from "firebase/database";
import { getDownloadURL, getStorage, ref as sRef } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import app from "../lib/db";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateListingsAction } from "../redux/slices/profileReducer";
import { ItemCardTypes } from "../utils/types";
import styles from "./styles/SearchScreenStyles";

const ItemCard = ({ item }: ItemCardTypes) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={{ uri: item.image }} />
      <View style={styles.cardDescription}>
        <View style={styles.cardTopRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemName}>
            {item.distance === "? mi" ? "2 mi" : item.distance}
          </Text>
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
  const { updateListings } = useAppSelector((store) => store.profile);
  const dispatch = useAppDispatch();

  const db = getDatabase(app);
  const reference_d = dRef(db, "food_listings/");

  const stor = getStorage(app, "gs://mas-food-for-2.appspot.com");

  async function getListings() {
    setMasterList([]);
    setFilteredList([]);

    const snapshot = await get(reference_d);
    var item_arr: Array<ItemCardTypes["item"]> = [];
    var req_state_arr: Array<string> = []

    const reference_req = dRef(db, "req_state")
    const snapshot_req = await get(reference_req)

    if (snapshot_req) {
      snapshot_req.forEach(function (child) {
        req_state_arr.push(child.val());
      });
    }

    if (snapshot) {
      snapshot.forEach(function (child) {
        if (req_state_arr[child.val().id - 1] !== "approved") {
          item_arr.push(child.val());
        }
      });

      item_arr.forEach(async function (item, index) {
        if (item_arr[index].image === "") {
          const ref_string = "id_" + item.id + "_image";
          const reference_s = sRef(stor, ref_string);

          const url = await getDownloadURL(reference_s);
          item_arr[index].image = url;

          const ref_string_item = "food_listings/id_" + item.id;
          const reference_i = dRef(db, ref_string_item);
          set(reference_i, {
            bought: item_arr[index].bought,
            distance: item_arr[index].distance,
            expires: item_arr[index].expires,
            image: url,
            id: item_arr[index].id,
            name: item_arr[index].name,
            pickup: item_arr[index].pickup,
            seller_id: item_arr[index].seller_id,
            tagColor: item_arr[index].tagColor,
            university: item_arr[index].university,
          });
        }

        const ref_string_un = "users_real/" + item.seller_id;
        const reference_un = dRef(db, ref_string_un);
        const snapshot = await get(reference_un);
        const data = snapshot.val();

        item_arr[index].seller = data.name;
        item_arr[index].address = data.addr_street + ", " + data.addr_city + ", " + data.addr_state + ", " + data.addr_zip

        if (item_arr[index].image && snapshot) {
          setFilteredList((list) => {
            const tempList = [...list];
            tempList.push(item_arr[index]);
            tempList.sort((a, b) => (a.distance > b.distance ? 1 : -1));
            return tempList;
          });
          setMasterList((list) => {
            const tempList = [...list];
            tempList.push(item_arr[index]);
            tempList.sort((a, b) => (a.distance > b.distance ? 1 : -1));
            return tempList;
          });
        }
      });
    } else {
      return;
    }
  }

  useEffect(() => {
    if (updateListings) {
      setTimeout(() => {
        getListings();
        dispatch(updateListingsAction(false));
      }, 2000);
    }
  }, [updateListings]);

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
                const tempList = mlist.filter(
                  (item) =>
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
              onPress={() => navigation.push("Listing", { item: item, refresh: getListings })}
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
