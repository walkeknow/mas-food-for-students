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
import React, { useState } from "react";
import styles from "./styles/SearchScreenStyles";
import DummyLists from "../utils/DummyLists";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { ItemCardTypes } from "../utils/types"
import app from "../lib/db"
import { getDatabase, ref, onValue, set } from 'firebase/database';

// TEMP: Need to change after image storage
import Images from "../assets/placeholder"

const ItemCard = ({ item }: ItemCardTypes) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={item.image} />
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
  var item_arr : Array<ItemCardTypes["item"]> = []

  const db = getDatabase(app)
  const reference =  ref(db, 'food_listings/');

  // TODO: Change once image storage
  onValue(reference, (snapshot) => {
    snapshot.forEach(function(child) {
      var curr_item : ItemCardTypes["item"] = child.val()
      curr_item.image = Images.bakedBread

      item_arr.push(curr_item)
    })
  })
  
  const [list, setFilteredList] = useState(item_arr);

  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <View style={styles.row}>
          <TextInput
            onChangeText={(text) => {
              setFilteredList(() => {
                const tempList = item_arr.filter((item) =>
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
