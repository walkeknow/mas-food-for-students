import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useState } from "react";
import DummyLists from "../../utils/DummyLists";
import styles from "./styles/RequestStyles";
import Toast from "react-native-root-toast";
import Label from "../profile/components/Label";

const PendingItem = ({ item, setPendingItemList }: any) => {
  return (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.text}>{item.seller}</Text>
        <Text style={styles.boldText}>Pickup</Text>
        <Text style={styles.text}>{item.pickup}</Text>
      </View>
    </View>
  );
};

const CompletedItem = ({ item, setCompletedItemList }: any) => {
  return (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.text}>{item.seller}</Text>
        <Text style={styles.boldText}>Completed</Text>
        <Text style={styles.text}>{item.pickup}</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={() =>
            setCompletedItemList((list: any) => {
              const tempList = list.filter((oldItem: any) => {
                return oldItem.id !== item.id;
              });
              Toast.show("Feature Coming Soon!", {
                duration: Toast.durations.SHORT,
              });
              return tempList;
            })
          }
          style={styles.yellowButton}
        >
          <Text style={[styles.buttonText, styles.rateText]}>Rate</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SentRequestsScreen = () => {
  const [pendingItemList, setPendingItemList] = useState(
    DummyLists.pendingItemList
  );
  const [completedItemList, setCompletedItemList] = useState(
    DummyLists.completedItemList
  );

  return (
    <View style={styles.body}>
      <View>
        <Label style={[styles.label]}>Pending</Label>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          data={pendingItemList}
          renderItem={({ item }) => (
            <PendingItem {...{ item, setPendingItemList }} />
          )}
        />
      </View>
      <View>
        <Label style={[styles.label, styles.sectionTwo]}>Completed</Label>
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          data={completedItemList}
          renderItem={({ item }) => (
            <CompletedItem {...{ item, setCompletedItemList }} />
          )}
        />
      </View>
    </View>
  );
};

export default SentRequestsScreen;
