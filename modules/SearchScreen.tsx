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
import { FAB } from 'react-native-elements';

type ItemCardTypes = {
  item: {
    name: string;
    image: ImageSourcePropType;
    distance: string;
    tagColor: string;
    university: string;
  };
};

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
  const [list, setFilteredList] = useState(DummyLists.itemList);
  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <View style={styles.row}>
          <TextInput
            onChangeText={(text) => {
              setFilteredList(() => {
                const tempList = DummyLists.itemList.filter((item) =>
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
        <FAB title="+" placement="right" onPress={() => navigation.push("CreateListing")}/>
      </View>
    </>
  );
};

export default SearchScreen;
