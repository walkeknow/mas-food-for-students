import { async } from "@firebase/util";
import React, { useRef } from "react";
import { Form } from "react-bootstrap";
import {
 Alert,
 Button,
 Text,
 TextInput,
 View
} from "react-native";
import appAuth from "../../lib/db";
import styles from "../styles/LoginScreenStyles";

const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);

const LoginScreen = ({ navigation }: any) => {
    return (
        <>
            <View style = {styles.body}>
                <Form>
                    <View style = {styles.row}>
                        <Form.Control ref = {emailRef} type = "email" placeholder = "Email" style = {styles.credentialTextField} required = {true} />
                    </View>
                    <View style = {styles.row}>
                        <Form.Control ref = {passwordRef} type = "passwrod" placeholder = "Password" style = {styles.credentialTextField} required = {true} />
                    </View>

                    <Button
                        title = "Login"
                        onPress = { async () => {
                                try {
                                    // await appAuth.signInWithEmailAndPassword(
                                    //     emailRef.current!.value,
                                    //     passwordRef.current!.value
                                    // );
                                    // navigation.navigate("Root");
                                } catch (error) {
                                    console.log(error);
                                    // Alert.alert(
                                    //     "Login Error",
                                    //     "Login Failed. Please try again.",
                                    //     [ { text: "OK" } ]
                                    // )
                                }
                            }
                        }
                    ></Button>
                </Form>
            </View>
        </>
    )
}

export default LoginScreen;