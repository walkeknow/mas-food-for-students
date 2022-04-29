import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Alert, TextInput, View, Platform, Button, Text, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker"
import styles from "./styles/SignUpScreenStyles";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, deleteUser } from "firebase/auth"
import app from "../lib/db";

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

  // Read from Firebase after user input -----------------------
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [university, setUniversity] = useState("");
  const [tag_color, setTagColor] = useState("");

  const db = getDatabase(app);
  const auth = getAuth(app)

  function handlePress() {
    const any_empty = email === "" || password === "" || re_password === "" ||
                      first_name === "" || last_name === "" || street === ""
    if (any_empty) {
      return Alert.alert("Failed to Create Account", "Please make sure to fill in all fields", [
        { text: "OK" },
      ]);
    }
    if (password != re_password) {
      return Alert.alert("Failed to Create Account", "Passwords do not match, try again", [
        { text: "OK" },
      ]);
    }
    if (email.substring(email.length - 4) != ".edu") {
      return Alert.alert("Failed to Create Account", "Please use an .edu email", [
        { text: "OK" },
      ]);
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const startInd = email.indexOf("@") + 1
      const endInd = email.lastIndexOf(".")
      const domain = email.substring(startInd, endInd)

      const reference = ref(db, "school_domains/" + domain)
      get(reference).then((snapshot) => {
        const data = snapshot.val()
        if (data == null) {
          deleteUser(userCredential.user).then(() => console.log("deleted"))
        } else {
          setCity(data.city)
          setUniversity(data.name)
          setState(data.state)
          setTagColor(data.tag_color)
          setZip(data.zip)

          const uid = userCredential.user.uid
          const reference_u = ref(db, "users_real/" + uid)
          set(reference_u, {
            name: first_name + " " + last_name,
            email: email,
            addr_street: street,
            addr_city: city,
            addr_state: state,
            addr_zip: zip,
            uni: university,
            uni_color: tag_color
          })

          navigation.push("SignIn")
        }
      })
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
      <View style={styles.body}>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30 }}>
          Sign Up
        </Text>
        <Text style={{ textAlign: "center", fontSize: 17}}>
          Create an account!
        </Text>
        <Text style={{ textAlign: "left", fontSize: 17}}>
          Login Information
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
        <TextInput
          style={styles.textinput}
          placeholder="Re-Enter Password*"
          onChangeText={(newRePassword) => setRePassword(newRePassword)}
          value={re_password}
        />
        <Text style={{ textAlign: "left", fontSize: 17}}>
          Personal Information
        </Text>
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
        <Text style={{ textAlign: "left", fontSize: 17}}>
          Housing Information
        </Text>
        <TextInput
          style={styles.textinput}
          placeholder="Street*"
          onChangeText={(newStreet) => setStreet(newStreet)}
          value={street}
        />
        <Button
          title="Sign Up"
          onPress={() => handlePress()}
        />
      </View>
    </>
  );
};

export default SignUpScreen;
