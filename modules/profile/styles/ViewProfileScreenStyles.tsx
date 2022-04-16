import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../../theme/Colors";

const styles = ScaledSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.primaryBlue,
  },
  blueHeader: {
    height: "157@vs",
    backgroundColor: Colors.primaryBlue,
  },
  content: {
    backgroundColor: Colors.lightBrown,
    flex: 1,
  },
  centeredView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "88@vs",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    alignSelf: "flex-end",
    padding: 17,
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: Colors.primaryBlue,
  },
  placeholderImage: {
    width: 119,
    height: 119,
    borderColor: Colors.primaryBlue,
    borderRadius: 119,
    borderWidth: 7,
  },
  form: {
    paddingHorizontal: 49,
    marginTop: "20@vs",
  },
  logo: {
    position: "absolute",
    top: 0,
    right: "110@s",
    width: 45,
    height: 45,
  },
  rating: { marginTop: 5 },
  label: {
    marginTop: 44
  },
  inputField: {
    marginTop: 11,
  },
  adressInput: {
    height: 144,
  },
  button: {
    marginTop: 75
  },
});

export default styles;
