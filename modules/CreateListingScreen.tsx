import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  TextInput,
  View,
  Platform,
  Button,
  Text
} from "react-native";
import styles from "./styles/CreateListingScreenStyles";
import { FAB } from 'react-native-elements';

const CreateListingScreen = ({ navigation, route }: any) => {
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [address, setAddress] = useState('');
  const [pickup, setPickup] = useState('');

  const [bought, setBought] = useState(new Date());
  const [showBought, setShowBought] = useState(false);
  const [textBought, setTextBought] = useState('enter purchase date');
  const [formatBought, setFormatBought] = useState('invalid');
  const onBoughtChange = ( event: DateTimePickerEvent, date: Date | undefined ) => {
    const currentDate = date || bought;
    setShowBought(Platform.OS === 'ios');
    setBought(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    setFormatBought(fDate);
    setTextBought('Bought:\n' + fDate);
  }

  const [expire, setExpire] = useState(new Date());
  const [showExpire, setShowExpire] = useState(false);
  const [textExpire, setTextExpire] = useState('enter expiry\ndate');
  const [formatExpire, setFormatExpire] = useState('invalid');
  const onExpireChange = ( event: DateTimePickerEvent, date: Date | undefined ) => {
    const currentDate = date || expire;
    setShowExpire(Platform.OS === 'ios');
    setExpire(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = (tempDate.getMonth() + 1) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    setFormatExpire(fDate);
    setTextExpire('Expires:\n' + fDate);
  }

  return (
    <>
      <StatusBar />
      <View style={styles.body}>
        <Text style={{textAlign: "center", fontWeight: "bold", fontSize: 30}}>Create a Listing</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Product Name"
          onChangeText={newName => setName(newName)}
          value={name}
        />
        <TextInput
          style={styles.textinput}
          placeholder="University"
          onChangeText={newUniversity => setUniversity(newUniversity)}
          value={university}
        />
        <View style={styles.sidebyside}>
          <View style={styles.defaultbutton}>
            <Button title={textBought} onPress={() => setShowBought(true)}></Button>
          </View>
          <View style={styles.defaultbutton}>
            <Button title={textExpire} onPress={() => setShowExpire(true)}></Button>
          </View>
          {showBought && (
            <DateTimePicker 
              value={bought}
              mode="date"
              display="calendar"
              onChange={onBoughtChange}
              maximumDate={new Date()}
            />
          )}
          {showExpire && (
            <DateTimePicker 
              value={expire}
              mode="date"
              display="calendar"
              onChange={onExpireChange}
              minimumDate={new Date(bought)}
            />
          )} 
        </View>
        <TextInput
          style={styles.textinput}
          placeholder="Pickup Location"
          onChangeText={newLocation => setAddress(newLocation)}
          value={address}
        />
        <TextInput
          style={styles.multilinetextinput}
          multiline={true}
          placeholder="Enter a small description of possible pickup instructions, times, etc."
          onChangeText={newPickup => setPickup(newPickup)}
          value={pickup}
        />
        <FAB title="Confirm" placement="right" onPress={() => {
          let error_message = '';
          if (name === '') error_message += "Please enter a product name.\n";
          if (university === '') error_message += "Please enter a university.\n";
          if (formatBought === 'invalid') error_message += "Please enter the date the product was purchased.\n";
          if (formatExpire === 'invalid') error_message += "Please enter an expiration date.\n";
          if (address === '') error_message += "Please enter a pickup location.\n";
          if (pickup === '') error_message += "Please enter a pickup description.\n";
          if (error_message != '') {
            return Alert.alert(
              "Failed to post listing.",
              error_message,
              [
                { text: "OK" },
              ]
            )
          } else {
            return Alert.alert(
              "Successfully posted listing!",
              "You can return home now.",
              [
                {
                  text: "Return Home",
                  onPress: () => navigation.navigate("Root"),
                  style: "cancel",
                }
              ]
            )
          }
        }}/>
      </View>
    </>
  );
};

export default CreateListingScreen;
