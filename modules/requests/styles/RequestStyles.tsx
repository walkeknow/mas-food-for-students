import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../../theme/Colors";

const styles = ScaledSheet.create({
  body: {
    padding: 20,
    paddingTop: 64,
    backgroundColor: Colors.lightBrown,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: Colors.whiteE5,
  },
  itemSeparator: {
    height: 24,
  },
  description: {
    paddingTop: 18,
    paddingHorizontal: 12,
    width: 143,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
  },
  boldText: {
    fontFamily: "RobotoSlab",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#000000",
    marginTop: 10,
  },
  buttons: {
    width: 99,
  },
  greenButton: {
    flex: 1,
    backgroundColor: Colors.green,
    alignItems: "center",
    justifyContent: "center",
  },
  redButton: {
    flex: 1,
    backgroundColor: Colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 113,
    width: 108,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  buttonText: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
  },
  approveText: {
    color: Colors.darkGreen,
  },
  denyText: {
    color: Colors.darkRed,
  },
});

export default styles;
