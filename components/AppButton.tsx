import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "./styles/AppButtonStyles";
import { AppButtonTypes } from "./types";

const AppButton = ({ children, style, onPress }: AppButtonTypes) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default AppButton;
