import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import Images from "../../assets";
import AppButton from "../../components/AppButton";
import app from "../../lib/db";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { reloadProf } from "../../redux/slices/uidReducer";
import Colors from "../../theme/Colors";
import { useProfileNavigation } from "../../utils/hooks";
import InputField from "./components/InputField";
import Label from "./components/Label";
import styles from "./styles/ViewProfileScreenStyles";

const setUniversityImage = (university: any) => {
  switch (university) {
    case "Georgia Tech":
      return Images.gtLogo;
    case "Emory University":
      return Images.emoryLogo;
    default:
      return Images.universityIcon;
  }
};

const ViewProfileScreen = () => {
  const navigation = useProfileNavigation();
  const { image } = useAppSelector(
    (store) => store.profile
  );
  const { uid } = useAppSelector(
    (store) => store.uid
  );

  const [userName, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [uni, setUniversity] = useState("");

  const dispatch = useAppDispatch()
  const { reload } = useAppSelector((store) => store.uid);

  const db = getDatabase(app)

  async function getProfInfo() {
    const reference = ref(db, "users_real/" + uid)
    const snapshot = await get(reference)
    const data = snapshot.val()

    setName(data.name)
    setAddr(data.addr_street + ", " + data.addr_city + ", " + data.addr_state + ", " + data.addr_zip)
    setUniversity(data.uni)
  }

  useEffect(() => {
    if (reload) {
      setTimeout(() => {
        getProfInfo();
        dispatch(reloadProf(false));
      }, 2000);
    }
  }, [reload]);

  useEffect(() => {
    getProfInfo()
  }, [])

  return (
    <View style={styles.body}>
      <View style={styles.blueHeader} />

      <View style={styles.content}>
        <Pressable onPress={() => navigation.navigate("EditProfileScreen")}>
          <Text style={styles.editButton}>Edit</Text>
        </Pressable>
        <Rating
          style={styles.rating}
          imageSize={30}
          tintColor={Colors.lightBrown}
        />
        <View style={styles.form}>
          <Label>Name</Label>
          <InputField
            placeholder="Add Name"
            editable={false}
            style={styles.inputField}
            value={userName}
          />
          <Label style={styles.label}>Address</Label>
          <InputField
            placeholder="Add Address"
            editable={false}
            multiline
            style={[styles.inputField, styles.adressInput]}
            value={addr}
          />
          <AppButton
            onPress={() => navigation.navigate("RequestsScreen")}
            style={styles.button}
            disabled={false}
          >
            View Requests
          </AppButton>
        </View>
      </View>
      <View style={styles.centeredView}>
        <Image
          style={styles.placeholderImage}
          source={
            image === Images.placeholderImage
              ? Images.placeholderImage
              : { uri: image }
          }
        />
        <Image style={styles.logo} source={setUniversityImage(uni)} />
      </View>
    </View>
  );
};

export default ViewProfileScreen;
