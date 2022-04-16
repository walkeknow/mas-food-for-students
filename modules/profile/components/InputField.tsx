import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "../styles/InputFieldStyles";

const InputField = ({ value, style, multiline }) => {
  return (
    <TextInput
      multiline={multiline}
      style={[styles.input, style]}
      value={value}
    />
  );
};

export default InputField;
