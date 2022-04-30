import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, TextInput, View, Platform, Button, Text, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker"
import styles from "./styles/SignUpScreenStyles";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, deleteUser } from "firebase/auth"
import app from "../lib/db";

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
  const auth = getAuth(app)

  function handlePress() {
    const any_empty = email === "" || password === ""
    if (any_empty) {
      return Alert.alert("Failed to Sign In", "Please make sure to fill in all fields", [
        { text: "OK" },
      ]);
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
          navigation.push("Tabs")
    })
    .catch((error) => {
      return Alert.alert("Failed to Sign In", error.code, [
        { text: "OK" },
      ]);
    });
  }

  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
          Sign In
        </Text>
        <TextInput
          style={styles.textinput}
          placeholder="Email*"
          onChangeText={(newEmail) => setEmail(newEmail)}
          value={email}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Password*"
          onChangeText={(newPassword) => setPassword(newPassword)}
          value={password}
        />
        <Button
          title="Sign In"
          onPress={() => handlePress()}
        />
        <Text style={{ textAlign: "right", fontSize: 20 }} onPress={() => navigation.push("SignUp")}>
          {"Don't have an account?\nClick here to sign up!"}
        </Text>
      </View>
    </>
  );
};

export default SignInScreen;
