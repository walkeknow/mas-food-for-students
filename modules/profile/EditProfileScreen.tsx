import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Image, Pressable, View } from "react-native";
import Images from "../../assets";
import AppButton from "../../components/AppButton";
import InputField from "./components/InputField";
import Label from "./components/Label";
import styles from "./styles/EditProfileScreenStyles";
import * as ImagePicker from "expo-image-picker";

const getImageFromCamera = async (setImage) => {
  // No permissions request is necessary for launching the image library
    console.log('camera')

  let permissionResult = await ImagePicker.getCameraPermissionsAsync();

  if (permissionResult.status === "granted") {
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
  }
};

const getImageFromLibrary = async (setImage) => {
    console.log('library')

  
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

const EditProfileScreen = () => {
  const [name, setName] = useState("Brenda Williams");
  const [university, setUniversity] = useState(
    "Georgia Institute of Technology"
  );
  const [address, setAddress] = useState(
    "812 Peachtree St NW,  Atlanta, GA 30302"
  );

  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  return (
    <View style={styles.body}>
      <View style={styles.blueHeader} />
      <View style={styles.content}>
        <View style={styles.form}>
          <Label>Name</Label>
          <InputField
            style={styles.inputField}
            defaultValue={"Brenda Williams"}
            setValue={setName}
          />
          <Label style={styles.label}>University</Label>
          <InputField
            style={styles.inputField}
            defaultValue={"Georgia Institute of Technology"}
            setValue={setUniversity}
          />
          <Label style={styles.label}>Address</Label>
          <InputField
            multiline
            style={[styles.inputField, styles.adressInput]}
            value={address}
            defaultValue={"812 Peachtree St NW,  Atlanta, GA 30302"}
            setValue={setAddress}
          />
          <AppButton onPress={() => navigation.goBack()} style={styles.button}>
            Save
          </AppButton>
        </View>
      </View>
      <View style={styles.centeredView}>
        <Image
          style={styles.placeholderImage}
          source={Images.placeholderImage}
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
