import { ScaledSheet } from "react-native-size-matters";
import Colors from "../../theme/Colors";

const styles = ScaledSheet.create({
  body: {
    backgroundColor: Colors.lightBrown,
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
    margin: 10,
  },
  textinput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  multilinetextinput: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    height: 107,
    textAlignVertical: "top",
  },
  image: {
    width: 100,
    height: 100,
    borderColor: Colors.primaryBlue,
    borderWidth: 7,
    borderRadius: 100,
    marginTop: 20,
  },
  center: {
    alignItems: "center",
  },
  button: {
    marginTop: 30,
    width: 309,
    alignSelf: "center",
  },
});

export default styles;
