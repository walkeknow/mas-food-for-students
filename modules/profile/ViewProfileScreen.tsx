import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import styles from "./styles/ViewProfileScreenStyles";
import Images from "../../assets";
import { Rating } from "react-native-ratings";
import Colors from "../../theme/Colors";
import Label from "./components/Label";
import InputField from "./components/InputField";
import AppButton from "../../components/AppButton";

const ViewProfileScreen = () => {
  return (
    <View style={styles.body}>
      <View style={styles.blueHeader} />

      <View style={styles.content}>
        <Text style={styles.editButton}>Edit</Text>
        <Rating
          style={styles.rating}
          imageSize={30}
          tintColor={Colors.lightBrown}
        />
        <View style={styles.form}>
          <Label>Name</Label>
          <InputField style={styles.inputField} value={"Brenda Williams"} />
          <Label style={styles.label}>Address</Label>
          <InputField
            multiline
            style={[styles.inputField, styles.adressInput]}
            value={"812 Peachtree St. NW, Atlanta GA. 30302"}
          />
          <AppButton style={styles.button}>View Requests</AppButton>
        </View>
      </View>
      <View style={styles.centeredView}>
        <Image
          style={styles.placeholderImage}
          source={Images.placeholderImage}
        />
        <Image style={styles.logo} source={Images.gtLogo} />
      </View>
    </View>
  );
};

export default ViewProfileScreen;
