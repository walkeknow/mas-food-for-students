import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../../theme/Colors";

const styles = ScaledSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: Colors.black,
  },
});

export default styles;
