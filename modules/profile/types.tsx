import { Dispatch, ReactChild, SetStateAction } from "react";
import { RegisteredStyle } from "react-native";

export type InputFieldTypes = {
  value?: string;
  style: RegisteredStyle<any> | RegisteredStyle<any>[];
  multiline?: boolean;
  editable?: boolean;
  defaultValue?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  placeholder: string
};

export type LabelTypes = {
  style?: RegisteredStyle<any> | RegisteredStyle<any>[];
  children: ReactChild;
};
