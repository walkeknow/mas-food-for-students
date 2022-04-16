import { View, Text } from "react-native";
import React from "react";
import styles from "../styles/LabelStyles";

const Label = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default Label;
