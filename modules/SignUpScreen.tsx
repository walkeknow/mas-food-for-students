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
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles/SignUpScreenStyles";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import app from "../lib/db";
import Label from "./profile/components/Label";
import AppButton from "../components/AppButton";
import Colors from "../theme/Colors";

/***
 * This is a bit harder to understand
 * Many text fields, if any are empty, will refure to sign up,
 * the actaul sign up is dealt with by Firebase, which has its own
 * that it can throw
 * Based on the email, pulls info from the database and fills in
 * the rest of the information
 * Then creates a user profile in Firebase using the UID
 *
 * All that's left for you to figure out are cookies
 */

const SignUpScreen = ({ navigation, route }: any) => {
  // User input -----------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [street, setStreet] = useState("");

  const db = getDatabase(app);
  const auth = getAuth(app);

  function handlePress() {
    const any_empty =
      email === "" ||
      password === "" ||
      re_password === "" ||
      first_name === "" ||
      last_name === "" ||
      street === "";
    if (any_empty) {
      return Alert.alert(
        "Failed to Create Account",
        "Please make sure to fill in all fields",
        [{ text: "OK" }]
      );
    }
    if (password != re_password) {
      return Alert.alert(
        "Failed to Create Account",
        "Passwords do not match, try again",
        [{ text: "OK" }]
      );
    }
    if (email.substring(email.length - 4) != ".edu") {
      return Alert.alert(
        "Failed to Create Account",
        "Please use an .edu email",
        [{ text: "OK" }]
      );
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const startInd = email.indexOf("@") + 1;
        const endInd = email.lastIndexOf(".");
        const domain = email.substring(startInd, endInd);

        const reference = ref(db, "school_domains/" + domain);
        get(reference).then((snapshot) => {
          const data = snapshot.val();
          if (data == null) {
            deleteUser(userCredential.user).then(() => console.log("deleted"));
          } else {
            const uid = userCredential.user.uid;
            const reference_u = ref(db, "users_real/" + uid);
            set(reference_u, {
              name: first_name + " " + last_name,
              email: email,
              addr_street: street,
              addr_city: data.city,
              addr_state: data.state,
              addr_zip: data.zip,
              uni: data.name,
              uni_color: data.tag_color,
            });

            navigation.replace("SignIn");
          }
        });
      })
      .catch((error) => {
        return Alert.alert("Failed to Create Account", error.code, [
          { text: "OK" },
        ]);
      });
  }

  return (
    <>
      <StatusBar />
      <ScrollView
        style={{ flex: 1, backgroundColor: Colors.lightBrown }}
        contentContainerStyle={styles.SignupBody}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
          Sign Up
        </Text>
        <Text style={{ textAlign: "center", fontSize: 17 }}>
          Create an account!
        </Text>
        <Label style={styles.name}>Login Information</Label>
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
        <TextInput
          style={styles.textinput}
          placeholder="Re-Enter Password*"
          onChangeText={(newRePassword) => setRePassword(newRePassword)}
          value={re_password}
        />
        <Label style={styles.label}>Personal Information</Label>
        <TextInput
          style={styles.textinput}
          placeholder="First Name*"
          onChangeText={(newFirstName) => setFirstName(newFirstName)}
          value={first_name}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Last Name*"
          onChangeText={(newLastName) => setLastName(newLastName)}
          value={last_name}
        />
        <Label style={styles.label}>Housing Information</Label>

        <TextInput
          style={styles.textinput}
          placeholder="Street*"
          onChangeText={(newStreet) => setStreet(newStreet)}
          value={street}
        />
        <AppButton style={styles.button} onPress={() => handlePress()}>
          Sign Up
        </AppButton>
      </ScrollView>
    </>
  );
};

export default SignUpScreen;
