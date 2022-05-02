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
  buttonbody: {
    backgroundColor: Colors.lightBrown,
    paddingLeft: 200,
    paddingBottom: 10,
    paddingRight: 50,
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
  },
  iconContainer: {
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  card: {
    marginTop: 36,
    height: 230,
  },
  cardImage: {
    maxWidth: 300,
    maxHeight: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 300,
    height: 200,
  },
  cardDescription: {
    backgroundColor: Colors.primaryBlue,
    padding: 8,
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  listingDescription: {
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.white,
    padding: 8,
    justifyContent: "space-between",
    paddingBottom: 16,
    maxWidth: 300,
  },
  cardTopName: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.primaryBlue,
    padding: 8,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.gold,
    padding: 8,
    borderRadius: 4,
    shadowRadius: 2,
  },
  itemName: {
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: Colors.white,
    maxWidth: 100,
  },
  itemNameBlack: {
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: Colors.black,
    maxWidth: 100,
  },
  itemTopName: {
    fontSize: 18,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: Colors.white,
    maxWidth: 100,
  },
  tagContainer: {
    flexDirection: "row",
  },
  tag: {
    flexShrink: 1,
    borderRadius: 10,
  },
  tagText: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    fontWeight: "600",
  },
  button: {
    marginTop: 350,
    width: 300,
  },
});

export default styles;
