import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useState } from "react";
import DummyLists from "../../utils/DummyLists";
import styles from "./styles/RequestStyles";
import Toast from "react-native-root-toast";

const Item = ({ item, setItemList }: any) => {
  return (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.text}>{item.seller}</Text>
        <Text style={styles.boldText}>Pickup Time:</Text>
        <Text style={styles.text}>{item.pickup}</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={() =>
            setItemList((list: any) => {
              const tempList = list.filter((oldItem: any) => {
                return oldItem.id !== item.id;
              });
              Toast.show("Request Approved!", {
                duration: Toast.durations.SHORT,
              });
              return tempList;
            })
          }
          style={styles.greenButton}
        >
          <Text style={[styles.buttonText, styles.approveText]}>Approve</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setItemList((list: any) => {
              const tempList = list.filter((oldItem: any) => {
                return oldItem.id !== item.id;
              });
              Toast.show("Request Denied", {
                duration: Toast.durations.SHORT,
              });
              return tempList;
            })
          }
          style={styles.redButton}
        >
          <Text style={[styles.buttonText, styles.denyText]}>Deny</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReceivedRequestsScreen = () => {
  const [itemList, setItemList] = useState(DummyLists.itemList);

  return (
    <View style={styles.body}>
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        data={itemList}
        renderItem={({ item }) => <Item {...{ item, setItemList }} />}
      />
    </View>
  );
};

export default ReceivedRequestsScreen;
