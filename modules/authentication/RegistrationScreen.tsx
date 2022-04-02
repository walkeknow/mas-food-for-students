import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import {
 Alert,
 Button,
 Text,
 TextInput,
 View
} from "react-native";
import { appAuth } from "../../lib/db";
import styles from "../styles/RegistrationScreenStyles";

//TODO: Refine the form layout and UI functionality

const nameRef = useRef<HTMLInputElement>(null);
const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);
const countryCodeRef = useRef<HTMLInputElement>(null);
const mobileRef = useRef<HTMLInputElement>(null);
const streetRef = useRef<HTMLInputElement>(null);
const cityRef = useRef<HTMLInputElement>(null);
const stateRef = useRef<HTMLInputElement>(null);
const zipRef = useRef<HTMLInputElement>(null);

const RegistrationScreen = ({ navigation }: any) => {
    return (
        <>
            <View style={styles.body}>
                <Form>
                    <View style={styles.row}>
                        <Form.Control ref = {nameRef} type = "text" placeholder = "Name" style={styles.nameEmailAddressTextField} required = {true} />
                    </View>
                    <View style={styles.row}>
                        <Form.Control ref = {emailRef} type = "email" placeholder = "Email" style={styles.nameEmailAddressTextField} required = {true} />
                    </View>
                    <View style={styles.row}>
                        <Form.Control ref = {passwordRef} type = "password" placeholder = "Password" style={styles.nameEmailAddressTextField} required = {true} />
                    </View>
                    <View style={styles.row}>
                        <Form.Control ref = {countryCodeRef} type = "text" placeholder = "+1" style={styles.countryCodeTextField} required = {true} />
                        <Form.Control ref = {mobileRef} type = "text" placeholder = "Mobile Number" style={styles.mobileTextField} required = {true} />
                    </View>
                    <View style={styles.row}>
                        <Form.Control ref = {streetRef} type = "text" placeholder = "Street" style={styles.nameEmailAddressTextField} required = {true} />
                    </View>
                    <View style={styles.row}>
                        <Form.Control ref = {cityRef} type = "text" placeholder = "City" style={styles.cityStateTextField} required = {true} />
                        <Form.Control ref = {stateRef} type = "text" placeholder = "State" style={styles.cityStateTextField} required = {true} />
                        <Form.Control ref = {zipRef} type = "text" placeholder = "Zip" style={styles.zipTextField} required = {true} />
                    </View>

                    <Button
                        title = "Register"
                        onPress = { async () => {
                                try {
                                    await appAuth.createUserWithEmailAndPassword(
                                        emailRef.current!.value,
                                        passwordRef.current!.value
                                    );
                                    navigation.navigate("Root");
                                } catch (error) {
                                    console.error(error)
                                    Alert.alert(
                                        "Registration Error",
                                        "Account registration failed. Please try again",
                                        [ { text: "OK" } ]
                                    )
                                }
                            }
                        }
                    ></Button>
                </Form>
            </View>
        </>
    );
};

export default RegistrationScreen;