import { View, Text, Pressable, RegisteredStyle } from "react-native";
import React from "react";
import styles from "./styles/AppButtonStyles";
import { AppButtonTypes } from "./types";

const AppButton = ({ children, style, onPress, disabled }: AppButtonTypes) => {
  var setStyle

  if (disabled) {
    setStyle = styles.dis_button
  } else {
    setStyle = styles.button
  }

  console.log(disabled)

  return (
    <Pressable disabled={disabled} onPress={onPress} style={[setStyle, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default AppButton;
