import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "./styles/AppButtonStyles";

const AppButton = ({ children, style }) => {
  return (
    <Pressable style={[styles.button, style]}>
      <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
  );
};

export default AppButton;
