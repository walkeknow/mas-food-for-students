import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

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
  rowview: {
    flexDirection: "row",
    justifyContent: "center",
  },
  stateinput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 10,
    flex: 2
  },
});

export default styles;
