import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, View } from "react-native";
import Images from "../../assets";
import AppButton from "../../components/AppButton";
import InputField from "./components/InputField";
import Label from "./components/Label";
import styles from "./styles/EditProfileScreenStyles";
import * as ImagePicker from "expo-image-picker";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editProfile } from "../../redux/slices/profileReducer";
import { get, getDatabase, ref, set } from "firebase/database";
import app from "../../lib/db";
import { reloadProf } from "../../redux/slices/uidReducer";

const getImageFromCamera = async (setImage: any) => {
  // No permissions request is necessary for launching the image library

  let permissionResult = await ImagePicker.getCameraPermissionsAsync();

  if (permissionResult.status === "granted") {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
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
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.cancelled) {
    setImage(result.uri);
  }
};

const saveProfile = ({
  dispatch,
  navigation,
  name,
  university,
  address,
  image,
}: any) => {
  const probileObj = {
    image,
    name,
    university,
    address,
  };
  dispatch(editProfile(probileObj));
  navigation.goBack();
};

const EditProfileScreen = () => {
  const {
    name: storeName,
    address: storeAddress,
    university: storeUniversity,
    image: storeImage,
  } = useAppSelector((store) => store.profile);

  const { uid } = useAppSelector((store) => store.uid);

  const [name, setName] = useState(storeName);
  const [university, setUniversity] = useState(storeUniversity);
  const [address, setAddress] = useState(storeAddress);

  const navigation = useNavigation();
  const [image, setImage] = useState(storeImage);
  const dispatch = useAppDispatch();

  const db = getDatabase(app);

  async function updateProfile() {
    const reference = ref(db, "users_real/" + uid);
    const snapshot = await get(reference);
    const data = snapshot.val();

    set(reference, {
      addr_street: address,
      addr_city: data.addr_city,
      addr_state: data.addr_state,
      addr_zip: data.addr_zip,
      email: data.email,
      name: name,
      uni: data.uni,
      uni_color: data.uni_color,
    });

    const profileObj = {
      image,
    };

    dispatch(editProfile(profileObj));

    dispatch(reloadProf(true));

    navigation.goBack();
  }

  async function getCurrUni() {
    const reference = ref(db, "users_real/" + uid);
    const snapshot = await get(reference);
    const data = snapshot.val();

    setUniversity(data.uni);
  }

  useEffect(() => {
    getCurrUni();
  });

  return (
    <View style={styles.body}>
      <View style={styles.blueHeader} />
      <View style={styles.content}>
        <View style={styles.form}>
          <Label>Name</Label>
          <InputField
            placeholder="Add Name"
            style={styles.inputField}
            defaultValue={name}
            setValue={setName}
          />
          <Label style={styles.label}>University</Label>
          <InputField
            placeholder="Add University"
            editable={false}
            style={styles.inputField}
            defaultValue={university}
            setValue={setUniversity}
          />
          <Label style={styles.label}>Street Address</Label>
          <InputField
            multiline
            placeholder="Add Street Address"
            style={[styles.inputField, styles.adressInput]}
            value={address}
            defaultValue={address}
            setValue={setAddress}
          />
          <AppButton onPress={() => updateProfile()} style={styles.button}>
            Save
          </AppButton>
        </View>
      </View>
      <View style={styles.centeredView}>
        <Image
          style={styles.image}
          source={
            image === Images.placeholderImage
              ? Images.placeholderImage
              : { uri: image }
          }
        />
        <Pressable style={styles.logo}>
          <Pressable
            onPress={() => {
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
              ]);
            }}
          >
            <Image source={Images.camera} />
          </Pressable>
        </Pressable>
      </View>
    </View>
  );
};

export default EditProfileScreen;
