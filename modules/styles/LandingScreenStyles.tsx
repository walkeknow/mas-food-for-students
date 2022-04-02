import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.lightBrown,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 60,
  },
  logoImage: {
    maxWidth: 300,
    maxHeight: 200,
  }
});

export default styles;