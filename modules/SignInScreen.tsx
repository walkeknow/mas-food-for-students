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
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles/SignUpScreenStyles";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import app from "../lib/db";
import Label from "./profile/components/Label";
import AppButton from "../components/AppButton";
import { useAppDispatch } from "../redux/hooks";
import { updateUID } from "../redux/slices/uidReducer";

/***
 * This is relatively easy enough to understand
 * Two text fields, if either are empty, will refure to sign in,
 * the actaul sign in is dealt with by Firebase
 * Also there a bit about signing up too
 *
 * All that's left for you to figure out are cookies
 */

const SignInScreen = ({ navigation, route }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const db = getDatabase(app);
  const auth = getAuth(app);

  const dispatch = useAppDispatch()

  function handlePress() {
    const any_empty = email === "" || password === "";
    if (any_empty) {
      return Alert.alert(
        "Failed to Sign In",
        "Please make sure to fill in all fields",
        [{ text: "OK" }]
      );
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid
        dispatch(updateUID(uid))
        navigation.replace("Tabs");
      })
      .catch((error) => {
        return Alert.alert("Failed to Sign In", error.code, [{ text: "OK" }]);
      });
  }

  return (
    <>
      <StatusBar />
      <View style={styles.SignInBody}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
          Sign In
        </Text>
        <Label style={styles.name}>Name</Label>
        <TextInput
          style={styles.textinput}
          placeholder="Email*"
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
        />
        <Label style={styles.password}>Password</Label>
        <TextInput
          style={styles.textinput}
          placeholder="Password*"
          secureTextEntry
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
        />
        <AppButton disabled={false} style={styles.button} onPress={() => handlePress()}>
          Sign In
        </AppButton>
        <Text style={styles.hintText} onPress={() => navigation.push("SignUp")}>
          {"Don't have an account? Click here to sign up!"}
        </Text>
      </View>
    </>
  );
};

export default SignInScreen;
