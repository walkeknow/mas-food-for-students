import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageSourcePropType } from "react-native";


export type RootStackParamList = {
  Root: undefined;
  SignUp: undefined;
  Search: undefined;
  Listing: undefined;
  CreateListing: undefined;
};

export type ProfileStackParamList = {
  ViewProfileScreen: undefined;
  EditProfileScreen: undefined
};

export type ItemCardTypes = {
  item: {
    name: string;
    image: string;
    distance: string;
    tagColor: string;
    university: string;
    address: string;
    pickup: string;
    bought: string;
    expires: string;
    seller: string;
    id: number
  };
};

export type User = {
  name: string,
  email: string,
  addr_street: string,
  addr_city: string,
  addr_state: string,
  addr_zip: string,
  uni: string,
  uni_color: string
};
