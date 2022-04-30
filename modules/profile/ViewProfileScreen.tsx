import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import Images from "../../assets";
import AppButton from "../../components/AppButton";
import { useAppSelector } from "../../redux/hooks";
import Colors from "../../theme/Colors";
import { useProfileNavigation } from "../../utils/hooks";
import InputField from "./components/InputField";
import Label from "./components/Label";
import styles from "./styles/ViewProfileScreenStyles";

const setUniversityImage = (university: any) => {
  if (university === "Georgia Tech") {
    return Images.gtLogo;
  } else if (university === "Emory University") {
    return Images.emoryLogo;
  } else {
    return Images.universityIcon;
  }
};

const ViewProfileScreen = () => {
  const navigation = useProfileNavigation();
  const { name, address, university, image } = useAppSelector(
    (store) => store.profile
  );

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
            value={name}
          />
          <Label style={styles.label}>Address</Label>
          <InputField
            placeholder="Add Address"
            editable={false}
            multiline
            style={[styles.inputField, styles.adressInput]}
            value={address}
          />
          <AppButton
            onPress={() => navigation.navigate("RequestsScreen")}
            style={styles.button}
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
        <Image style={styles.logo} source={setUniversityImage(university)} />
      </View>
    </View>
  );
};

export default ViewProfileScreen;
