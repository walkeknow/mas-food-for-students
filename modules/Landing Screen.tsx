import { async } from "@firebase/util";
import React from "react";
import {
 Button,
 Image,
 View
} from "react-native";
import Images from "../assets";
import styles from "./styles/LandingScreenStyles";

const LandingScreen = ({ navigation }: any) => {
    return (
        <>
            <View style = {styles.body}>
                <Image style={styles.logoImage} source={Images.logo} />
            </View>
            <Button
                title="Sign in with SSO"
                onPress = { async () => {
                        navigation.navigate("Login");
                    }
                }
            ></Button>
        </>
    )
}

export default LandingScreen;