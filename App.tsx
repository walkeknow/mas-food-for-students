import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./modules/SearchScreen";
import ListingScreen from "./modules/ListingScreen";
import CreateListingScreen from "./modules/CreateListingScreen";
import Colors from "./theme/Colors";
import { RootStackParamList } from "./utils/types";
import app from "./lib/db"
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { Text } from "react-native"

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = "search";
          if (route.name === "Search") {
            iconName = "search";
          } else if (route.name === "Give") {
            iconName = "shopping-bag";
          } else if (route.name === "Profile") {
            iconName = "account-circle";
          }
          return (
            <MaterialIcons
              name={iconName}
              size={23}
              color={focused ? Colors.yellow : Colors.lightBrown}
            />
          );
        },
        headerTransparent: true,
        tabBarActiveTintColor: Colors.yellow,
        tabBarStyle: { backgroundColor: Colors.primaryBlue },
      })}
    >
      <Tab.Screen options={{}} name="Search" component={SearchScreen} />
      <Tab.Screen name="Give" component={SearchScreen} />
      <Tab.Screen name="Profile" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  const db = getDatabase(app)
  const reference =  ref(db, 'users/');
  set(reference, {
    "user2": "user thingy"
  })
  console.log(reference.toJSON())
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{ headerTransparent: true, headerTitle: "" }}
          name="Root"
          component={Tabs}
        />
        <RootStack.Screen
          options={{ headerTransparent: true, headerTitle: "" }}
          name="Listing"
          component={ListingScreen}
        />
        <RootStack.Screen
          options={{ headerTransparent: true, headerTitle: "" }}
          name="CreateListing"
          component={CreateListingScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
