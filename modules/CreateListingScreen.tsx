import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  TextInput,
  View,
  Platform,
  Button,
  Text,
  Image,
  ScrollView,
} from "react-native";
import styles from "./styles/CreateListingScreenStyles";
import { FAB } from "react-native-elements";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { getStorage, ref as s_ref, uploadBytes } from "firebase/storage";
import app from "../lib/db";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateListingsAction } from "../redux/slices/profileReducer";
import * as ImagePicker from "expo-image-picker";
import Images from "../assets";
import AppButton from "../components/AppButton";

const CreateListingScreen = ({ navigation, route }: any) => {
  const { address: storeAddress, university: storeUniversity } = useAppSelector(
    (store) => store.profile
  );

  const getImageFromCamera = async (setImage: any) => {
    // No permissions request is necessary for launching the image library

    let permissionResult = await ImagePicker.getCameraPermissionsAsync();

    if (permissionResult.status === "granted") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3],
        quality: 0,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  const getImageFromLibrary = async (setImage: any) => {
    console.log("library");

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 0,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const [name, setName] = useState("");
  const [university, setUniversity] = useState(storeUniversity);
  const [address, setAddress] = useState(storeAddress);
  const [pickup, setPickup] = useState("");
  const [image, setImage] = useState(Images.productPlaceholder);

  const [bought, setBought] = useState(new Date());
  const [showBought, setShowBought] = useState(false);
  const [textBought, setTextBought] = useState("enter purchase date");
  const [formatBought, setFormatBought] = useState("invalid");
  const onBoughtChange = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    const currentDate = date || bought;
    setShowBought(Platform.OS === "ios");
    setBought(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    setFormatBought(fDate);
    setTextBought("Bought:\n" + fDate);
  };

  const [expire, setExpire] = useState(new Date());
  const [showExpire, setShowExpire] = useState(false);
  const [textExpire, setTextExpire] = useState("enter expiry\ndate");
  const [formatExpire, setFormatExpire] = useState("invalid");
  const onExpireChange = (
    event: DateTimePickerEvent,
    date: Date | undefined
  ) => {
    const currentDate = date || expire;
    setShowExpire(Platform.OS === "ios");
    setExpire(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getMonth() +
      1 +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear();
    setFormatExpire(fDate);
    setTextExpire("Expires:\n" + fDate);
  };

  const db = getDatabase(app);

  const dispatch = useAppDispatch();

  return (
    <>
      <StatusBar />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.body}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 30,
            marginBottom: 40,
          }}
        >
          Create a Listing
        </Text>
        <View style={styles.center}>
          <Image
            style={styles.image}
            source={
              image === Images.productPlaceholder
                ? Images.productPlaceholder
                : { uri: image }
            }
          />
        </View>
        <View style={styles.sidebyside}>
          <View style={styles.defaultbutton}>
            <Button
              title={"Select Image"}
              onPress={() =>
                Alert.alert("Choose Image From:", "", [
                  {
                    text: "Camera",
                    onPress: () => getImageFromCamera(setImage),
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Photos",
                    onPress: () => getImageFromLibrary(setImage),
                  },
                ])
              }
            ></Button>
          </View>
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Product Name"
          onChangeText={(newName) => setName(newName)}
          value={name}
        />
        <TextInput
          style={styles.textinput}
          placeholder="University"
          onChangeText={(newUniversity) => setUniversity(newUniversity)}
          value={university}
        />
        <View style={styles.sidebyside}>
          <View style={styles.defaultbutton}>
            <Button
              title={textBought}
              onPress={() => setShowBought(true)}
            ></Button>
          </View>
          {showBought && (
            <DateTimePicker
              style={{ width: 200, height: 150 }}
              value={bought}
              mode="date"
              display="default"
              onChange={onBoughtChange}
              maximumDate={new Date()}
            />
          )}
        </View>
        <View style={styles.sidebyside}>
          <View style={styles.defaultbutton}>
            <Button
              title={textExpire}
              onPress={() => setShowExpire(true)}
            ></Button>
          </View>
          {showExpire && (
            <DateTimePicker
              style={{ width: 200, height: 150 }}
              value={expire}
              mode="date"
              display="default"
              onChange={onExpireChange}
              minimumDate={new Date(bought)}
            />
          )}
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Pickup Location"
          onChangeText={(newLocation) => setAddress(newLocation)}
          value={address}
        />
        <TextInput
          style={styles.multilinetextinput}
          multiline={true}
          placeholder="Enter a small description of possible pickup instructions, times, etc."
          onChangeText={(newPickup) => setPickup(newPickup)}
          value={pickup}
        />
        <AppButton
          style={styles.button}
          onPress={async () => {
            let error_message = "";
            if (name === "") error_message += "Please enter a product name.\n";
            if (image === Images.productPlaceholder)
              error_message += "Please choose a product image.\n";
            if (university === "")
              error_message += "Please enter a university.\n";
            if (formatBought === "invalid")
              error_message +=
                "Please enter the date the product was purchased.\n";
            if (formatExpire === "invalid")
              error_message += "Please enter an expiration date.\n";
            if (address === "")
              error_message += "Please enter a pickup location.\n";
            if (pickup === "")
              error_message += "Please enter a pickup description.\n";
            if (error_message != "") {
              return Alert.alert("Failed to post listing.", error_message, [
                { text: "OK" },
              ]);
            } else {
              const id_ref = ref(db, "/global_id");
              let blob = await fetch(image).then((r) => r.blob());
              get(id_ref).then((snapshot) => {
                if (snapshot.exists()) {
                  let id: number = snapshot.val();
                  set(id_ref, id + 1);
                  const listing_ref = ref(db, "food_listings/id_" + id);
                  const storage_ref = s_ref(
                    getStorage(),
                    "id_" + id + "_image"
                  );
                  uploadBytes(storage_ref, blob).then((snapshot) => {
                    console.log("tried to upload: " + image);
                  });
                  set(listing_ref, {
                    address: address,
                    bought: formatBought,
                    // TODO: get distance somehow
                    distance: "? mi",
                    expires: formatExpire,
                    image: "",
                    id: id,
                    name: name,
                    pickup: "\n" + pickup,
                    // TODO: get the current user's name
                    seller_id: "?",
                    tagColor: "#FFFFFF",
                    university: university,
                  });
                } else {
                  return Alert.alert(
                    "Failed to retrive item id!",
                    "You can try again.",
                    [
                      {
                        text: "Try again",
                      },
                    ]
                  );
                }
              });

              dispatch(updateListingsAction(true));

              return Alert.alert(
                "Successfully posted listing!",
                "You can return home now.",
                [
                  {
                    text: "Return Home",
                    onPress: () => {
                      setName("")
                      setUniversity(storeUniversity)
                      setAddress(storeAddress)
                      setPickup("")
                      setImage(Images.productPlaceholder)
                    
                      setBought(new Date())
                      setShowBought(false)
                      setTextBought("enter purchase date")
                      setFormatBought("invalid")

                      setExpire(new Date())
                      setShowExpire(false)
                      setTextExpire("enter expiry\ndate")
                      setFormatExpire("invalid")

                      navigation.navigate("Tabs", { screen: "Search" })
                    },
                    style: "cancel",
                  },
                ]
              );
            }
          }}
        >
          Confirm
        </AppButton>
      </ScrollView>
    </>
  );
};

export default CreateListingScreen;
