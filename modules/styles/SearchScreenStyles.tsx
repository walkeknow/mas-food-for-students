import { StyleSheet } from "react-native";
import Colors from "../../theme/Colors";

const styles = StyleSheet.create({
  body: {
    backgroundColor: Colors.lightBrown,
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 25,
  },
  searchBar: {
    maxWidth: 240,
    minWidth: 240
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
  searchText: {
    fontSize: 14,
  },
  flatlist: {
    width: 340,
    justifyContent: "space-between",
  },
  card: {
    marginTop: 36,
    height: 230,
  },
  cardImage: {
    maxWidth: 162,
    maxHeight: 138,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 162,
    height: 138
  },
  cardDescription: {
    height: 92,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: Colors.primaryBlue,
    padding: 8,
    justifyContent: 'space-between',
    paddingBottom: 16
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  itemName: {
    fontSize: 13,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    color: Colors.white,
    maxWidth: 100
  },
  tagContainer: {
    flexDirection:'row',
  },
  tag: {
      flexShrink: 1,
      borderRadius: 10
  },
  tagText: {
    paddingVertical: 2,
    paddingHorizontal: 7,
    fontWeight: '600',
  },
});

export default styles;
