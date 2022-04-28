import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import app from "../../lib/db"
import { getDatabase, ref as dRef, get, onValue, DataSnapshot } from 'firebase/database';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { RequestCardTypes } from "../../utils/types";

const ViewRequestsScreen = () => {
  const [list, setList] = useState<Array<RequestCardTypes>>([]);

  const db = getDatabase(app)
  const reference_d = dRef(db, 'food_listings/');

  const stor = getStorage(app, "gs://mas-food-for-s.appspot.com")

  async function getListings() {
    const snapshot = await get(reference_d)
    var item_arr : Array<RequestCardTypes> = []
    snapshot.forEach(function(child) {
      item_arr.push(child.val())
    })

    item_arr.forEach(async function(item, index) {
      const ref_string = "id_" + item.id + "_image"
      const reference_s = sRef(stor, ref_string)

      item_arr[index].image = await getDownloadURL(reference_s) 
    })

    item_arr.sort((a, b) => a.distance > b.distance ? 1 : -1)

    setList(item_arr)
  }

  useEffect(() => {
    getListings()
  }, [])

  return (
    <View>
      <Text>ViewRequestsScreem</Text>
    </View>
  );
};

export default ViewRequestsScreen;
