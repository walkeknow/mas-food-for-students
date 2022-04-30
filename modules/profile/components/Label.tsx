import { View, Text } from "react-native";
import React from "react";
import styles from "../styles/LabelStyles";
import { LabelTypes } from "../types";

const Label = ({ children, style }: LabelTypes) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default Label;
