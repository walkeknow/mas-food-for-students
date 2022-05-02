import { View, Text, FlatList, Image, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import DummyLists from "../../utils/DummyLists";
import styles from "./styles/RequestStyles";
import Toast from "react-native-root-toast";
import Label from "../profile/components/Label";
import { SentRequestCardTypes } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { get, getDatabase, ref } from "firebase/database";
import app from "../../lib/db";
import { updateListingsAction } from "../../redux/slices/profileReducer";

const PendingItem = ({ item }: any) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.item_info.image }} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.text}>{item.item_info.seller}</Text>
        <Text style={styles.boldText}>Status:</Text>
        <Text style={styles.text}>{item.state}...</Text>
      </View>
    </View>
  );
};

const CompletedItem = ({ item }: any) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.item_info.image }} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.text}>{item.item_info.seller}</Text>
        {(item.state === "Approved") && <Text style={styles.text}>{item.email}</Text>}
        <Text style={styles.boldText}>Status: {item.state}</Text>
      </View>
      {(item.state === "Approved") && <View style={styles.buttons}>
        <Pressable
          onPress={() => {
            Toast.show("Feature Coming Soon!", {
              duration: Toast.durations.SHORT,
            });
          }}
          style={styles.yellowButton}
        >
          <Text style={[styles.buttonText, styles.rateText]}>Rate</Text>
        </Pressable>
      </View>}
    </View>
  );
};

const SentRequestsScreen = () => {
  const [pendingItemList, setPendingItemList] = useState<Array<SentRequestCardTypes>>([])
  const [completedItemList, setCompletedItemList] = useState<Array<SentRequestCardTypes>>([])
  const { updateListings } = useAppSelector((store) => store.profile);
  const { uid } = useAppSelector((store) => store.uid);
  const dispatch = useAppDispatch();

  const db = getDatabase(app);
  const reference_rp = ref(db, "requests/sent/" + uid + "/pending");
  const reference_rc = ref(db, "requests/sent/" + uid + "/complete");

  async function getListings() {
    setPendingItemList([])
    setCompletedItemList([])

    const snapshot_p = await get(reference_rp);
    const snapshot_c = await get(reference_rc);
    var pending_arr: Array<SentRequestCardTypes> = [];
    var completed_arr: Array<SentRequestCardTypes> = [];

    if (snapshot_p) {
      snapshot_p.forEach(function (item) {
        item.forEach(function (req_user) {
          pending_arr.push(req_user.val());
        })
      });

      setPendingItemList(pending_arr)
    }
    if (snapshot_c) {
      snapshot_c.forEach(function (item) {
        item.forEach(function (req_user) {
          completed_arr.push(req_user.val());
        })
      });

      setCompletedItemList(completed_arr)
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
    <ScrollView style={styles.scrollbody}>
      <View style={styles.body}>
        <View>
          <Label style={[styles.label]}>Pending</Label>
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            data={pendingItemList}
            renderItem={({ item }) => (
              <PendingItem item={item} />
            )}
          />
        </View>
        <View>
          <Label style={[styles.label, styles.sectionTwo]}>Completed</Label>
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            data={completedItemList}
            renderItem={({ item }) => (
              <CompletedItem item={item} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SentRequestsScreen;
