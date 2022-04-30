import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import app from "../../lib/db"
import { getDatabase, ref as dRef, get, onValue, DataSnapshot } from 'firebase/database';
import { getStorage, ref as sRef, getDownloadURL } from 'firebase/storage';
import { RequestCardTypes } from "../../utils/types";

/*
* So the code is very similar to the SearchScreen code
* The only difference is it is not an ItemCardType but a RequestCardType
* A RequestCardType holds all the same information as an ItemCardType but
* also a "state" value to determine if it is pending, has been accepted, or
* has been rejected
*
* I haven't exactly decided how the database is gonna handle the accepts and rejects
* I'm sure you will be able to figure it out :)
*/

const ViewRequestsScreen = () => {
  const [list, setList] = useState<Array<RequestCardTypes>>([]);

  const db = getDatabase(app)
  const reference_d = dRef(db, 'food_listings/');

  const stor = getStorage(app, "gs://mas-food-for-s.appspot.com")

  async function getRequests() {
    const snapshot = await get(reference_d)
    var req_arr : Array<RequestCardTypes> = []
    snapshot.forEach(function(child) {
      req_arr.push(child.val())
    })

    req_arr.forEach(async function(req, index) {
      const ref_string = "id_" + req.item.id + "_image"
      const reference_s = sRef(stor, ref_string)

      req_arr[index].item.image = await getDownloadURL(reference_s) 
    })

    setList(req_arr)
  }

  useEffect(() => {
    getRequests()
  }, [])

  return (
    <View>
      <Text>ViewRequestsScreem</Text>
    </View>
  );
};

export default ViewRequestsScreen;
