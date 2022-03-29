import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "./modules/SearchScreen";
import ListingScreen from "./modules/ListingScreen";
import Colors from "./theme/Colors";
import { RootStackParamList } from "./utils/types";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: Colors.primaryBlue }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = "";
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
        tabBarActiveTintColor: Colors.yellow,
        headerTransparent: true,
        headerTitle: "",
      })}
    >
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Give" component={SearchScreen} />
      <Tab.Screen name="Profile" component={SearchScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
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
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
