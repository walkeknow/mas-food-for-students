import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "../styles/InputFieldStyles";
import { InputFieldTypes } from "../types";

const InputField = ({
  value,
  style,
  multiline,
  editable,
  defaultValue,
  setValue,
  placeholder,
}: InputFieldTypes) => {
  return (
    <TextInput
      defaultValue={defaultValue}
      editable={editable}
      multiline={multiline}
      style={[styles.input, style]}
      value={value}
      onChangeText={(e) => {
        if (setValue) {
          setValue(e);
        }
      }}
      placeholder={placeholder}
    />
  );
};

export default InputField;
