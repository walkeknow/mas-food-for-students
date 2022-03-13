import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import styles from "./styles/SearchScreenStyles";
import DummyLists from "../utils/DummyLists";
import { StatusBar } from "expo-status-bar";
import Images from "../assets/placeholder";
import { MaterialIcons } from "@expo/vector-icons";

const ItemCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image style={styles.cardImage} source={item.image} />
      <View style={styles.cardDescription}>
        <View style={styles.cardTopRow}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemName}>{item.distance}</Text>
        </View>
        <View style={styles.tagContainer}>
          <View style={[styles.tag, {backgroundColor: item.tagColor} ]}>
            <Text style={styles.tagText}>{item.university}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const SearchScreen = () => {
  return (
    <>
      <StatusBar />
      <View style={styles.body}>
          <View style={styles.row}>
            <TextInput placeholder="Search" style={styles.searchBar} />
              <Pressable>
                <MaterialIcons name="close" size={18} />
              </Pressable>
          </View>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={styles.flatlist}
          data={DummyLists.itemList}
          numColumns={2}
          renderItem={({ item }) => <ItemCard item={item} />}
        />
      </View>
    </>
  );
};

export default SearchScreen;
