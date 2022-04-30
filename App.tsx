import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider } from "react-redux";
import CreateListingScreen from "./modules/CreateListingScreen";
import ListingScreen from "./modules/ListingScreen";
import EditProfileScreen from "./modules/profile/EditProfileScreen";
import ViewProfileScreen from "./modules/profile/ViewProfileScreen";
import ReceivedRequestsScreen from "./modules/requests/ReceivedRequestsScreen";
import SentRequestsScreen from "./modules/requests/SentRequestsScreen";
import SearchScreen from "./modules/SearchScreen";
import store from "./redux/store";
import Colors from "./theme/Colors";
import { ProfileStackParamList, RootStackParamList } from "./utils/types";

LogBox.ignoreAllLogs();

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const TopTab = createMaterialTopTabNavigator();

function RequestTabs() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Received" component={ReceivedRequestsScreen} />
      <TopTab.Screen name="Sent" component={SentRequestsScreen} />
    </TopTab.Navigator>
  );
}

const ProfileStackScreens = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={"ViewProfileScreen"}
        options={{ title: "Profile", headerShown: false }}
        component={ViewProfileScreen}
      />
      <ProfileStack.Screen
        name={"EditProfileScreen"}
        options={{
          title: "Edit Profile",
          headerStyle: { backgroundColor: Colors.primaryBlue },
          headerTintColor: Colors.yellow,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={EditProfileScreen}
      />
      <ProfileStack.Screen
        name={"RequestsScreen"}
        options={{
          title: "Requests",
          headerStyle: { backgroundColor: Colors.primaryBlue },
          headerTintColor: Colors.yellow,
          headerTitleAlign: "center",
          headerShadowVisible: false,
        }}
        component={RequestTabs}
      />
    </ProfileStack.Navigator>
  );
};

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
      <Tab.Screen name="Give" component={CreateListingScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreens} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootSiblingParent>
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
      </RootSiblingParent>
    </Provider>
  );
}
