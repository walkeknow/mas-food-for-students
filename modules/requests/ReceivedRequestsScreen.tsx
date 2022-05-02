import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import DummyLists from "../../utils/DummyLists";
import styles from "./styles/RequestStyles";
import Toast from "react-native-root-toast";
import { ReceivedRequestCardTypes } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { get, getDatabase, ref, set } from "firebase/database";
import app from "../../lib/db";
import { updateListingsAction } from "../../redux/slices/profileReducer";

const Item = ({ item, getListings }: any) => {
  const { uid } = useAppSelector((store) => store.uid);
  const dispatch = useAppDispatch()

  const db = getDatabase(app);

  async function handleApprove() {
    const reference = ref(db, "requests/received/" + uid + "/id_" + item.item_info.id);
    set(reference, {})

    const state_ref = ref(db, "req_state/id_" + item.item_info.id)
    set(state_ref, "approved")
    dispatch(updateListingsAction(true))

    getListings()

    const email_ref = ref(db, "users_real/" + uid + "/email")
    const snapshot = await get(email_ref)
    const data = snapshot.val()

    const sent_ref = ref(db, "requests/sent/" + item.requester_id + "/pending/" + uid + "/id_" + item.item_info.id)
    set(sent_ref, {
      email: data,
      item_info: item.item_info,
      state: "Approved",
    })
    
    Toast.show("Request Approved!", {
      duration: Toast.durations.SHORT,
    });
  }

  async function handleDeny() {
    const reference = ref(db, "requests/received/" + uid + "/id_" + item.item_info.id + "/" + item.requester_id);
    set(reference, {})

    getListings()

    const email_ref = ref(db, "users_real/" + uid + "/email")
    const snapshot = await get(email_ref)
    const data = snapshot.val()

    const sent_ref = ref(db, "requests/sent/" + item.requester_id + "/pending/" + uid + "/id_" + item.item_info.id)
    set(sent_ref, {
      email: data,
      item_info: item.item_info,
      state: "Denied",
    })
    
    Toast.show("Request Denied!", {
      duration: Toast.durations.SHORT,
    });
  }

  return (
    <View style={styles.item}>
      <Image source={{ uri: item.item_info.image }} style={styles.image} />
      <View style={styles.description}>
        <Text style={styles.text}>{item.item_info.seller}</Text>
        <Text style={styles.boldText}>Contact:</Text>
        <Text style={styles.text}>{item.email}</Text>
      </View>
      <View style={styles.buttons}>
        <Pressable
          onPress={async () => await handleApprove()}
          style={styles.greenButton}
        >
          <Text style={[styles.buttonText, styles.approveText]}>Approve</Text>
        </Pressable>
        <Pressable
          onPress={async () => await handleDeny()}
          style={styles.redButton}
        >
          <Text style={[styles.buttonText, styles.denyText]}>Deny</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ReceivedRequestsScreen = () => {
  const [itemList, setItemList] = useState<Array<ReceivedRequestCardTypes>>([]);
  const { updateListings } = useAppSelector((store) => store.profile);
  const { uid } = useAppSelector((store) => store.uid);
  const dispatch = useAppDispatch();

  const db = getDatabase(app);
  const reference_r = ref(db, "requests/received/" + uid);

  async function getListings() {
    setItemList([])

    const snapshot = await get(reference_r);
    var item_arr: Array<ReceivedRequestCardTypes> = [];

    if (snapshot) {
      snapshot.forEach(function (item) {
        item.forEach(function (req_user) {
          item_arr.push(req_user.val());
        }
      )
    });
      setItemList(item_arr);
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
    <View style={styles.body}>
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        data={itemList}
        renderItem={({ item }) => <Item {...{ item, getListings }} />}
      />
    </View>
  );
};

export default ReceivedRequestsScreen;

