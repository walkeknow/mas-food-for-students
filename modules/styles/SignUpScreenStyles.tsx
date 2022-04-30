import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../theme/Colors";

const styles = ScaledSheet.create({
  SignInBody: {
    backgroundColor: Colors.lightBrown,
    alignItems: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 60,
    paddingTop: 120,
    flex: 1
  },
  SignupBody: {
    backgroundColor: Colors.lightBrown,
    alignItems: "stretch",
    paddingHorizontal: 25,
    paddingVertical: 60,
    paddingTop: 120,
  },
  name: {
    marginTop: 45,
    marginStart: 10,
  },
  password: {
    marginTop: 8,
    marginStart: 10,
  },
  label: {
    marginTop: 20,
    marginStart: 10,
  },
  button: {
    marginTop: 40,
    width: 309,
    alignSelf: "center",
  },
  sidebyside: {
    backgroundColor: Colors.lightBrown,
    display: "flex",
    flexDirection: "row",
  },
  defaultbutton: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
  hintText: {
    marginStart: 20,
    textDecorationLine: "underline",
    color: Colors.black,
    marginTop: 20,
  },
  textinput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  rowview: {
    flexDirection: "row",
    justifyContent: "center",
  },
  stateinput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    margin: 10,
    flex: 2,
  },
});

export default styles;
