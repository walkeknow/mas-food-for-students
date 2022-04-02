import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.lightBrown,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
  },
  credentialTextField: {
    maxWidth: 240,
  },
  credentialText: {
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginHorizontal: 2,
    paddingHorizontal: 25,
    height: 44,
    marginTop: 104,
    backgroundColor: Colors.white,
    borderRadius: 25,
    justifyContent: "space-between",
    alignItems: "center",
  }
});

export default styles;