import { Dispatch, ReactChild, SetStateAction } from "react"
import { GestureResponderEvent, PressableProps, RegisteredStyle } from "react-native";

export type AppButtonTypes = {
    children: ReactChild;
    style: RegisteredStyle<any>;
    onPress: (event: GestureResponderEvent) => void
}