import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";
import {
  moderateScale
} from "react-native-size-matters";

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.lightBrown,
    flex: 1,
    alignItems: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 60,
    paddingTop: 120,
  },
  sidebyside: {
    backgroundColor: Colors.lightBrown,
    display: "flex",
    flexDirection: "row",
  },
  defaultbutton: {
    flex: 1,
    padding: 10,
    margin: 10
  },
  textinput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  multilinetextinput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height: 107,
    textAlignVertical: "top"
  },
  image: {
    width: 100,
    height: 100,
    borderColor: Colors.primaryBlue,
    borderWidth: 7,
  },
  center: {
    alignItems: "center"
  },
});

export default styles;
