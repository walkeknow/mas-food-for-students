import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../theme/Colors";

const styles = ScaledSheet.create({
  button: {
    borderRadius: 10,
    backgroundColor: Colors.primaryBlue,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: Colors.whiteInput,
    paddingTop: 10.5,
    paddingBottom: 12.5,
  },
});

export default styles;
